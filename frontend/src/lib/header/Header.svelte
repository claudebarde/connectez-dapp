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

  header {
    padding: 20px;
    width: calc(100% - 40px);
    display: grid;
    grid-template-columns: 20% 40% 40%;
    align-items: center;

    .left-block {
      text-align: center;
    }

    .right-block {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 10px;
    }
  }
</style>

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
