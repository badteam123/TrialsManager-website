// Function to fetch and display all maps
var maps;
async function fetchAndDisplayMaps(elementId) {
    const loadingScreen = document.getElementById('loading-screen');
    setTimeout(function(){
      loadingScreen.innerHTML = "Fetching maps...<br>(This could take a minute if the servers are warming up)";
    },3000);
    loadingScreen.classList.add('active'); // Show loading screen

    try {
        const response = await fetch("https://trialsmanager.wikinothow.workers.dev/");
        if (!response.ok) throw new Error("Network response was not ok");

        const textData = await response.text();
        console.log("Raw Response:", textData); // Log the raw response

        let jsonData;
        try {
            jsonData = JSON.parse(textData);
            maps = jsonData;
        } catch (error) {
            console.error("Error parsing JSON:", error);
            return;
        }

        // Assuming jsonData is an array of maps
        const mapList = document.getElementById(elementId);
        mapList.innerHTML = ""; // Clear previous content

        jsonData.forEach((map) => {
            const listItem = document.createElement("li");
            const link = document.createElement("a");
            link.href = `https://trialsmanager.wikinothow.workers.dev/maps/${map.mid}`; // Adjust based on your data structure
            let tempName;
            if (map.data.game === 0) {
                tempName = "Fusion";
            }
            if (map.data.game === 1) {
                tempName = "Evolution";
            }
            link.textContent = `Trials ${tempName} | ${map.data.name}`; // Adjust based on your data structure
            link.target = "_blank"; // Open link in a new tab
            listItem.appendChild(link);
            mapList.appendChild(listItem);
        });
    } catch (error) {
        console.error("Error fetching maps:", error);
    } finally {
        loadingScreen.classList.remove('active'); // Hide loading screen
    }
}

// Function to handle search
async function handleSearch() {
    const query = document.getElementById("search").value.toLowerCase();
    const filteredMaps = maps.filter((map) =>
        map.data.name.toLowerCase().includes(query)
    );
    console.log(filteredMaps);
    const mapList = document.getElementById("all-map-list");
    mapList.innerHTML = ""; // Clear previous content

    filteredMaps.forEach((map) => {
        const listItem = document.createElement("li");
        const link = document.createElement("a");
        link.href = `https://trialsmanager.wikinothow.workers.dev/maps/${map.mid}`; // Adjust based on your data structure
        let tempName;
        if (map.data.game === 0) {
            tempName = "Fusion";
        }
        if (map.data.game === 1) {
            tempName = "Evolution";
        }
        link.textContent = `Trials ${tempName} | ${map.data.name}`; // Adjust based on your data structure
        link.target = "_blank"; // Open link in a new tab
        listItem.appendChild(link);
        mapList.appendChild(listItem);
    });
}

// Event listeners for page load and search button click
document.addEventListener("DOMContentLoaded", () => {
    fetchAndDisplayMaps("all-map-list"); // Fetch and display all maps
  
  // Get the text box element
    const searchBox = document.getElementById("search");

    // Add an event listener for the input event
    searchBox.addEventListener("input", (event) => {
        handleSearch();
    });
});
