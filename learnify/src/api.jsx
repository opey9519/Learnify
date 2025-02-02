// Houses API calls

// Frontend sends request to get flashcard data - returns as JS object
export async function fetchFlashcards() {
    const response = await fetch("http://127.0.0.1:5000/api/flashcards") // Fetch data from backend API Endpoint
    const data = await response.json() // Convert JSON data from response object to JS Object
    return data
}