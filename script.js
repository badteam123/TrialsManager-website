document.addEventListener('DOMContentLoaded', function() {
    // Function to fetch maps data from the server
    function fetchMapsData() {
        fetch('https://trialsmanager-server.onrender.com/maps')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok: ' + response.status);
                }
                return response.json(); // Parse response as JSON
            })
            .then(data => {
                // Assuming data is an array with one object
                const mapsData = data[0].data;

                // Populate all maps
                const allMapList = document.getElementById('all-map-list');
                const allMaps = JSON.parse(atob(mapsData.trk));
                allMaps.forEach(map => {
                    const li = document.createElement('li');
                    li.textContent = map.name;
                    allMapList.appendChild(li);
                });

                // Example: Populate new maps (subset of all maps)
                const newMapList = document.getElementById('new-map-list');
                const newMaps = JSON.parse(atob(mapsData.meta));
                newMaps.forEach(newMap => {
                    const li = document.createElement('li');
                    li.textContent = newMap.name;
                    newMapList.appendChild(li);
                });

                // Example: Populate popular maps (another subset of all maps)
                const popularMapList = document.getElementById('popular-map-list');
                // Adjust this based on your actual data structure
                // For example, popular maps could be a different subset
                const popularMaps = JSON.parse(atob(mapsData.trk));
                popularMaps.slice(0, 3).forEach(popularMap => {
                    const li = document.createElement('li');
                    li.textContent = popularMap.name;
                    popularMapList.appendChild(li);
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    // Initial fetch when the page loads
    fetchMapsData();

    // Function to handle search button click (you can implement search functionality here)
    function searchMaps() {
        const query = document.getElementById('search').value;
        alert('Search for: ' + query);
        // Implement search logic here
    }

    // Event listener for search button click
    document.getElementById('search-button').addEventListener('click', searchMaps);
});