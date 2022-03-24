<script lang="ts">
  import { afterUpdate } from "svelte";
  import store from "../../store";
  import Wallet from "./Wallet.svelte";
  import type { TezosContractAddress } from "../../types";

  let userBlog: TezosContractAddress;

  afterUpdate(() => {
    // updates user blog address
    $store.userBlog.match({
      None: () => (userBlog = undefined),
      Some: val => (userBlog = val)
    });
  });
</script>

<style lang="scss">
  @import "../../styles/settings.scss";
  $padding: 20px;

  header {
    position: fixed;
    top: 0px;
    left: 0px;
    padding: 0px $padding;
    width: calc(100% - 40px);
    height: 10%;
    display: grid;
    grid-template-columns: 20% 40% 40%;
    align-items: center;
    background-color: rgba($floral-white, 0.6);
    backdrop-filter: blur(10px);

    .left-block {
      text-align: center;
      font-family: "Pacifico", cursive;
      font-size: 1.8rem;
    }

    .right-block {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 10px;
    }
  }

  #header-placeholder {
    padding: 0px $padding;
    width: calc(100% - 40px);
    height: 100%;
  }
</style>

<div id="header-placeholder" />
<header>
  <div class="left-block">ConnecTez</div>
  <div />
  <div class="right-block">
    <a href="#/" class="button-link">
      <button class="round">
        <span class="material-icons-outlined"> home </span>
      </button>
    </a>
    <button class="round">
      <span class="material-icons-outlined"> light_mode </span>
    </button>
    {#if userBlog}
      <a href={`#/blog/${userBlog}`} class="button-link">
        <button class="round">
          <span class="material-icons-outlined"> contact_page </span>
        </button>
      </a>
      <button class="round">
        <span class="material-icons-outlined"> note_add </span>
      </button>
    {:else}
      <button class="round">
        <span class="material-icons-outlined"> add_circle_outline </span>
      </button>
    {/if}
    <Wallet />
  </div>
</header>
