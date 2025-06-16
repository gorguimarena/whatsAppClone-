import { createElement } from "../component/components";

export function handleSelectDocument() {
  const fileInput = createElement("input", {
    type: "file",
    accept: ".pdf,.doc,.docx,.txt,.xls,.xlsx,.ppt,.pptx",
    class: ["hidden"],
    onChange: (e) => {
      const file = e.target.files[0];
      if (file) {
        console.log("Document sélectionné :", file.name);
      }
    },
  });
  document.body.appendChild(fileInput);
  fileInput.click();
  document.body.removeChild(fileInput);
}


export function handleSelectMedia() {
  const fileInput = createElement("input", {
    type: "file",
    accept: "image/*,video/*",
    class: ["hidden"],
    onChange: (e) => {
      const file = e.target.files[0];
      if (file) {
        console.log("Fichier média sélectionné :", file.name);
      }
    },
  });
  document.body.appendChild(fileInput);
  fileInput.click();
  document.body.removeChild(fileInput);
}
