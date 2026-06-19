<script lang="ts">
  import { onMount } from "svelte";

  export let headings: { depth: number; slug: string; text: string }[] = [];

  let activeId = headings.length > 0 ? headings[0].slug : "";
  let isClickScroll = false;
  let timeoutId: ReturnType<typeof setTimeout>;

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickScroll) return;

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            activeId = entry.target.id;
          }
        });
      },
      { rootMargin: "-10% 0px -80% 0px" },
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.slug);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  });

  function handleClick(slug: string) {
    activeId = slug;
    isClickScroll = true;
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      isClickScroll = false;
    }, 50);
  }
</script>

<nav class="toc" aria-label="Table of Contents">
  <p>Table of Contents</p>
  <ul>
    {#each headings as heading (heading.slug)}
      <li class="depth-{heading.depth}">
        <a
          href="#{heading.slug}"
          class:active={activeId === heading.slug}
          on:click={() => handleClick(heading.slug)}
        >
          {heading.text}
        </a>
      </li>
    {/each}
  </ul>
</nav>

<style>
  .toc {
    color: color-mix(in srgb, var(--theme-text), transparent 34%);
    font-size: 0.86rem;
  }

  .toc p {
    margin: 0 0 0.7rem;
    color: color-mix(in srgb, var(--theme-text), transparent 48%);
    font-family: var(--theme-font-mono);
    font-weight: 700;
  }

  .toc ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .toc li {
    margin-bottom: 0.45rem;
  }

  .depth-3 {
    padding-left: 0.9rem;
  }

  .depth-4 {
    padding-left: 1.8rem;
  }

  .toc a {
    color: inherit;
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .toc a:hover,
  .toc a.active {
    color: var(--theme-accent);
  }

  .toc a.active {
    font-weight: 700;
  }
</style>
