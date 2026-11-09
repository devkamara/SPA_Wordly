//defining vars

const API_URL = "https://dictionaryapi.dev";
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const resultContainer = document.getElementById("result-container");

//function to handle form submission
searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
    const query = searchInput.value.trim();
    if (query) {
      try {
        const response = await fetch(`${API_URL}/api/v2/entries/en/${query}`);
        if (!response.ok) {
          throw new Error("Word not found");
        }
        else {
          const data = await response.json();
          displayResult(data);
        }
        } catch (error) {
            displayError(error.message);
        }
    }
});

//function to display the result
function displayResult(data) {
  const word = data[0].word;
  const phonetic = data[0].phonetic || "";
  const meanings = data[0].meanings.map((meaning) => {
    const partOfSpeech = meaning.partOfSpeech;
    const definitions = meaning.definitions.map((definition) => definition.definition).join(", ");
    return `<p><strong>${partOfSpeech}:</strong> ${definitions}</p>`;
  }).join("");
}

//function to display error message
function displayError(message) {
  resultContainer.innerHTML = `<p class="error">${message}</p>`;
}


