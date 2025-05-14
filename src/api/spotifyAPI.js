export const spotifyAPI = async (url, method, body, token) => {
    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: body ?? null // Ensure body is included properly
    });

    if (!response.ok) {
        console.error("Spotify API error:", response);
        throw new Error(`Spotify API error: ${response.statusText}`);
    }

    const text = await response.text();
    if (!text) {
        console.log("No content in response");
        return null; // Handle cases with no content
    }

    try {
        return JSON.parse(text);
    } catch (error) {
        console.error("Failed to parse JSON response:", text);
        throw new Error("Invalid JSON response");
    }
};