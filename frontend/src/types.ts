import type { TezosToolkit } from "@taquito/taquito";
import type { Option } from "@swan-io/boxed";

export type TezosContractAddress = `KT1${string}`;
export type TezosAccountAddress = `tz${"1" | "2" | "3"}${string}`;

export interface State {
  Tezos: Option<TezosToolkit>;
  userAddress: Option<TezosAccountAddress>;
  userBalance: Option<number>;
  userBlog: Option<TezosContractAddress>;
}
