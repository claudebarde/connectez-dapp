import type { TezosContractAddress } from "./types";

interface Config {
  network: "mainnet" | "testnet" | "local";
  mainContract: {
    mainnet: TezosContractAddress;
    testnet: TezosContractAddress;
    local: TezosContractAddress;
  };
}

const config: Config = {
  network: "local",
  //TODO: update address for mainnet
  mainContract: {
    mainnet: "KT1B6MrLEiZtyRJniwnvAUN63j7M7SVegtwh",
    testnet: "KT1B6MrLEiZtyRJniwnvAUN63j7M7SVegtwh",
    local: "KT1B6MrLEiZtyRJniwnvAUN63j7M7SVegtwh"
  }
};

export default config;
