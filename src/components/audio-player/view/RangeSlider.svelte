<script lang="ts">
  interface Props {
    min?: number
    max?: number
    value: any
    step?: number
  }

  let { min = 0, max = 1, value = $bindable(), step = 0.01 }: Props = $props()
</script>

<div class="root">
  <div class="progress"></div>
  <div class="progress-bar" style={`width: ${(value * 100) / max}%;`}></div>
  <input bind:value={value} min={min} max={max} step={step} type="range" class="progress-input" />
</div>

<style>
  .root {
    position: relative;
    display: flex;
    flex: 1 1 0%;
    align-items: center;
  }

  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 0.5rem;
    width: 0.5rem;
    cursor: pointer;
  }

  input[type="range"]::-webkit-slider-thumb:hover {
    border-radius: 0.125rem;
    background-color: #abc7ff;
  }

  .progress {
    background-color: #ebecf0;
    box-shadow:
      8px 8px 12px -2px rgba(255, 255, 255, 0.4),
      -6px -6px 12px -1px rgba(255, 255, 255, 1);
    position: absolute;
    height: 0.5rem;
    width: 100%;
    border-radius: 0.375rem;
    box-shadow:
      0 0 #0000,
      0 0 #0000,
      0 4px 6px -1px rgb(0, 0, 0, 0.1),
      0 2px 4px -2px rgb(0, 0, 0, 0.1);
  }

  .progress-bar {
    position: absolute;
    height: 0.5rem;
    border-radius: 0.375rem;
    background-image: linear-gradient(to right, #abc7ff, #c1e3ff);
  }

  .progress-input {
    position: absolute;
    height: 0.5rem;
    width: 100%;
    appearance: none;
    background-color: transparent;
    outline: 2px solid transparent;
    outline-offset: 2px;
  }
</style>
