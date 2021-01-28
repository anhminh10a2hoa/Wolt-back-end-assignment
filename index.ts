import express from 'express';
import fs from 'fs';
import { getRestaurantsByLatAndLng } from './controllers/RestaurantController';

const PORT = 8000;

const data = fs.readFileSync('./data/restaurants.json', 'utf-8');
const app = express();

app.get('/discovery', getRestaurantsByLatAndLng)

app.listen(PORT, () => {
  console.log('Port: ' + PORT);
})