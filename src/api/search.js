const BASE_URL = 'http://localhost:3000/search';

// Fecth Seach results
export const fetchSearchResults = async (searchTerm) => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${BASE_URL}?q=${encodeURIComponent(searchTerm)}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `${token}`
        }
    })

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
    }

    const results = await response.json();
    console.log('Search results:', results);
    return results;
};