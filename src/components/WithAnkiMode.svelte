<script lang="ts">
  let { children } = $props()
  let ankiMode = $state(false)
</script>

<div data-anki-mode={ankiMode}>
  <label>
    <input type="checkbox" bind:checked={ankiMode} />
    和訳を隠す
  </label>
  {@render children()}
</div>

<style>
  label {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    accent-color: #ff8dc7;
  }
  input {
    scale: 1.5;
  }
</style>
