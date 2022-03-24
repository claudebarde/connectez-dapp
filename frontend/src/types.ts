import type { TezosToolkit } from "@taquito/taquito";
import type { Option } from "@swan-io/boxed";

export type TezosContractAddress = `KT1${string}`;
export type TezosAccountAddress = `tz${"1" | "2" | "3"}${string}`;

export type Dialog = {
  title: string;
  body: string;
  buttons: Array<{
    type: "close" | "confirm" | "disconnect";
    text: string;
    action: (p: any) => void;
  }>;
};
export interface State {
  Tezos: Option<TezosToolkit>;
  userAddress: Option<TezosAccountAddress>;
  userBalance: Option<number>;
  userCnctBalance: Option<number>;
  userBlog: Option<TezosContractAddress>;
  dialog: Dialog | undefined;
}
