<script lang="ts">
  import Dropzone from "svelte-file-dropzone";
  import { sendData, type response } from "./ts/SendPictures";
  import { Circle } from "svelte-loading-spinners";
  import { toasts, ToastContainer, FlatToast } from "svelte-toasts";
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
  inputElement={{
    placeHolder: "Veuillez cliquer ici pour envoyer vos photos",
  }}
  on:drop={handleFilesSelect}
  on:dragenter={() => (isDragOver = true)}
  on:dragleave={() => (isDragOver = false)}
  accept="image/*"
  maxSize={625000}
  containerClasses="flex justify-center w-[90%] md:w-1/2 mx-auto mt-5 h-40 rounded-xl"
  containerStyles={`${isDragOver ? "background-color: gray;" : "background-color: #F7F7F7;"}  border: 1px dashed #BDBDBD; border-radius: 10px;`}
>
  <p class="text-center flex flex-col items-center">
    Glissez deposez ou Veuillez cliquer ici pour envoyer vos photos
  </p>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="3em"
    height="3em"
    viewBox="0 0 24 24"
    {...$$props}
  >
    <g
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="2"
    >
      <path
        fill="none"
        stroke-dasharray="14"
        stroke-dashoffset="14"
        d="M6 19h12"
      >
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          dur="0.4s"
          values="14;0"
        />
      </path>
      <path
        fill="currentColor"
        d="M12 15 h2 v-6 h2.5 L12 4.5M12 15 h-2 v-6 h-2.5 L12 4.5"
      >
        <animate
          attributeName="d"
          calcMode="linear"
          dur="1.5s"
          keyTimes="0;0.7;1"
          repeatCount="indefinite"
          values="M12 15 h2 v-6 h2.5 L12 4.5M12 15 h-2 v-6 h-2.5 L12 4.5;M12 15 h2 v-3 h2.5 L12 7.5M12 15 h-2 v-3 h-2.5 L12 7.5;M12 15 h2 v-6 h2.5 L12 4.5M12 15 h-2 v-6 h-2.5 L12 4.5"
        />
      </path>
    </g>
  </svg>
</Dropzone>

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

<div class="flex gap-5 justify-center mt-5 mb-20">
  <button
    on:click={() =>
      files.accepted.length > 0
        ? send()
        : showToast("Veuillez envoyer une photo")}
    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
    >Valider</button
  >
  <button
    on:click={() => (files.accepted = [])}
    class="border-rose-200 border-solid border-[2px] hover:bg-rose-400 text-white font-bold py-2 px-4 rounded-md"
    >Effacer</button
  >
</div>
