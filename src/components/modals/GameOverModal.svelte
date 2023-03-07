<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Card from "./Card.svelte";
  import Modal from "./Modal.svelte";
  import PlayAgainButton from "./PlayAgainButton.svelte";
  import { Word } from "../../model/Word";

  export let open: boolean;
  export let attempts: Word[];
  export let optimalScore: number;

  const dispatch = createEventDispatcher();

  const onPlayAgain = () => {
    dispatch("play-again");
  };
</script>

<Modal title="Winner" {open} on:close>
  <div class="container">
    <div class="cards">
      <Card label="Optimal" contents={optimalScore} />
      <Card label="Score" contents={attempts.length} filled />
    </div>
    <PlayAgainButton on:click={onPlayAgain} />
  </div>
</Modal>

<style>
  .container {
    text-align: center;
  }

  .cards {
    display: flex;
    justify-content: center;
    width: 300px;
    margin: auto;
    margin-bottom: 64px;
    justify-content: space-evenly;
  }
</style>
