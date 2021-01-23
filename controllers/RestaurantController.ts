import {Request, Response} from 'express';
import { Restaurant } from '../models/Restaurant';
import fs from 'fs';


export let getRestaurantsByLatAndLng = (req: Request, res: Response) => {
  const lat: string = req.params.lat;
  const lng: string = req.params.lng;
  const data = fs.readFileSync('./data/restaurants.json', 'utf-8');
  const restaurants = JSON.parse(data).restaurants;
  let popularRestaurants = [];
  popularRestaurants = restaurants.sort(function(a: Restaurant, b: Restaurant){
    b.popularity - a.popularity;
  });
  res.json(popularRestaurants);
}