// Houses API calls

// Frontend sends request to get flashcard data - returns as JS object
export async function fetchFlashcards() {
    const token = localStorage.getItem("token")
    // Fetch data from backend API Endpoint
    const response = await fetch("http://127.0.0.1:5000/getflashcardsets", {
        method: "GET",
        headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
        },
    }); 
    if (response.ok) {
        const data = await response.json() // Convert JSON data from response object to JS Object
        return data
    }
    else {
        alert()
    }
    
    
}