# OpenWeather Web Application

This is a basic OpenWeather Web Application that allows you to retrieve local weather forecast from a zip code. It's written with following technologies: Node.JS, Express, React, Redux-Toolkit, Jest, and Testing-library.

## Getting Started (Docker)

Update the OpenWeather API Key in the docker compose `docker-compose.yml` file:

```OPENWEATHER_API_KEY: XXXXXXXXX```

Open the folder and run docker containers:

```$ docker compose up```

Now you can open the frontend app [`localhost:3000`](http://localhost:3000) from your browser.

The backend api is served at [`localhost:8000`](http://localhost:8000)

## Install Backend

Open the backend folder and run the following command to install:

```$ yarn```

Place your OpenWeather API Key in environment `/backend/.env` file:

```OPENWEATHER_API_KEY=XXXXXXXX```

Open the backend folder and run the following command to install:

```$ yarn start```

Now you can open the backend app [`localhost:8000`](http://localhost:8000) from your browser.

To run tests with coverage, run the following command:

```$ yarn test```

## Install Frontend

Open the frontend folder and run the following command to install:

```$ yarn```

Open the frontend folder and run the following command to install:

```$ yarn start```

Now you can open the frontend app [`localhost:3000`](http://localhost:3000) from your browser.

To run tests with coverage, run the following command:

```$ yarn test --coverage```
