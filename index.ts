import express from 'express';
import { getRestaurantsByLatAndLng } from './controllers/RestaurantController';

const PORT = 8000;
const app = express();

app.get('/discovery', getRestaurantsByLatAndLng)

app.listen(PORT, () => {
  console.log('Port: ' + PORT);
})