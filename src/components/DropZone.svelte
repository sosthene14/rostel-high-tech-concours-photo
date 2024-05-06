<script lang="ts">
  import Dropzone from "svelte-file-dropzone";
  import { sendData, type response } from "./ts/SendPictures";
  import { Circle } from "svelte-loading-spinners";
  import {
    toasts,
    ToastContainer,
    FlatToast,
    BootstrapToast,
  } from "svelte-toasts";
  import { onMount } from "svelte";
  let files: { accepted: File[]; rejected: File[] } = {
    accepted: [],
    rejected: [],
  };
  let isDragOver = false;
  let haveSubmitted = false;
  let senderName = "";

  function handleFilesSelect(
    e: CustomEvent<{ acceptedFiles: File[]; fileRejections: File[] }>
  ) {
    const { acceptedFiles, fileRejections } = e.detail;
    files.accepted = [...files.accepted, ...acceptedFiles];
    files.rejected = [...files.rejected, ...fileRejections];
    if (files.accepted.length > 3) {
      showToast("Veuillez ne pas envoyer plus de 3 photos");
      files.accepted = files.accepted.slice(0, 3);
      return;
    }
  }

  const send = async (): Promise<response> => {
    haveSubmitted = true;
    const response = await sendData(files.accepted, senderName);
    console.log(response);
    if (response && response.image_ids && response.image_ids.length > 0) {
      showToast("Photos envoyées");
      files.accepted = [];
    }
    setTimeout(() => {
      haveSubmitted = false;
    }, 4000);
    return response;
  };

  const showToast = (message: string) => {
    const toast = toasts.add({
      description: message,
      duration: 10000,
    });
  };

  function returnInput() {
    let input = document.createElement("input");
    input.type = "text";
    input.value = senderName;
    input.className =
      "bg-[#F7F7F7] rounded-md outline-none flex justify-center mt-10 h-10 pl-3 w-[90%] md:w-1/2 mx-auto";
    input.placeholder = "prenom (optionnel)";
    input.oninput = (e: Event) => {
      const inputElement = e.target as HTMLInputElement;
      senderName = inputElement.value;
    };

    let whereToAdd = document.getElementById("input");
    whereToAdd && whereToAdd.appendChild(input);
  }
  onMount(returnInput);
</script>

<div id="input"></div>
<ToastContainer let:data placement="top-right">
  <FlatToast {data} />
</ToastContainer>
<Dropzone
  on:drop={handleFilesSelect}
  on:dragenter={() => (isDragOver = true)}
  on:dragleave={() => (isDragOver = false)}
  accept="image/*"
  maxSize={625000}
  containerClasses="flex justify-center w-[90%] md:w-1/2 mx-auto mt-5 h-40 rounded-xl"
  containerStyles={`${isDragOver ? "background-color: gray;" : "background-color: #F7F7F7;"}  border: 1px dashed #BDBDBD; border-radius: 10px;`}
/>

<ol class="flex justify-center mt-10 text-white flex-col items-center">
  {#each files.accepted as item}
    <li>{item.name}</li>
  {/each}
</ol>

<div class="flex justify-center absolute left-0 right-0 top-[50%]">
  {#if haveSubmitted}
    <Circle size="60" color="#FF3E00" unit="px" duration="1s" />
  {/if}
</div>

<div class="flex justify-center mt-5 mb-20">
  <button
    on:click={() =>
      files.accepted.length > 0
        ? send()
        : showToast("Veuillez envoyer une photo")}
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
    >Valider</button
  >
</div>
