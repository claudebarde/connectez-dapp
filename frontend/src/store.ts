import { writable } from "svelte/store";
import type { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
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
  wallet: Option.None(),
  userAddress: Option.None(),
  userBalance: Option.None(),
  userCnctBalance: Option.None(),
  userBlog: Option.None(),
  dialog: undefined,
  theme: "light"
};

const store = writable(initialState);

const state = {
  subscribe: store.subscribe,
  updateTezos: (tezos: TezosToolkit) =>
    store.update(store => ({ ...store, Tezos: Option.fromNullable(tezos) })),
  updateWallet: (wallet: any) =>
    store.update(store => {
      if (!wallet || wallet instanceof BeaconWallet === false) {
        return { ...store, wallet: Option.None() };
      }

      return { ...store, wallet: Option.Some(wallet) };
    }),
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
    })),
  updateTheme: (theme: State["theme"]) =>
    store.update(store => {
      if (theme === "light") {
        document.body.classList.remove("dark-theme");
        document.body.classList.add("light-theme");
      } else {
        document.body.classList.remove("light-theme");
        document.body.classList.add("dark-theme");
      }

      return { ...store, theme };
    })
};

export default state;
