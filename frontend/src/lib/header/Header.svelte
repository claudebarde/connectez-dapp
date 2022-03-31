<script lang="ts">
  import { onMount, afterUpdate } from "svelte";
  import { createPopper } from "@popperjs/core";
  import store from "../../store";
  import Wallet from "./Wallet.svelte";
  import type { TezosContractAddress } from "../../types";

  let userBlog: TezosContractAddress;
  let newBlogPopper, themePopper;
  let newBlogPopperInstance, themePopperInstance;

  const showPopper = (popper, popperInstance) => {
    popper.setAttribute("data-show", "");
    popperInstance.update();
  };

  const hidePopper = popper => {
    popper.removeAttribute("data-show");
  };

  onMount(() => {
    // new blog popper
    const newBlogRef = document.getElementById("header__new_blog_button");
    newBlogPopper = document.getElementById("header__new_blog_button__tooltip");
    newBlogPopperInstance = createPopper(newBlogRef, newBlogPopper, {
      placement: "bottom"
    });
    // theme popper
    const themeRef = document.getElementById("header__theme_button");
    themePopper = document.getElementById("header__theme_button__tooltip");
    themePopperInstance = createPopper(themeRef, themePopper, {
      placement: "bottom"
    });
  });

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
    &.light {
      background-color: rgba($floral-white, 0.6);
      backdrop-filter: blur(10px);
    }
    &.dark {
      background-color: rgba($black, 0.6);
      backdrop-filter: blur(10px);
    }

    .left-block {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-family: "Pacifico", cursive;
      font-size: 1.8rem;

      img {
        width: 50px;
        padding: 5px;
        margin-right: 10px;

        &.dark {
          background-color: white;
          border-radius: 50%;
        }
      }
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
<header
  class:light={$store.theme === "light"}
  class:dark={$store.theme === "dark"}
>
  <div class="left-block">
    <img
      class:dark={$store.theme === "dark"}
      src="quill-logo.png"
      alt="quill-logo"
    />
    <div>ConnecTez</div>
  </div>
  <div />
  <div class="right-block">
    <a href="#/" class="button-link">
      <button
        class="round"
        class:light={$store.theme === "light"}
        class:dark={$store.theme === "dark"}
      >
        <span class="material-icons-outlined"> home </span>
      </button>
    </a>
    <button
      id="header__theme_button"
      class="round"
      class:light={$store.theme === "light"}
      class:dark={$store.theme === "dark"}
      on:mouseenter={() => showPopper(themePopper, themePopperInstance)}
      on:mouseleave={() => hidePopper(themePopper)}
      on:focus={() => showPopper(themePopper, themePopperInstance)}
      on:blur={() => hidePopper(themePopper)}
      on:click={() =>
        store.updateTheme($store.theme === "light" ? "dark" : "light")}
    >
      {#if $store.theme === "light"}
        <span class="material-icons-outlined"> dark_mode </span>
      {:else}
        <span class="material-icons-outlined"> light_mode </span>
      {/if}
    </button>
    <div
      id="header__theme_button__tooltip"
      class="tooltip"
      class:light={$store.theme === "light"}
      class:dark={$store.theme === "dark"}
      role="tooltip"
    >
      Light/Dark theme
      <div class="tooltip-arrow" data-popper-arrow />
    </div>
    {#if userBlog}
      <a href={`#/blog/${userBlog}`} class="button-link">
        <button
          class="round"
          class:light={$store.theme === "light"}
          class:dark={$store.theme === "dark"}
        >
          <span class="material-icons-outlined"> contact_page </span>
        </button>
      </a>
      <button
        class="round"
        class:light={$store.theme === "light"}
        class:dark={$store.theme === "dark"}
      >
        <span class="material-icons-outlined"> note_add </span>
      </button>
    {:else}
      <a href="#/create-new-blog" class="button-link">
        <button
          id="header__new_blog_button"
          class="round"
          class:light={$store.theme === "light"}
          class:dark={$store.theme === "dark"}
          on:mouseenter={() => showPopper(newBlogPopper, newBlogPopperInstance)}
          on:mouseleave={() => hidePopper(newBlogPopper)}
          on:focus={() => showPopper(newBlogPopper, newBlogPopperInstance)}
          on:blur={() => hidePopper(newBlogPopper)}
        >
          <span class="material-icons-outlined"> add_circle_outline </span>
        </button>
      </a>
      <div
        id="header__new_blog_button__tooltip"
        class="tooltip"
        class:light={$store.theme === "light"}
        class:dark={$store.theme === "dark"}
        role="tooltip"
      >
        Create a new blog
        <div class="tooltip-arrow" data-popper-arrow />
      </div>
    {/if}
    <Wallet />
  </div>
</header>
