<script lang="ts">
  //import WalletIcon from "./WalletIcon.svelte";
</script>

<style lang="scss">
  @import "../styles/settings.scss";

  header {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: stretch;

    .header-container {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: stretch;

      .header-container__blocks {
        display: flex;
        justify-content: space-between;
        align-items: center;

        & > div {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          gap: 10px;
        }
      }
    }
  }

  .material-icons-outlined {
    color: $black;
  }
</style>

<header>
  <div class="header-container">
    <h1>ConnecTez - blogging platform on Tezos and IPFS</h1>
    <div class="header-container__blocks">
      <div>
        <div><span class="material-icons-outlined"> home </span></div>
        <div><span class="material-icons-outlined"> light_mode </span></div>
      </div>
      <div>
        <div>
          <span class="material-icons-outlined"> account_balance_wallet </span>
        </div>
      </div>
    </div>
  </div>
</header>
