<script lang="ts">
  import { onMount, afterUpdate, onDestroy } from "svelte";
  import { BeaconWallet } from "@taquito/beacon-wallet";
  import {
    NetworkType,
    BeaconEvent,
    defaultEventCallbacks
  } from "@airgap/beacon-sdk";
  import type { TezosAccountAddress } from "../../types";
  import store from "../../store";
  import config from "../../config";
  import utils from "../../utils";
  import WalletIcon from "./WalletIcon.svelte";

  let wallet: BeaconWallet;
  const walletOptions = {
    name: "ConnecTez",
    preferredNetwork:
      config.network === "mainnet"
        ? NetworkType.MAINNET
        : NetworkType.HANGZHOUNET,
    disableDefaultEvents: true, // Disable all events / UI. This also disables the pairing alert.
    eventHandlers: {
      // To keep the pairing alert, we have to add the following default event handlers back
      [BeaconEvent.PAIR_INIT]: {
        handler: defaultEventCallbacks.PAIR_INIT
      },
      [BeaconEvent.PAIR_SUCCESS]: {
        handler: defaultEventCallbacks.PAIR_SUCCESS
      }
    }
  };
  let userAddress: TezosAccountAddress;
  let userBalance: number;
  let checkBalanceInterval;

  const checkBalance = (userAddress: TezosAccountAddress) => {
    $store.Tezos.match({
      None: () => console.error("TezosToolkit is not defined"),
      Some: async tezos => {
        const balance = await tezos.tz.getBalance(userAddress);
        if (balance) {
          userBalance = balance.toNumber();
        }
      }
    });
  };

  const findUserBlog = async (userAddress: TezosAccountAddress) => {
    // finds blog address
    const findBlogAddress = await utils.findBlogAddress(
      $store.Tezos,
      userAddress
    );

    findBlogAddress.match({
      Ok: val => {
        val.match({
          None: () => {
            console.log("No blog found");
            store.updateUserBlog(undefined);
          },
          Some: blogAddress => {
            console.log("Blog address:", blogAddress);
            store.updateUserBlog(blogAddress);
          }
        });
      },
      Error: err => {
        console.error(err);
        store.updateUserBlog(undefined);
      }
    });
  };

  const connectWallet = async () => {
    if (!wallet) {
      wallet = new BeaconWallet(walletOptions);
    }

    try {
      await wallet.requestPermissions({
        network: {
          type:
            config.network === "mainnet"
              ? NetworkType.MAINNET
              : NetworkType.HANGZHOUNET,
          rpcUrl:
            config.network === "mainnet"
              ? "https://mainnet.api.tez.ie"
              : "https://hangzhounet.api.tez.ie"
        }
      });

      $store.Tezos.match({
        None: () => console.error("TezosToolkit is not defined"),
        Some: tezos => tezos.setWalletProvider(wallet)
      });
      const userAddress = (await wallet.getPKH()) as TezosAccountAddress;
      store.updateUserAddress(userAddress);
      await findUserBlog(userAddress);
      checkBalance(userAddress);
      checkBalanceInterval = setInterval(
        () => checkBalance(userAddress),
        10_000
      );
    } catch (err) {
      console.error(err);
    }
  };

  const disconnectWallet = () => {
    wallet.client.destroy();
    store.updateUserAddress(undefined);
    wallet = undefined;
    clearInterval(checkBalanceInterval);
    userBalance = undefined;
  };

  onMount(async () => {
    wallet = new BeaconWallet(walletOptions);
    const activeAccount = await wallet.client.getActiveAccount();
    if (activeAccount) {
      const userAddress = (await wallet.getPKH()) as TezosAccountAddress;
      store.updateUserAddress(userAddress);
      await findUserBlog(userAddress);
      // finds user's balance
      checkBalance(userAddress);
      checkBalanceInterval = setInterval(
        () => checkBalance(userAddress),
        10_000
      );
    }
  });

  afterUpdate(() => {
    // updates user address
    $store.userAddress.match({
      None: () => (userAddress = undefined),
      Some: val => (userAddress = val)
    });
  });

  onDestroy(() => {
    clearInterval(checkBalanceInterval);
  });
</script>

<style lang="scss">
  .wallet-container {
    text-align: right;
    display: flex;
    justify-content: flex-end;
  }
</style>

<div class="wallet-container">
  {#if userAddress}
    <button class="wallet" on:click={disconnectWallet}>
      <span>
        {#if userBalance}
          {(+(userBalance / 10 ** 6).toFixed(2) / 1).toLocaleString("en-US")} ꜩ
        {:else}
          0 ꜩ
        {/if}
      </span>
      <span>
        <span class="material-icons-outlined"> person_outline </span>
        {utils.shortenHash(userAddress)}
      </span>
    </button>
  {:else}
    <button class="transparent" on:click={connectWallet}>
      <WalletIcon />
    </button>
  {/if}
</div>
