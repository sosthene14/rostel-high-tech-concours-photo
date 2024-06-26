import { toasts } from "svelte-toasts";

export interface response {
    image_ids: string[];
    success: boolean;
}
export const sendData = async (files: File[],senderName:string) : Promise<response> => {
    const formData = new FormData();
    files.forEach((file, index) => {
        formData.append("senderName", senderName);
        formData.append(`images[${index}]`, file);
    });
    fetch("https://rostel-high-tech-concours-photo-backend.vercel.app/upload", {
        method: "POST",
        body: formData,
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error("Erreur lors de l'envoi de la requête");
        }
        toasts.success("Photos envoyées avec succès");
        setTimeout(() => {
            window.location.reload();
        }, 2000);
        return response.json();

    })
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.error("Erreur:", error);
    });

    return { image_ids: [], success: false };
}

