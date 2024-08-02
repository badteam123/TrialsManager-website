document.addEventListener('DOMContentLoaded', function() {
    // Function to fetch maps data from the server using XHR
    function fetchMapsData() {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://trialsmanager-server.onrender.com/maps', true);
        xhr.onload = function() {
            if (xhr.status >= 200 && xhr.status < 300) {
                const data = JSON.parse(xhr.responseText);
                // Process data and populate lists
                populateMaps(data);
            } else {
                console.error('Request failed with status:', xhr.status);
            }
        };
        xhr.onerror = function() {
            console.error('XHR request failed');
        };
        xhr.send();
    }

    // Function to populate map lists
    function populateMaps(data) {
        if (data.length > 0) {
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
        } else {
            console.error('Empty data received');
        }
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


// DISCLAIMER
// THIS CODE IS COMPLETE DOO DOO SINCE IM NOT USING FETCH
// FETCH REQUIRES CORS TO BE UPDATED ON THE SERVER AND IM NOT DOING THAT FOR NOW, SO XHR WILL HAVE TO BE USED