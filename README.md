# Search users from randomuser.me

#### Uses 
  - [React Bootstrap](https://react-bootstrap.github.io/) CSS Framework
  - [RTK Query](https://redux-toolkit.js.org/) for fetching data from randomuser.me
  - [React ChartJS](https://react-chartjs-2.js.org/), a ReactJS wrapper for [ChartJS](https://www.chartjs.org/)
  - [React Toastify](https://fkhadra.github.io/react-toastify/introduction) to display toast notifications

## This setup uses docker

Run `docker-compose up` while being in root directory to run this application under nodejs v16 container

## OR
Run `npm run start` in `react-app` directory to start application in standalone mode if you have nodejs installed locally

## To generate production build
### Run `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
App will be ready to be deployed!
