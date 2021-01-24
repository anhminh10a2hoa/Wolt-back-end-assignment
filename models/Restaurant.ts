import fs from 'fs';

export default class Restaurant {
  constructor(
    public blurhash: string,
    public launch_date: Date,
    public location: number[],
    public name: string,
    public online: boolean,
    public popularity: number
  ){}

  static getPopularRestaurants(lat: number, lon: number): Restaurant[] {
    const restaurants = Restaurant.getNearbyRestaurants(lat, lon);
    restaurants.sort(function(a: Restaurant, b: Restaurant){
      return b.popularity - a.popularity;
    });
    return restaurants
  }

  static getNewRestaurants(lat: number, lon: number): Restaurant[] {
    const restaurants = Restaurant.getNearbyRestaurants(lat, lon);
    restaurants.sort(function(a: Restaurant, b: Restaurant){
      return new Date(b.launch_date).getTime() - new Date(a.launch_date).getTime();
    });
    return restaurants;
  }

  static getNearbyRestaurants(lat: number, lon: number): Restaurant[] {
    const data = fs.readFileSync('./data/restaurants.json', 'utf-8');
    const restaurants = JSON.parse(data).restaurants;
    restaurants.sort((a: Restaurant, b: Restaurant) => {
      return (Restaurant.calculateDistance(a.location[1], a.location[0], lat, lon) 
        - Restaurant.calculateDistance(b.location[1], b.location[0], lat, lon));
    });
    const restaurantsAfter = restaurants.filter(
      (res: Restaurant) => 
      Restaurant.calculateDistance(res.location[1], res.location[0], lat, lon) < 1.5
    );
    return restaurantsAfter.splice(0, 10);
  }
  
  static calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number){
    var p = 0.017453292519943295;    // Math.PI / 180
    var c = Math.cos;
    var a = 0.5 - c((lat2 - lat1) * p)/2 + 
      c(lat1 * p) * c(lat2 * p) * 
      (1 - c((lon2 - lon1) * p))/2;
    return 12742 * Math.asin(Math.sqrt(a));
  }
}