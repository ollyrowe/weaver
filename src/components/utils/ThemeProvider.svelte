<script lang="ts">
  import { initialiseTheme, createStyleTemplate } from "../../misc/theme";

  initialiseTheme();

  const style = createStyleTemplate();
</script>

<svelte:head>
  {@html style}
</svelte:head>

<slot />
