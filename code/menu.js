// Toggle list visibility
const mybtn = document.getElementById('myList');
const tre = document.getElementById('btn');
tre.addEventListener("click", openmenu);

function openmenu() {
    if (mybtn.style.display !== 'block') {
        mybtn.style.display = 'block';
    } else {
        mybtn.style.display = 'none';
    }
    console.log('clicked');
}

// Initialize the map
const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
var map = L.map('map1').setView([37.8, -96], 4); // Center of the USA
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution
}).addTo(map);

// Fetch all brewery data from the API
const api_url = 'https://api.openbrewerydb.org/v1/breweries';

async function show_all_breweries() {
    let response = await fetch(api_url);
    let data = await response.json();
    console.log(data);

    data.forEach(brewery => {
        let lat = brewery.latitude;
        let lon = brewery.longitude;

        if (lat && lon) {
            // Add marker to the map
            let marker = L.marker([lat, lon]).addTo(map);
            marker.bindPopup(`
                <b>${brewery.name}</b><br>
                ${brewery.street}, ${brewery.city}, ${brewery.state}<br>
                <a href="${brewery.website_url}" target="_blank">Website</a>
            `);

            marker.on('click', function() {
                showBreweryInfo(brewery);
            });
        }
    });
}

function showBreweryInfo(brewery) {
    let details = `
        <strong>Name:</strong> ${brewery.name}<br>
        <strong>Type:</strong> ${brewery.brewery_type}<br>
        <strong>Address:</strong> ${brewery.street}, ${brewery.city}, ${brewery.state}, ${brewery.postal_code}<br>
        <strong>Country:</strong> ${brewery.country}<br>
        <strong>Phone:</strong> ${brewery.phone}<br>
        <strong>Website:</strong> <a href="${brewery.website_url}" target="_blank">${brewery.website_url}</a>
    `;
    document.getElementById('brewery-details').innerHTML = details;
}     

// Call the function to fetch and display all breweries
show_all_breweries();
