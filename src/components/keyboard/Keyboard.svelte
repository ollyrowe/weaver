<script lang="ts">
  import { createEventDispatcher, onMount, onDestroy } from "svelte";
  import Key from "./Key.svelte";
  import { getTheme } from "../../misc/theme";
  import { Action } from "../../model/enums/Action";
  import { Character } from "../../model/enums/Character";
  import type { KeyBinding } from "../../model/enums/KeyBinding";

  const theme = getTheme();

  // The keypress event name
  const KEY_PRESS = "key-press";

  type KeyPressEvent = { [KEY_PRESS]: KeyBinding };

  const dispatch = createEventDispatcher<KeyPressEvent>();

  const onKeyPress = (keyBinding: KeyBinding) => {
    dispatch(KEY_PRESS, keyBinding);
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    const keyPressed = String(event.key).toUpperCase();

    // If a character or action key was pressed
    if (
      Object.keys(Character).includes(keyPressed) ||
      Object.keys(Action).includes(keyPressed)
    ) {
      dispatch(KEY_PRESS, keyPressed as KeyBinding);
    }
  };

  onMount(() => {
    document.addEventListener("keydown", handleKeyPress);
  });

  onDestroy(() => {
    document.removeEventListener("keydown", handleKeyPress);
  });

  const topRowKeys = [
    Character.Q,
    Character.W,
    Character.E,
    Character.R,
    Character.T,
    Character.Y,
    Character.U,
    Character.I,
    Character.O,
    Character.P,
  ];

  const middleRowKeys = [
    Character.A,
    Character.S,
    Character.D,
    Character.F,
    Character.G,
    Character.H,
    Character.J,
    Character.K,
    Character.L,
  ];

  const bottomRowKeys = [
    Action.ENTER,
    Character.Z,
    Character.X,
    Character.C,
    Character.V,
    Character.B,
    Character.N,
    Character.M,
    Action.BACKSPACE,
  ];
</script>

<div>
  <div class="container">
    <div class="row">
      {#each topRowKeys as key}
        <Key binding={key.toString()} on:press={() => onKeyPress(key)} />
      {/each}
    </div>
    <div class="middle-row">
      {#each middleRowKeys as key}
        <Key binding={key.toString()} on:press={() => onKeyPress(key)} />
      {/each}
    </div>
    <div class="row">
      {#each bottomRowKeys as key}
        <Key
          binding={key === Action.BACKSPACE ? "BACK" : key}
          color={key === Action.ENTER ? theme.green.light : theme.grey}
          on:press={() => onKeyPress(key)}
        />
      {/each}
    </div>
  </div>
</div>

<style>
  .container {
    padding: 6px;
    padding-top: 0px;
    max-width: 450px;
    margin: auto;
  }

  .row {
    display: flex;
  }

  .middle-row {
    display: flex;
    padding-left: 12px;
    padding-right: 12px;
  }
</style>
