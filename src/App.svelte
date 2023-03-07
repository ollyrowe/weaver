<script lang="ts">
  import AppBar from "./components/layout/AppBar.svelte";
  import Board from "./components/board/Board.svelte";
  import Keyboard from "./components/keyboard/Keyboard.svelte";
  import GameOverModal from "./components/modals/GameOverModal.svelte";
  import ThemeProvider from "./components/utils/ThemeProvider.svelte";
  import Background from "./components/layout/Background.svelte";
  import {
    startWord,
    endWord,
    attempts,
    displayOutcome,
    initialiseGame,
    onKeyPress,
    closeOutcome,
    optimalScore,
    reset,
  } from "./store";
</script>

<ThemeProvider>
  <Background>
    <AppBar />
    <Board
      startWord={$startWord}
      endWord={$endWord}
      attempts={$attempts}
      on:reset={reset}
    />
    <Keyboard on:key-press={onKeyPress} />
    <GameOverModal
      attempts={$attempts}
      open={$displayOutcome}
      optimalScore={$optimalScore}
      on:play-again={initialiseGame}
      on:close={closeOutcome}
    />
  </Background>
</ThemeProvider>
