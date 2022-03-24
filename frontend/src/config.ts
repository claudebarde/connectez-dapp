import type { TezosContractAddress } from "./types";

interface Config {
  network: "mainnet" | "testnet" | "local";
  rpcUrls: {
    mainnet: string;
    testnet: string;
    local: TezostringsContractAddress;
  };
  mainContract: {
    mainnet: TezosContractAddress;
    testnet: TezosContractAddress;
    local: TezosContractAddress;
  };
}

const config: Config = {
  network: "local",
  rpcUrls: {
    mainnet: "https://mainnet.api.tez.ie",
    testnet: "https://hangzhounet.api.tez.ie",
    local: "http://localhost:20000"
  },
  //TODO: update address for mainnet
  mainContract: {
    mainnet: "KT1B6MrLEiZtyRJniwnvAUN63j7M7SVegtwh",
    testnet: "KT1B6MrLEiZtyRJniwnvAUN63j7M7SVegtwh",
    local: "KT1B6MrLEiZtyRJniwnvAUN63j7M7SVegtwh"
  }
};

export default config;
