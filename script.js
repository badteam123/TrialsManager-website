// Function to fetch and display all maps
var maps;
async function fetchAndDisplayMaps(elementId) {
    try {
        const response = await fetch('https://trialsmanager-server.onrender.com/maps');
        if (!response.ok) throw new Error('Network response was not ok');

        const textData = await response.text();
        console.log('Raw Response:', textData); // Log the raw response

        let jsonData;
        try {
            jsonData = JSON.parse(textData);
            maps = jsonData;
        } catch (error) {
            console.error('Error parsing JSON:', error);
            return;
        }

        // Assuming jsonData is an array of maps
        const mapList = document.getElementById(elementId);
        mapList.innerHTML = ''; // Clear previous content

        jsonData.forEach(map => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = `https://trialsmanager-server.onrender.com/maps/${map.mid}`; // Adjust based on your data structure
            link.textContent = map.data.name; // Adjust based on your data structure
            link.target = '_blank'; // Open link in a new tab
            listItem.appendChild(link);
            mapList.appendChild(listItem);
        });
    } catch (error) {
        console.error('Error fetching maps:', error);
    }
}

// Function to handle search
async function handleSearch() {
    const query = document.getElementById('search').value.toLowerCase();
    const filteredMaps = maps.filter(map => map.data.name.toLowerCase().includes(query));
    console.log(filteredMaps);
    const mapList = document.getElementById('all-map-list');
    mapList.innerHTML = ''; // Clear previous content

    filteredMaps.forEach(map => {
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = `https://trialsmanager-server.onrender.com/maps/${map.data._id}`; // Adjust based on your data structure
        link.textContent = map.data.name; // Adjust based on your data structure
        link.target = '_blank'; // Open link in a new tab
        listItem.appendChild(link);
        mapList.appendChild(listItem);
    });
}

// Event listeners for page load and search button click
document.addEventListener('DOMContentLoaded', () => {
    fetchAndDisplayMaps('all-map-list'); // Fetch and display all maps

    document.getElementById('search-button').addEventListener('click', handleSearch);
});
