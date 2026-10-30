<script>
  import { slide } from "svelte/transition";
  export let title = "クリックして展開";

  let isOpen = false;

  function toggle() {
    isOpen = !isOpen;
  }
</script>

<div class="spoiler">
  <button class="spoiler-header" on:click={toggle} aria-expanded={isOpen}>
    <span class="icon" class:is-open={isOpen}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg
      >
    </span>
    <span class="title">{title}</span>
  </button>

  {#if isOpen}
    <div class="spoiler-content" transition:slide={{ duration: 250 }}>
      <div class="inner">
        <slot />
      </div>
    </div>
  {/if}
</div>

<style>
  .spoiler {
    margin: 1.5rem 0;
    border: 1px solid var(--theme-border);
    border-radius: 8px;
    overflow: hidden;
    background-color: var(--theme-bg);
  }

  .spoiler-header {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0.8rem 1rem;
    background: transparent;
    border: none;
    color: var(--theme-text);
    font-size: 1rem;
    font-weight: 600;
    text-align: left;
    cursor: pointer;
    transition: opacity 0.2s ease;
  }

  .spoiler-header:hover {
    opacity: 0.7;
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    transition: transform 0.3s ease;
  }

  .icon.is-open {
    transform: rotate(90deg); /* 開いた時に矢印を下に向ける */
  }

  .spoiler-content {
    border-top: 1px solid var(--theme-border);
  }

  .inner {
    overflow: hidden;
    padding: 1rem 1.25rem;
  }

  /* 最後の要素の余白を消してスッキリさせる */
  .inner :global(> *:last-child) {
    margin-bottom: 0;
  }
  .inner :global(> *:first-child) {
    margin-top: 0;
  }

  .inner :global(ul) {
    list-style-type: "・";
    padding-inline-start: 1.5em;
  }
</style>
