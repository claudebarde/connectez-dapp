<script lang="ts">
  import store from "../store";
</script>

<style lang="scss">
  @import "../styles/settings.scss";
  .landing-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 20px;
    grid-gap: 60px;
    align-items: stretch;

    & > div {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
    }

    img {
      width: 40vw;
      border-radius: $std-border-radius;
    }
  }
</style>

<main class="central-container">
  {#if $store.userAddress.isSome()}
    <!-- User is connected -->
    <h1 class="block-title">New blog posts from your list</h1>
    <div>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </div>
    <div>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </div>
    <h1 class="block-title">Latest published blog posts</h1>
    <div>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </div>
    <div>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </div>
    <div>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </div>
  {:else}
    <!-- User is not connected -->
    <div class="landing-grid">
      <div>
        <img
          src="vecteezy_illustration-vector-graphic-cartoon-character-of-home-study_6584582.jpg"
          alt="girl-laptop"
        />
      </div>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </div>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </div>
      <div>
        <img
          src="vecteezy_illustration-vector-graphic-cartoon-character-of-home-study_6584649.jpg"
          alt="girl-laptop"
        />
      </div>
      <div>
        <img
          src="vecteezy-illustration-graphic-cartoon-character-of-female-writer-vector.jpeg"
          alt="create-blog"
        />
      </div>
      <div>
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </div>
        <a href="#/create-new-blog" class="button-link">
          <button
            class="primary"
            class:light={$store.theme === "light"}
            class:dark={$store.theme === "dark"}
          >
            <span class="material-icons-outlined"> add_circle_outline </span>
            &nbsp; Create a new blog
          </button></a
        >
      </div>
    </div>
    <div>Browse blogs</div>
  {/if}
  <footer>&nbsp;</footer>

  <!--
    <a href="https://www.vecteezy.com/free-vector/human">Human Vectors by Vecteezy</a>
    <a href="https://www.vecteezy.com/free-vector/human">Human Vectors by Vecteezy</a>
  -->
</main>
