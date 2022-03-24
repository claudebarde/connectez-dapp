<script lang="ts">
  import { fade, fly } from "svelte/transition";
  import { Option } from "@swan-io/boxed";
  import store from "../../store";
  import utils from "../../utils";
  import config from "../../config";
</script>

<style lang="scss">
  @import "../../styles/settings.scss";

  #dialog-wrapper {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 200;

    #dialog-background {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100vw;
      height: 100vh;
      background-color: rgba($black, 0.3);
      z-index: 201;
    }

    #dialog {
      width: 35%;
      min-height: 15%;
      background-color: white;
      border-radius: 10px;
      padding: 15px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      gap: 10px;
      -webkit-box-shadow: 5px 5px 18px 0px rgba(0, 0, 0, 0.3);
      -moz-box-shadow: 5px 5px 18px 0px rgba(0, 0, 0, 0.3);
      box-shadow: 5px 5px 18px 0px rgba(0, 0, 0, 0.3);
      font-size: 1.1rem;
      z-index: 202;

      #dialog-title {
        font-weight: bold;
      }

      #dialog-body {
        & > div {
          margin: 10px;
        }
      }
    }
  }
</style>

{#if $store.dialog}
  <div id="dialog-wrapper">
    <div
      id="dialog-background"
      transition:fade={{ duration: 300 }}
      on:click={() => store.updateDialog(Option.None())}
    />
    <div id="dialog" transition:fly={{ y: 100, duration: 300 }}>
      <div id="dialog-title">{$store.dialog.title}</div>
      <div id="dialog-body">
        {#if $store.dialog.body === "wallet-settings"}
          <div>
            {$store.userAddress.match({
              None: () => "No user address",
              Some: addr => {
                return "Connected as " + addr;
              }
            })}
          </div>
          <div>
            RPC URL: {config.rpcUrls[config.network]}
          </div>
          <div>
            XTZ balance: {$store.userBalance.match({
              None: () => "No balance",
              Some: blnc => utils.formatTokenAmount(blnc) + " ꜩ"
            })}
          </div>
          <div>
            CNCT balance: {$store.userCnctBalance.match({
              None: () => "No balance",
              Some: blnc => utils.formatTokenAmount(blnc) + " CNCT"
            })}
          </div>
        {:else}
          {@html $store.dialog.body}
        {/if}
      </div>
      <div id="dialog-buttons" class="buttons">
        {#each $store.dialog.buttons as button}
          {#if button.type === "close"}
            <button class="primary" on:click={button.action}>
              {button.text}
            </button>
          {:else if button.type === "confirm"}
            <button class="primary" on:click={button.action}>
              {button.text}
            </button>
          {:else if button.type === "disconnect"}
            <button class="primary" on:click={button.action}>
              {button.text}
            </button>
          {/if}
        {/each}
      </div>
    </div>
  </div>
{/if}
