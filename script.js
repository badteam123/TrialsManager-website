document.addEventListener('DOMContentLoaded', function() {
    // Function to fetch maps data from the server using Fetch
    function fetchMapsData() {
        fetch('https://trialsmanager-server.onrender.com/maps')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then(data => {
                // Process data and populate lists
                populateMaps(data);
            })
            .catch(error => {
                console.error('Fetch error:', error);
            });
    }

    // Function to populate map lists
    function populateMaps(data) {
        if (data.length > 0) {
            const mapsData = data[0].data;

            // Populate all maps
            const allMapList = document.getElementById('all-map-list');
            const allMaps = JSON.parse(atob(mapsData.trk)); // Base64 decode and parse JSON
            allMaps.forEach(map => {
                const li = document.createElement('li');
                li.textContent = `Name: ${map.name}, Type: ${map.type}, ID: ${map.id}`;
                allMapList.appendChild(li);
            });

            // Populate new maps (Example: Use a subset or specific condition)
            const newMapList = document.getElementById('new-map-list');
            const newMaps = JSON.parse(atob(mapsData.meta)); // Base64 decode and parse JSON
            newMaps.forEach(newMap => {
                const li = document.createElement('li');
                li.textContent = `Name: ${newMap.name}, Type: ${newMap.type}, ID: ${newMap.id}`;
                newMapList.appendChild(li);
            });

            // Populate popular maps (Example: first 3 of all maps)
            const popularMapList = document.getElementById('popular-map-list');
            const popularMaps = allMaps.slice(0, 3); // Adjust based on your criteria
            popularMaps.forEach(popularMap => {
                const li = document.createElement('li');
                li.textContent = `Name: ${popularMap.name}, Type: ${popularMap.type}, ID: ${popularMap.id}`;
                popularMapList.appendChild(li);
            });
        } else {
            console.error('Empty data received');
        }
    }

    // Initial fetch when the page loads
    fetchMapsData();

    // Function to handle search button click
    function searchMaps() {
        const query = document.getElementById('search').value;
        alert('Search for: ' + query);
        // Implement search logic here
    }

    // Event listener for search button click
    document.getElementById('search-button').addEventListener('click', searchMaps);
});
