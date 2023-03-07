<script lang="ts">
  export let shaking = false;
</script>

<div class:animate={shaking}>
  <slot />
</div>

<style>
  .animate {
    animation: shake 0.35s;
    animation-iteration-count: infinite;
  }

  @keyframes shake {
    0% {
      transform: translate(1px, 0px);
    }
    10% {
      transform: translate(-1px, 0px);
    }
    20% {
      transform: translate(-4px, 0px);
    }
    30% {
      transform: translate(4px, 0px);
    }
    40% {
      transform: translate(1px, 0px);
    }
    50% {
      transform: translate(-1px, 0px);
    }
    60% {
      transform: translate(-4px, 0px);
    }
    70% {
      transform: translate(4px, 0px);
    }
    80% {
      transform: translate(-1px, 0px);
    }
    90% {
      transform: translate(1px, 0px);
    }
    100% {
      transform: translate(1px, 0px);
    }
  }
</style>
