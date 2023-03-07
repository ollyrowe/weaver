<script lang="ts">
  export let label: string;
  export let contents: string | number;
  export let filled = false;
</script>

<div class="container">
  <div class="contents" class:filled>{contents}</div>
  <div class="label">{label}</div>
</div>

<style>
  .container {
    position: relative;
    height: 0px;
    width: 25%;
    padding-bottom: 25%;
    margin-top: 0;
  }

  .contents {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    text-transform: uppercase;
    background-color: var(--grey);
    font-size: 2em;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .filled {
    background-color: var(--green-default);
    color: var(--text-contrast);
  }

  .label {
    text-align: center;
    position: absolute;
    bottom: -1.5em;
    width: 100%;
  }
</style>
