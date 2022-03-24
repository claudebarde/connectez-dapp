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
    <button
      id="header__theme_button"
      class="round"
      on:mouseenter={() => showPopper(themePopper, themePopperInstance)}
      on:mouseleave={() => hidePopper(themePopper)}
      on:focus={() => showPopper(themePopper, themePopperInstance)}
      on:blur={() => hidePopper(themePopper)}
    >
      <span class="material-icons-outlined"> light_mode </span>
    </button>
    <div id="header__theme_button__tooltip" class="tooltip" role="tooltip">
      Light/Dark theme
      <div class="tooltip-arrow" data-popper-arrow />
    </div>
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
      <button
        id="header__new_blog_button"
        class="round"
        on:mouseenter={() => showPopper(newBlogPopper, newBlogPopperInstance)}
        on:mouseleave={() => hidePopper(newBlogPopper)}
        on:focus={() => showPopper(newBlogPopper, newBlogPopperInstance)}
        on:blur={() => hidePopper(newBlogPopper)}
      >
        <span class="material-icons-outlined"> add_circle_outline </span>
      </button>
      <div id="header__new_blog_button__tooltip" class="tooltip" role="tooltip">
        Create a new blog
        <div class="tooltip-arrow" data-popper-arrow />
      </div>
    {/if}
    <Wallet />
  </div>
</header>
