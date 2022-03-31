<script lang="ts">
  import { afterUpdate } from "svelte";
  import { push } from "svelte-spa-router";
  import { char2Bytes } from "@taquito/utils";
  import store from "../store";

  let descriptionError = false;

  afterUpdate(() => {
    // user cannot create a new blog if he already has one
    $store.userBlog.match({
      None: () => undefined,
      Some: addr => push(`#/blog/${addr}`)
    });
  });
</script>

<style lang="scss">
  @import "../styles/settings.scss";

  .blog-form {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border: solid 2px darken($bg-color, 10);
    border-radius: $std-border-radius;
    width: 90%;
    padding: 20px;
    margin: 5px;

    & > div {
      margin: 10px 0px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 100%;
    }
  }
</style>

<main class="central-container">
  <h1>Create a new blog</h1>
  <div>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
    non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
  </div>
  {#if $store.userAddress.isNone()}
    <!-- user is not connected -->
    <div>You must connect your wallet before continuing.</div>
  {:else}
    <div class="blog-form">
      <h2>Blog form</h2>
      <div>
        <label for="blogger-name">Your name:</label>
        <input type="text" id="blogger-name" />
      </div>
      <div>
        <label for="blog-name">The title of your blog:</label>
        <input type="text" id="blog-name" style="width:50%;" />
      </div>
      <div>
        <label for="blog-description">Describe your blog in a few words:</label>
        <textarea
          id="blog-description"
          class:error={descriptionError}
          style="width:70%;"
          rows="3"
          on:input={ev => {
            if (char2Bytes(ev.target.value).length > 200) {
              descriptionError = true;
            } else {
              descriptionError = false;
            }
          }}
        />
      </div>
      <div>
        <label for="blogger-birthday">Date of birth (optional):</label>
        <input type="text" id="blogger-birthday" />
      </div>
      <div>
        <label for="blogger-location">*Location (optional):</label>
        <input type="text" id="blogger-location" />
      </div>
      <div>
        <button
          class="primary"
          class:light={$store.theme === "light"}
          class:dark={$store.theme === "dark"}
        >
          Create
        </button>
      </div>
    </div>
  {/if}
  <footer>&nbsp;</footer>
</main>
