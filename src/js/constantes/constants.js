
export const countries = [
  { name: "Sénégal", code: "+221", flag: "🇸🇳" },
  { name: "France", code: "+33", flag: "🇫🇷" },
  { name: "États-Unis", code: "+1", flag: "🇺🇸" },
  { name: "Canada", code: "+1", flag: "🇨🇦" },
  { name: "Royaume-Uni", code: "+44", flag: "🇬🇧" },
  { name: "Allemagne", code: "+49", flag: "🇩🇪" },
  { name: "Espagne", code: "+34", flag: "🇪🇸" },
  { name: "Italie", code: "+39", flag: "🇮🇹" },
  { name: "Maroc", code: "+212", flag: "🇲🇦" },
  { name: "Algérie", code: "+213", flag: "🇩🇿" },
  { name: "Tunisie", code: "+216", flag: "🇹🇳" },
  { name: "Côte d'Ivoire", code: "+225", flag: "🇨🇮" },
  { name: "Mali", code: "+223", flag: "🇲🇱" },
  { name: "Burkina Faso", code: "+226", flag: "🇧🇫" },
  { name: "Guinée", code: "+224", flag: "🇬🇳" },
  { name: "Cameroun", code: "+237", flag: "🇨🇲" },
];

export const infoOptions = [
  {
    icon: "bi bi-chat-left-fill",
    text: "Message",
  },
  {
    icon: "bi bi-microsoft-teams",
    text: "Groupes",
  },
  {
    icon: "bi bi-shuffle",
    text: "Diffusion",
  },
  {
    icon: "bi bi-calendar-plus-fill",
    text: "Archives",
  },
  {
    icon: "bi bi-plus-lg",
    text: "Nouveau",
  },
  {
    icon: "bi bi-arrow-bar-left",
    text: "Deconnexion",
  },
];

export const optionHandlers = {
  Message: () => {
    renderContactsList(getDiscussionContacts(idUser), false, false);
  },

  Groupes: () => {
    renderContactsList(getGroupDiscussions(idUser), true, false);
  },

  Diffusion: () => {
    diffusionChamps.style.display = "flex";
  },

  Archives: () => {
    renderContactsList(getArchivedDiscussions(idUser), null, false, true);
  },

  Nouveau: () => {
    newContact.style.display = "flex";
  },
  Deconnexion: () => {
    idUser = null;
    location.reload();
  },
};



