<script lang="ts">
  import store from "../../store";
</script>

<style lang="scss">
  @import "../../styles/settings.scss";

  #wallet-wrapper {
    $height: 1.1rem;
    $tezos-blue: #0f62ff;
    $yellow: #ffca00;

    position: relative;
    height: $height;
    width: calc(#{$height} * 1.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9;

    #wallet {
      $wallet-width: calc(#{$height} * 1.1);

      height: $height;
      width: $wallet-width;
      background-color: $bg-color;
      border-radius: 4px;
      border: solid 2px $black;
      position: relative;
      z-index: initial;

      #wallet-buckle {
        $buckle-height: calc(#{$height} / 3);

        background-color: $bg-color;
        height: $buckle-height;
        width: 40%;
        border-radius: 4px;
        border: solid 2px $black;
        position: absolute;
        top: calc(50% - #{$buckle-height} / 1.4);
        left: -20%;
        display: flex;
        justify-content: space-around;
        align-items: center;
        z-index: 20;

        #wallet-buckle-dot {
          background-color: $black;
          border-radius: 50%;
          height: 50%;
          width: 25%;
        }
      }

      #user-icon {
        width: 100%;
        height: 100%;
        padding: 0px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 5px;
        opacity: 0;
        z-index: 21;
        transition: 0.5s;

        #user-icon__head {
          border: solid 4px $black;
          width: 25%;
          height: 30%;
          border-radius: 50%;
        }

        #user-icon__body {
          border: solid 4px $black;
          width: 30%;
          height: 20%;
          border-top-left-radius: 50%;
          border-top-right-radius: 50%;
          border-bottom: none;
        }
      }

      #first-coin,
      #second-coin {
        border-radius: 50%;
        height: 60%;
        width: 40%;
        padding: 0px;
        color: white;
        font-size: 0.8rem;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      #first-coin {
        position: absolute;
        top: 0px;
        left: 0px;
        background-color: $tezos-blue;
        border: solid 2px darken($tezos-blue, 20);
        transition: 0.4s;
        z-index: -1;
      }
      #second-coin {
        position: absolute;
        top: 0px;
        left: 30%;
        background-color: $yellow;
        border: solid 2px darken($yellow, 20);
        transition: 0.4s;
        transition-delay: 0.1s;
        z-index: -2;
      }

      &:hover #first-coin {
        transform: translate(20%, -50%) rotate(-20deg);
      }
      &:hover #second-coin {
        transform: translate(20%, -60%) rotate(-20deg);
      }

      &.disconnect::after {
        content: "\2573";
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        font-size: 2rem;
        font-weight: 100;
        color: $black;
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 0px;
        padding: 0px;
        z-index: 50;
      }
    }
  }

  @keyframes open-wallet {
    from {
      transform: rotate(0deg);
    }

    to {
      transform: rotate(-15deg);
      transform-origin: top left;
    }
  }
</style>

<div id="wallet-wrapper">
  <div id="wallet" class:disconnect={$store.userAddress.isSome()}>
    <div id="wallet-buckle">
      <div />
      <div id="wallet-buckle-dot" />
    </div>
    <div id="user-icon">
      <div id="user-icon__head" />
      <div id="user-icon__body" />
    </div>
    <div id="first-coin" />
    <div id="second-coin" />
  </div>
</div>
