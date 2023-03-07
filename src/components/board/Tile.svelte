<script lang="ts">
  import { getTheme } from "../../misc/theme";

  import { Letter } from "../../model/Letter";

  export let letter: Letter | undefined = undefined;
  export let active = false;
  export let readOnly = false;

  // Optional key prop to support testing
  export let key: number | undefined = undefined;

  const theme = getTheme();

  const getTextColour = (correct: boolean | undefined, readOnly: boolean) => {
    if (correct && readOnly) {
      return theme.text.contrast;
    }

    return theme.text.default;
  };

  const getBackgroundColour = (
    correct: boolean | undefined,
    readOnly: boolean
  ) => {
    if (correct && readOnly) {
      return theme.green.default;
    }

    if (correct) {
      return theme.green.light;
    }

    if (readOnly) {
      return theme.grey;
    }

    return theme.background;
  };

  const getBorderColour = (
    correct: boolean | undefined,
    readOnly: boolean,
    active: boolean
  ) => {
    if (correct && readOnly) {
      return theme.green.default;
    }

    if (active) {
      return theme.active;
    }

    return theme.border;
  };

  $: textColour = getTextColour(letter?.isCorrect(), readOnly);
  $: backgroundColour = getBackgroundColour(letter?.isCorrect(), readOnly);
  $: borderColour = getBorderColour(letter?.isCorrect(), readOnly, active);

  // Value for the data-testid attriubute
  $: testId = typeof key === "undefined" ? "tile" : `tile-${key}`;
</script>

<div
  class="box"
  style:color={textColour}
  style:background-color={backgroundColour}
  style:border="2px solid {borderColour}"
  data-testid={testId}
>
  <div class="content">
    {#if letter}
      {letter.getValue()}
    {/if}
  </div>
</div>

<style>
  .box {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: xx-large;
    font-weight: bold;
    margin: 2.5px;
    border-radius: 2px;
    width: 25%;
    padding-bottom: calc(25% - 9px);
    max-width: 80px;
    max-height: 80px;
    user-select: none;
  }

  .content {
    text-transform: uppercase;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
