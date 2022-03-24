import type { TezosToolkit } from "@taquito/taquito";
import type { TezosContractAddress, TezosAccountAddress } from "./types";
import { Result, Option } from "@swan-io/boxed";
import config from "./config";

const validateAddress = (
  address: any,
  type: "account" | "contract"
): boolean => {
  if (typeof address !== "string") return false;

  address = address.trim();
  if (address.length === 0) return false;

  if (address.slice(0, 2) === "tz") {
    const regex = new RegExp("tz[123][1-9A-HJ-NP-Za-km-z]{33}");
    return regex.test(address) && type === "account";
  } else if (address.slice(0, 2) === "KT") {
    const regex = new RegExp("KT1[1-9A-HJ-NP-Za-km-z]{33}");
    return regex.test(address) && type === "contract";
  } else {
    return false;
  }
};

/**
 *
 * @param {any} val Checks if the provided value is a valid implicit account address
 * @returns
 */
const validateAccountAddress = (val: any): boolean => {
  return validateAddress(val, "account");
};

/**
 *
 * @param {any} val Checks if the provided value is a valid contract address
 * @returns
 */
const validateContractAddress = (val: any): boolean => {
  return validateAddress(val, "contract");
};

const findBlogAddress = async (
  tezosToolkit: Option<TezosToolkit>,
  owner: TezosAccountAddress
): Promise<Result<Option<TezosContractAddress>, string>> => {
  // checks if TezosToolkit is defined
  const Tezos = await tezosToolkit.match<Promise<Result<TezosToolkit, string>>>(
    {
      None: () => Promise.reject(Result.Error("TezosToolkit is not defined")),
      Some: tezos => Promise.resolve(Result.Ok(tezos))
    }
  );

  return Tezos.match({
    Ok: async tezos => {
      const contract = await tezos.wallet.at(
        config.mainContract[config.network]
      );
      const storage: any = await contract.storage();
      const result = await Result.fromPromise(storage.blogs.get(owner));
      return result.match({
        Ok: (val: { blog_address: TezosContractAddress } | undefined) => {
          if (!val) {
            return Result.Ok(Option.None());
          } else {
            return Result.Ok(Option.Some(val.blog_address));
          }
        },
        Error: err => Result.Error(JSON.stringify(err))
      });
    },
    Error: err => Promise.reject(Result.Error(err))
  });
};

/**
 *
 * @param {string} hash The hash to shorten
 * @returns {string} The shortened hash
 */
const shortenHash = (hash: string): string => {
  return hash.slice(0, 5) + "..." + hash.slice(-5);
};

/**
 *
 * @param {number} amount The amount to format
 * @param {number} decimals The number of decimals to keep after the floating point
 * @returns {string} The formatted amount
 */
const formatTokenAmount = (amount: number, decimals: number = 6): string => {
  return (+(amount / 10 ** decimals).toFixed(2) / 1).toLocaleString("en-US");
};

export default {
  validateAccountAddress,
  validateContractAddress,
  findBlogAddress,
  shortenHash,
  formatTokenAmount
};
