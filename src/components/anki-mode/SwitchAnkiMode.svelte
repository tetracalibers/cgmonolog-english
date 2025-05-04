<script lang="ts">
  import { ankiMode } from "./state.svelte"
</script>

<label>
  <input type="checkbox" bind:checked={ankiMode.enabled} />
  和訳を隠す
</label>

<style>
  label {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    accent-color: #ff8dc7;
    color: var(--slate-500);
  }
  input {
    scale: 1.5;
  }
</style>
