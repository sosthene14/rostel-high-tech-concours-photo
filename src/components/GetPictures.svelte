<script lang="ts">
  import { onMount } from "svelte";
  import { getPictures } from "./ts/GetPictures";
  import { Circle } from "svelte-loading-spinners";
  import NavBar from "./NavBar.svelte";

  let images: string[] = [];
  let imagesNames: string[] = [];

  const fgetPictures = async () => {
    const dataImage = await getPictures();
    images = dataImage.images[0];
    imagesNames = dataImage.images[1];
  };
  onMount(() => {
    fgetPictures();
  });
</script>
<NavBar />
{#if images.length > 0}
  <div class="flex mt-20 gap-10 justify-center flex-wrap items-center">
    {#each images as imageData}
      <div class="flex justify-center flex-col items-center">
        <img
          class="w-[300px] rounded-md"
          src="data:image/png;base64,{imageData}"
          alt=""
        />
        <p class="text-white mt-3 text-lg">
          {imagesNames[images.indexOf(imageData)]}
        </p>
      </div>
    {/each}
  </div>
{:else}
<div class="flex justify-center absolute left-0 right-0 top-[50%]">
    {#if images.length === 0}
      <Circle size="60" color="#FF3E00" unit="px" duration="1s" />
    {/if}
  </div>
{/if}
