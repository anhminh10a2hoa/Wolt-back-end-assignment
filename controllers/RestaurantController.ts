import {Request, Response} from 'express';
import Restaurant from "../models/Restaurant";

export let getRestaurantsByLatAndLng = (req: Request, res: Response) => {
  const lat:number = +req.query.lat!;
  const lon:number = +req.query.lon!;
  res.json({
    "sections": [
      {
        "title": "Popular Restaurants",
        "restaurants": Restaurant.getPopularRestaurants(lat, lon)
      },
      {
        "title": "New Restaurants",
        "restaurants": Restaurant.getNewRestaurants(lat, lon)
      },
      {
        "title": "Nearby Restaurants",
        "restaurants": Restaurant.getNearbyRestaurants(lat, lon)
      }
    ],
  });
}