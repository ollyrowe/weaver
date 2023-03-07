<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { getTheme } from "../../misc/theme";

  const theme = getTheme();

  export let binding: string;
  export let color = theme.grey;

  const dispatch = createEventDispatcher();

  const onClick = () => {
    dispatch("press");
  };
</script>

<div class="button" style:background-color={color} on:click={onClick}>
  {binding}
</div>

<style>
  .button {
    font-weight: bold;
    font-size: smaller;
    color: var(--text-default);
    margin: 2.5px;
    border-radius: 4px;
    width: 13vw;
    height: 13vw;
    max-width: 44px;
    max-height: 44px;
    padding: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    user-select: none;
  }
</style>
