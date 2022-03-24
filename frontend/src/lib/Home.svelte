<script lang="ts">
  import store from "../store";
</script>

<main class="central-container">
  {#if $store.userAddress.isSome()}
    <!-- User is connected -->
    <h1 class="block-title">Latest blog posts from your list</h1>
  {:else}
    <!-- User is not connected -->
    <div>Create a new blog</div>
    <div>Browse blogs</div>
  {/if}
</main>
