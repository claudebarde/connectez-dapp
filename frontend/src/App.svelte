<script lang="ts">
  import { onMount } from "svelte";
  import { TezosToolkit } from "@taquito/taquito";
  import Router from "svelte-spa-router";
  import Header from "./lib/header/Header.svelte";
  import Home from "./lib/Home.svelte";
  import Post from "./lib/Post.svelte";
  import Blog from "./lib/Blog.svelte";
  import CreatePost from "./lib/create-post/CreatePost.svelte";
  import Dialog from "./lib/dialog/Dialog.svelte";
  import store from "./store";
  import config from "./config";

  const routes = {
    "/": Home,
    "/blog/:address?": Blog,
    "/post/:id": Post,
    "/create": CreatePost
  };

  onMount(async () => {
    const rpcUrl = (() => {
      switch (config.network) {
        case "mainnet":
          return "https://mainnet.api.tez.ie";
        case "testnet":
          return "https://hangzhounet.api.tez.ie";
        case "local":
          return "http://localhost:20000";
      }
    })();
    const tezos = new TezosToolkit(rpcUrl);
    store.updateTezos(tezos);
  });
</script>

<Header />
<Router {routes} />
{#if $store.dialog}
  <Dialog />
{/if}
