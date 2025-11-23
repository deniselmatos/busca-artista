import "./style.css";
import { searchArtists } from "./api.js";
import {
  onSearchSubmit,
  showLoading,
  showError,
  showEmpty,
  renderArtists,
} from "./ui.js";

function toggleNightMode() {
  const isNightMode = document.body.classList.toggle("night-mode");
  localStorage.setItem("nightMode", isNightMode);
}

function checkNightMode() {
  const savedNightMode = localStorage.getItem("nightMode");
  if (savedNightMode === "true") {
    document.body.classList.add("night-mode");
  }
}

async function handleSearch(term) {
  if (!term) {
    showError("Digite o nome de um artista para buscar.");
    return;
  }

  try {
    showLoading();
    const artists = await searchArtists(term);

    if (artists.length === 0) {
      showEmpty();
    } else {
      renderArtists(artists);
    }
  } catch (error) {
    console.error(error);
    showError("Ocorreu um erro ao buscar os artistas. Tente novamente.");
  }
}

function initializeSearch() {
  handleSearch("Coldplay");
}

const nightModeButton = document.querySelector("#toggle-night-mode");
nightModeButton.addEventListener("click", toggleNightMode);

checkNightMode();

initializeSearch();

onSearchSubmit(handleSearch);
