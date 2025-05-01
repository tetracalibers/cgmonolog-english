<script lang="ts">
  export let min = 0
  export let max = 1
  export let value
  export let step = 0.01
</script>

<div class="relative flex items-center flex-1">
  <div class="_progress h-2 w-full rounded-md absolute shadow-md shadow-white" />
  <div
    class="h-2 rounded-md bg-gradient-to-r from-[#ABC7FF] to-[#C1E3FF] absolute"
    style={`width: ${(value * 100) / max}%;`}
  />
  <input
    bind:value={value}
    min={min}
    max={max}
    step={step}
    type="range"
    class="w-full absolute h-2 appearance-none bg-transparent outline-none"
  />
</div>

<style>
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    @apply w-2 h-2 cursor-pointer;
  }

  input[type="range"]::-webkit-slider-thumb:hover {
    @apply bg-[#ABC7FF] rounded-sm;
  }

  ._progress {
    background-color: #ebecf0;
    box-shadow:
      8px 8px 12px -2px rgba(255, 255, 255, 0.4),
      -6px -6px 12px -1px rgba(255, 255, 255, 1);
  }
</style>
