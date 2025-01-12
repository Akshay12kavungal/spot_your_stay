const BASE_URL = process.env.REACT_APP_BASE_URL;


export const fetchVillas = async () => {
    try {
        const response = await fetch(`${BASE_URL}/properties`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching villas:', error);
        return [];
    }
};