# Hire Latam: City Data Summarization 🌇

This web project allows users to explore and compare demographic data for various cities in the United States. It utilizes the OpenDataSoft API to retrieve information on population, veterans, and median age, and uses the Unsplash API to fetch images that match the corresponding city.
This project uses Chart.Js to create a doughnut shaped chart that compares the population of all the cities.

## Features

- **City Data Visualization:** Displays detailed information about the population, number of veterans, and median age of the currently selected city.

- **Image Display:** This project fetches images that match each individual city. It changes every time, so feel free to explore multiple images !

- **Population Comparison:** Enables users to compare the population of all cities using a doughnut chart.

- **Add New City:** Adds a new city to the list and updates the visualization.

## How to Use

1. Clone this repository:

    ```bash
    git clone https://your-repository.git
    cd your-repository
    ```

2. Open `index.html` in your web browser.

3. Interact with the application using the "Previous City," "Next City," and "Population Comparison" buttons.

## Project Structure

- **`index.html`:** Contains the HTML structure of the application.

- **`styles/styles.css`:** CSS styles for formatting the user interface.

- **`styles/modalStyles.css`:** Specific styles for the population comparison modal.

- **`js/scripts.js`:** Main logic of the application, including functions for adding cities, error and event handling, fetching demographic data and chart creation.

- **`README.md`:** This file, providing information about the project.

## Credits

This project uses the OpenDataSoft API to retrieve demographic data for cities, the Unsplash API for image fetching and Chart.Js to create comparision charts.

