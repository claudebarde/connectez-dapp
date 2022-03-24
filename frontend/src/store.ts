import { writable } from "svelte/store";
import type { TezosToolkit } from "@taquito/taquito";
import { Option } from "@swan-io/boxed";
import type {
  State,
  TezosAccountAddress,
  TezosContractAddress,
  Dialog
} from "./types";
import utils from "./utils";

const initialState: State = {
  Tezos: Option.None(),
  userAddress: Option.None(),
  userBalance: Option.None(),
  userCnctBalance: Option.None(),
  userBlog: Option.None(),
  dialog: undefined
};

const store = writable(initialState);

const state = {
  subscribe: store.subscribe,
  updateTezos: (tezos: TezosToolkit) =>
    store.update(store => ({ ...store, Tezos: Option.fromNullable(tezos) })),
  updateUserAddress: (address: any) =>
    store.update(store => {
      // if address is false or of the wrong format
      if (!address || !utils.validateAccountAddress(address)) {
        return { ...store, userAddress: Option.None() };
      }

      return {
        ...store,
        userAddress: Option.Some(address as TezosAccountAddress)
      };
    }),
  updateUserBalance: (balance: any) =>
    store.update(store => {
      if (isNaN(balance)) {
        return { ...store, userBalance: Option.None() };
      }

      return { ...store, userBalance: Option.Some(+balance) };
    }),
  updateUserCnctBalance: (balance: any) =>
    store.update(store => {
      if (isNaN(balance)) {
        return { ...store, userCnctBalance: Option.None() };
      }

      return { ...store, userCnctBalance: Option.Some(+balance) };
    }),
  updateUserBlog: (address: any) =>
    store.update(store => {
      // if address is false or of the wrong format
      if (!address || !utils.validateContractAddress(address)) {
        return { ...store, userBlog: Option.None() };
      }

      return {
        ...store,
        userBlog: Option.Some(address as TezosContractAddress)
      };
    }),
  updateDialog: (dialog: Option<Dialog>) =>
    store.update(store => ({
      ...store,
      dialog: dialog.match({
        Some: dialog => dialog,
        None: () => undefined
      })
    }))
};

export default state;
