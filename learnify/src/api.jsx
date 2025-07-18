// Houses API calls

// Frontend sends request to get flashcard data - returns as JS object
export async function fetchFlashcards() {
    try {
        const token = localStorage.getItem("token")
        // Fetch data from backend API Endpoint
        const response = await fetch("https://learnify-backend-vgj2.onrender.com/getflashcardsets", {
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
