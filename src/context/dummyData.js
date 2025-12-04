// src/context/dummyData.js
import { productImages } from "../assets/assets";

export const categories = [
  "Wheels", 
  "Suspension", 
  "Brakes", 
  "Exhaust", 
  "Interior", 
  "Lights"
];

export const carBrands = [
  "BMW", 
  "Audi", 
  "Mercedes", 
  "Toyota", 
  "Ford",
  "Tesla"
];

export const products = [
  {
    id: 1,
    title: "Performance Alloy Wheel",
    price: 199,
    brand: "BMW",
    category: "Wheels",
    images: [
      productImages.wheel,
    ],
    rating: 4.7,
    reviews: [
      { user: "John", comment: "Excellent quality!", rating: 5 },
      { user: "Rohit", comment: "Value for money.", rating: 4 }
    ]
  },
  {
    id: 2,
    title: "LED Headlight",
    price: 249,
    brand: "Audi",
    category: "Lights",
    images: [productImages.headlight],
    rating: 4.4,
    reviews: []
  },
  {
    id: 3,
    title: "Sport Exhaust System",
    price: 399,
    brand: "Mercedes",
    category: "Exhaust",
    images: [productImages.ses],
    rating: 4.9,
    reviews: []
  },
  {
    id: 4,
    title: "Performance Alloy Wheel",
    price: 199,
    brand: "BMW",
    category: "Wheels",
    images: [
      productImages.wheel
    ],
    rating: 4.7,
    reviews: [
      { user: "John", comment: "Excellent quality!", rating: 5 },
      { user: "Rohit", comment: "Value for money.", rating: 4 }
    ]
  },
  {
    id: 5,
    title: "Steering Wheel Cover",
    price: 249,
    brand: "Audi",
    category: "Lights",
    images: [productImages.steeringWheel],
    rating: 4.4,
    reviews: []
  },
  {
    id: 6,
    title: "Sport Exhaust System",
    price: 399,
    brand: "Mercedes",
    category: "Exhaust",
    images: [productImages.ses],
    rating: 4.9,
    reviews: []
  }
];
