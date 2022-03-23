<script lang="ts">
  import store from "../store";
</script>

<main class="central-container">
  {#if $store.userAddress.isSome()}
    <!-- User is connected -->
    <div>Welcome back!</div>
  {:else}
    <!-- User is not connected -->
    <div>Create a new blog</div>
    <div>Browse blogs</div>
  {/if}
</main>
