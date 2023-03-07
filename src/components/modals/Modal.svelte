<script lang="ts">
  import { createEventDispatcher, onDestroy, onMount } from "svelte";
  import { fade, fly } from "svelte/transition";

  export let open: boolean;
  export let title: string;

  const dispatch = createEventDispatcher();

  const onClose = () => {
    dispatch("close");
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    // If the escape key was pressed
    if (event.key === "Escape") {
      onClose();
    }
  };

  onMount(() => {
    document.addEventListener("keydown", handleKeyPress);
  });

  onDestroy(() => {
    document.removeEventListener("keydown", handleKeyPress);
  });

  /* Modal opening and closing animation length in milliseconds */
  const ANIMATION_LENGTH = 250;
</script>

{#if open}
  <div transition:fade={{ duration: ANIMATION_LENGTH }} class="wrapper">
    <div
      transition:fly={{ duration: ANIMATION_LENGTH, y: 200 }}
      class="contents"
      role="dialog"
      aria-label={`${title} Dialog`}
    >
      <div class="header">
        <div
          role="button"
          class="close-button"
          aria-label="Close"
          on:click={onClose}
        >
          &times;
        </div>
        <h3>{title}</h3>
      </div>
      <div class="body"><slot /></div>
    </div>
  </div>
{/if}

<style>
  .wrapper {
    display: flex;
    position: absolute;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    overflow: hidden;
  }

  .contents {
    position: relative;
    color: var(--text-default);
    background-color: var(--background);
    margin: auto;
    padding: 0;
    width: 90%;
    max-width: 360px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    opacity: 1 !important;
    border-radius: 6px;
  }

  .header {
    text-align: center;
    padding: 16px;
  }

  .close-button {
    float: right;
    font-size: 28px;
    font-weight: bold;
    line-height: 12px;
    cursor: pointer;
    user-select: none;
  }

  .body {
    padding: 16px;
  }
</style>
