// defining vars
const API_URL = "https://api.dictionaryapi.dev";
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const resultContainer = document.getElementById("result-container");

// function to handle form submission
searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const query = searchInput.value.trim();
  
  if (query) {
    try {
      // Show loading feedback immediately
      resultContainer.innerHTML = `<p class="loading">🔍 Searching for "${query}"...</p>`;
      
      const response = await fetch(`${API_URL}/api/v2/entries/en/${query}`);
      if (!response.ok) {
        throw new Error("Word not found");
      } else {
        const data = await response.json();
        displayResult(data);
      }
    } catch (error) {
      displayError(error.message);
    }
  }
});

// function to display the result
function displayResult(data) {
  // Grab the first word object from the data array
  const wordData = data[0]; 
  const word = wordData.word;
  const phonetic = wordData.phonetic || "";

  // Start building our HTML string with the word and pronunciation
  let htmlContent = `
    <h2>${word}</h2>
    <p class="phonetic"><em>${phonetic}</em></p>
  `;

  // Loop through each part of speech (like noun, verb, etc.)
  for (let meaning of wordData.meanings) {
    htmlContent += `<h3>${meaning.partOfSpeech}</h3>`;

    // Loop through the definitions for this part of speech
    for (let def of meaning.definitions) {
      htmlContent += `<p class="definition">- ${def.definition}</p>`;
      
      // If there is an example sentence, show it right below
      if (def.example) {
        htmlContent += `<p class="example">"Example: ${def.example}"</p>`;
      }
    }
  }

  // FIXED: This line updates your webpage with the built HTML
  resultContainer.innerHTML = htmlContent;
}

// function to display error message
function displayError(message) {
  resultContainer.innerHTML = `
    <div class="error-message">
      <p>⚠️ ${message === "Word not found" ? "Sorry, we couldn't find definitions for that word." : message}</p>
    </div>
  `;
}


