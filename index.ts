import express from 'express';
import fs from 'fs';
import { Restaurant } from './models/Restaurant';
import {Request, Response} from 'express';

const data = fs.readFileSync('./data/restaurants.json', 'utf-8');
const app = express();

function getPopularRestaurants() {
  const restaurants = getNearbyRestaurants(60.1709, 24.941);
  restaurants.sort(function(a: Restaurant, b: Restaurant){
    return b.popularity - a.popularity;
  });
  return restaurants
}

function getNewRestaurants() {
  const restaurants = getNearbyRestaurants(60.1709, 24.941);
  restaurants.sort(function(a: Restaurant, b: Restaurant){
    return new Date(b.launch_date).getTime() - new Date(a.launch_date).getTime();
  });
  return restaurants.slice(0, 10);
}

function getNearbyRestaurants(lat: number, lon: number) {
  const data = fs.readFileSync('./data/restaurants.json', 'utf-8');
  const restaurants = JSON.parse(data).restaurants;
  restaurants.sort(function(a: Restaurant, b: Restaurant){
    return (calculateDistance(b.location[1], b.location[0], lat, lon) - calculateDistance(a.location[1], a.location[0], lat, lon) 
            && calculateDistance(b.location[0], b.location[1], lat, lon) < 1500);
  });
  return restaurants.slice(0, 10);
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number){
  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 + 
    c(lat1 * p) * c(lat2 * p) * 
    (1 - c((lon2 - lon1) * p))/2;
  return 12742 * Math.asin(Math.sqrt(a));
}

app.get('/', (req: Request, res: Response) => {
  res.json({
    "sections": [
      {
        "title": "Popular Restaurants",
        "restaurants": getPopularRestaurants()
      },
      {
        "title": "New Restaurants",
        "restaurants": getNewRestaurants()
      },
      {
        "title": "Nearby Restaurants",
        "restaurants": getNearbyRestaurants(60.1709, 24.941)
      }
    ],
  });
})

app.listen(8000, () => {
  console.log(JSON.parse(data));
})