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
                // Populate all maps
                const allMapList = document.getElementById('all-map-list');
                data.forEach(map => {
                    const li = document.createElement('li');
                    li.textContent = map.data.name;
                    allMapList.appendChild(li);
                });

                // Populate new maps (assuming 'new' is a subset of 'all' for demonstration)
                const newMapList = document.getElementById('new-map-list');
                data.slice(0, 3).forEach(newMap => { // Example: first 3 items as new maps
                    const li = document.createElement('li');
                    li.textContent = newMap.data.name;
                    newMapList.appendChild(li);
                });

                // Populate popular maps (assuming 'popular' is a subset of 'all' for demonstration)
                const popularMapList = document.getElementById('popular-map-list');
                data.slice(3, 6).forEach(popularMap => { // Example: next 3 items as popular maps
                    const li = document.createElement('li');
                    li.textContent = popularMap.data.name;
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