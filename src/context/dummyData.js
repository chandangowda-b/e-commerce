// src/context/dummyData.js

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
      "/products/wheel1.png",
      "/products/wheel2.png"
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
    images: ["/products/headlight1.png"],
    rating: 4.4,
    reviews: []
  },
  {
    id: 3,
    title: "Sport Exhaust System",
    price: 399,
    brand: "Mercedes",
    category: "Exhaust",
    images: ["/products/exhaust1.png"],
    rating: 4.9,
    reviews: []
  }
];
