<script lang="ts">
  import { onMount } from "svelte";
  import { TezosToolkit } from "@taquito/taquito";
  import { BeaconWallet } from "@taquito/beacon-wallet";
  import { NetworkType } from "@airgap/beacon-sdk";
  import Router from "svelte-spa-router";
  import Header from "./lib/Header.svelte";
  import Home from "./lib/Home.svelte";
  import Post from "./lib/Post.svelte";
  import CreatePost from "./lib/create-post/CreatePost.svelte";

  const routes = {
    "/": Home,
    "/post/:id": Post,
    "/create": CreatePost
  };
</script>

<Header />
<Router {routes} />
