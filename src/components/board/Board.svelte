<script lang="ts">
  import { afterUpdate, createEventDispatcher } from "svelte";
  import Row from "./Row.svelte";
  import { Word } from "../../model/Word";

  const dispatch = createEventDispatcher();

  export let startWord: Word;
  export let endWord: Word;
  export let attempts: Word[];

  const onReset = () => {
    dispatch("reset");
  };

  // Reference to the attempts container element
  let attemptsElement: HTMLElement;

  // When a new word is added, scroll to the bottom of the attempts container
  afterUpdate(() => {
    scrollToBottom(attemptsElement);
  });

  const scrollToBottom = (element: HTMLElement) => {
    element.scroll({ top: element.scrollHeight, behavior: "smooth" });
  };
</script>

<div class="background">
  <div class="container">
    <Row word={startWord} readOnly />
    <div bind:this={attemptsElement} class="attempts">
      {#each attempts as attempt, i (i)}
        <Row word={attempt} />
      {/each}
    </div>
    <Row word={endWord} readOnly />
    {#if attempts.length > 1}
      <div role="button" class="reset-button" on:click={onReset}>Reset</div>
    {/if}
  </div>
</div>

<style>
  .background {
    display: flex;
    padding: 8px 12px;
    flex-grow: 1;
    overflow: hidden;
    justify-content: center;
  }

  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 300px;
  }

  .attempts {
    max-height: 400px;
    overflow-x: clip;
    overflow-y: overlay;
    margin-top: 24px;
    margin-bottom: 24px;
  }

  .reset-button {
    cursor: pointer;
    width: fit-content;
    color: var(--text-default);
    margin-top: 10px;
    margin-left: auto;
    margin-right: auto;
  }
</style>
