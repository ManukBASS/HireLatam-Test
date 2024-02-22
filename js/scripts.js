const prevCityBtn = document.getElementById('prev-city-btn');
const nextCityBtn = document.getElementById('next-city-btn');
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModal');

const cities = ['Mount Vernon', 'Birmingham', 'Houston', 'Miami', 'Springfield', 'Seattle', 'Concord', 'New Bedford', 'Minneapolis', 'Loveland'];

let currentCityIndex = 0;
let populationChart;

document.addEventListener('DOMContentLoaded', () => {
    // Calling displayCityData after the DOM is completely loaded
    displayCityData(cities[currentCityIndex]);

    prevCityBtn.addEventListener('click', () => {
        if (currentCityIndex > 0) {
            displayCityData(cities[currentCityIndex - 1]);
        }
    });

    nextCityBtn.addEventListener('click', () => {
        if (currentCityIndex < cities.length - 1) {
            displayCityData(cities[currentCityIndex + 1]);
        }
    });

    openModalBtn.addEventListener('click', async () => {
        // Al hacer clic, primero se obtienen los datos de población y luego se dibuja el gráfico
        const populationData = [];
        for (const city of cities) {
            const cityData = await fetchCityData(city);
            populationData.push({ label: city, value: cityData.population });
        }

        // Esperar a que todas las promesas se resuelvan antes de dibujar el gráfico
        drawPopulationChart(populationData);
        openModal();
    });

    closeModalBtn.addEventListener('click', closeModal);
});

// Llamamos a drawPopulationChart con un conjunto de datos vacío
drawPopulationChart([]);


async function fetchCityData(city) {
    // Fetching city data from an API
    const response = await fetch(`https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-cities-demographics&q=${city}&facet=city&refine.city=${city}`);

    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }

    const data = await response.json();

    if (data.records && data.records.length > 0 && data.records[0].fields) {
        // Saving data 
        const cityData = data.records[0].fields;
        return {
            name: cityData.city,
            state: cityData.state,
            stateCode: cityData.state_code,
            population: cityData.total_population,
            veterans: cityData.number_of_veterans,
            age: cityData.median_age,
        };
    } else {
        throw new Error(`No se encontraron datos para la ciudad: ${city}`);
    }
}

async function getCityImage(cityName) {
    const ACCESS_KEY = '7wGUEcr9xLl_mB1YIk7QqIB0kIyF_cdyIR0Nif-WMbw';
    const unsplashApiUrl = `https://api.unsplash.com/photos/random?query=${cityName}&client_id=${ACCESS_KEY}`;

    // Using the API Key and URL, the image is fetched
    try {
        const response = await fetch(unsplashApiUrl);
        const data = await response.json();

        if (data.urls && data.urls.regular) {
            const imageUrl = data.urls.regular;
            return imageUrl
        } else {
            console.error(`Couldn't get city image`);
            return null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}

async function displayCityData(cityName) {
    try {
        const cityData = await fetchCityData(cityName);
        const cityImage = await getCityImage(cityName);

        // Displaying selected data on the HTML
        document.getElementById('city-name').textContent = cityData.name;
        document.getElementById('city-state').textContent = cityData.state;
        document.getElementById('city-state-code').textContent = cityData.stateCode;
        document.getElementById('city-population').textContent = cityData.population;
        document.getElementById('city-veterans').textContent = cityData.veterans;
        document.getElementById('city-age').textContent = cityData.age;

        // Check if cityImage is not null before setting the src
        if (cityImage !== null) {
            document.getElementById('city-image').src = cityImage;
        }

        // Set current index
        currentCityIndex = cities.indexOf(cityName);
    } catch (error) {
        console.error(`Error fetching data for city ${cityName}:`, error);
    }
}

function openModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
}

displayCityData(currentCityIndex);

// Draw Population Chart
function drawPopulationChart(populationData) {
    const ctx = document.getElementById('populationChart').getContext('2d');
    // Destruye el gráfico existente antes de crear uno nuevo
    if (populationChart) {
        populationChart.destroy();
    }
    ctx.canvas.width = 300;
    ctx.canvas.height = 300;
    // Ajusta el tamaño del gráfico usando las opciones
    populationChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: populationData.map(city => city.label),
            datasets: [{
                data: populationData.map(city => city.value),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                    'rgba(255, 159, 64, 0.7)',
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                ],
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Population Comparison'
            },
            responsive: true,
        }
    });
}