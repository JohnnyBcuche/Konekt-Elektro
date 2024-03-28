// Translate page content

async function fetchLanguageData(lang) {
  const response = await fetch(`../assets/languages/${lang}.json`);
  return response.json();
}

function setLanguagePreference(lang) {
  localStorage.setItem("language", lang);
  location.reload();
}

function updateContent(langData) {
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    element.textContent = langData[key];
  });

  document.querySelectorAll("[data-lng]").forEach((link) => {
    const dataLng = link.getAttribute("data-lng");
    const lng = localStorage.getItem("language") || "en";

    if (dataLng === lng) {
      link.classList.add("active");
    }
  });
}

async function changeLanguage(lang) {
  await setLanguagePreference(lang);

  const langData = await fetchLanguageData(lang);
  updateContent(langData);
}

window.addEventListener("DOMContentLoaded", async () => {
  const userPreferredLanguage = localStorage.getItem("language") || "en";
  const langData = await fetchLanguageData(userPreferredLanguage);
  updateContent(langData);
});
