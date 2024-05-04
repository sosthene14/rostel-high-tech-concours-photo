<script>
  import DropZone from "../components/DropZone.svelte";
  import MainTextSection from "../components/MainTextSection.svelte";
  import NavBar from "../components/NavBar.svelte";
</script>

<NavBar />
<MainTextSection />
<DropZone />

<style lang="postcss">
  :global(html) {
    background-color: theme(colors.slate.800);
  }
</style>
