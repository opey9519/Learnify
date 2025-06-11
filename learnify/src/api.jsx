// Houses API calls

// Frontend sends request to get flashcard data - returns as JS object
export async function fetchFlashcards() {
    try {
        const token = localStorage.getItem("token")
    // Fetch data from backend API Endpoint
    const response = await fetch("http://127.0.0.1:5000/getflashcardsets", {
        method: "GET",
        headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
        },
    }); 
    const data = await response.json()
    return data
    } catch (error) {
        console.log("Failed to fetch flashcards", error)
    }
}
