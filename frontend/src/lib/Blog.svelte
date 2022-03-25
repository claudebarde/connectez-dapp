<script lang="ts">
  import { onMount } from "svelte";
  import store from "../store";

  export let params;

  let blogAddress = "";
  let loadingBlog = true;
  let errorLoadingBlog = false;

  onMount(() => {
    const { address } = params;
    blogAddress = address;
  });
</script>

{#if loadingBlog}
  <div>Loading</div>
{:else}
  <div>Blog</div>
{/if}
