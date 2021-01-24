import express from 'express';
import fs from 'fs';
import { getRestaurantsByLatAndLng } from './controllers/RestaurantController';

const data = fs.readFileSync('./data/restaurants.json', 'utf-8');
const app = express();

app.get('/discovery', getRestaurantsByLatAndLng)

app.listen(8000, () => {
  console.log('Port: 8000');
})