<script lang="ts">
  import Shake from "../animations/Shake.svelte";
  import Tile from "./Tile.svelte";
  import { Letter } from "../../model/Letter";
  import { Word } from "../../model/Word";
  import { TARGET_WORD_LENGTH } from "../../misc/constants";

  export let word: Word | undefined = undefined;
  export let readOnly = false;

  $: letters = new Array(TARGET_WORD_LENGTH)
    .fill(0)
    .map((_, i) => word?.letterAt(i));

  // The index of the letter tile which should appear as active
  $: activeIndex = word?.length;

  /**
   * Determines whether a tile should appear as active.
   *
   * @param index - index of the tile
   * @param letter - the letter assoicted with the tile
   */
  const isActive = (index: number, letter?: Letter) => {
    return letter?.isActive() || index == activeIndex;
  };

  // Whether the row should be shaking
  let shaking = false;
  // Counter which is used to keep track of changes to the word shake count state
  let shakingCount = 0;
  // Timeout used to automatically end the shake animation after a period of time
  let shakingTimeout: NodeJS.Timeout;

  // The duration of the shake animation in milliseconds
  const SHAKE_DURATION = 500;

  /**
   * Enables the shake state for a period of time.
   */
  const shake = () => {
    // Enable shaking state
    shaking = true;

    // Clear any existing time out
    clearTimeout(shakingTimeout);

    /*
     * Update the time out with a new one which resets
     * the shake state after the fixed duration period
     */
    shakingTimeout = setTimeout(() => {
      shaking = false;
    }, SHAKE_DURATION);
  };

  $: {
    // A change in the word's shake count implies the word should be shaken
    if (word && word.shakeCount > shakingCount) {
      // Increment the local shake counter
      shakingCount++;
      // Enable the shake animation
      shake();
    }
  }
</script>

<Shake {shaking}>
  <div class="container">
    {#each letters as letter, key (key)}
      <Tile {key} {letter} active={isActive(key, letter)} {readOnly} />
    {/each}
  </div>
</Shake>

<style>
  .container {
    display: flex;
    padding-left: 16px;
    padding-right: 16px;
  }
</style>
