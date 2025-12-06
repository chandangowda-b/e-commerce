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
  ,
  {
    id: 101,
    title: "Alloy Wheel — 18in",
    price: 219,
    brand: "Toyota",
    category: "Wheels",
    images: ["/products/alloy_wheel_18.png"],
    rating: 4.5,
    reviews: [
      { user: "Priya", comment: "Solid build and looks great.", rating: 5 }
    ]
  },
  {
    id: 102,
    title: "Neoprene Seat Cover (Front)",
    price: 59,
    brand: "Ford",
    category: "Interior",
    images: ["/products/seat_cover.png"],
    rating: 4.2,
    reviews: [
      { user: "Ankit", comment: "Comfortable and easy to fit.", rating: 4 }
    ]
  },
  {
    id: 103,
    title: "LED Headlight Pro",
    price: 279,
    brand: "Audi",
    category: "Lights",
    images: ["/products/led_headlight_pro.png"],
    rating: 4.6,
    reviews: [
      { user: "Sara", comment: "Bright and efficient.", rating: 5 }
    ]
  },
  {
    id: 104,
    title: "High Capacity Car Battery",
    price: 149,
    brand: "BMW",
    category: "Interior",
    images: ["/products/car_battery.png"],
    rating: 4.3,
    reviews: [
      { user: "Vikram", comment: "Good backup and starts every time.", rating: 4 }
    ]
  },
  {
    id: 105,
    title: "Ceramic Brake Pads (Set)",
    price: 129,
    brand: "Mercedes",
    category: "Brakes",
    images: ["/products/ceramic_brake_pads.png"],
    rating: 4.8,
    reviews: [
      { user: "Lina", comment: "Excellent stopping power.", rating: 5 }
    ]
  },
  {
    id: 106,
    title: "Adjustable Suspension Kit",
    price: 799,
    brand: "Toyota",
    category: "Suspension",
    images: ["/products/suspension_kit.png"],
    rating: 4.4,
    reviews: [
      { user: "Rahul", comment: "Improved handling significantly.", rating: 4 }
    ]
  },
  {
    id: 107,
    title: "High-Flow Air Filter",
    price: 39,
    brand: "Ford",
    category: "Exhaust",
    images: ["/products/highflow_air_filter.png"],
    rating: 4.1,
    reviews: []
  },
  {
    id: 108,
    title: "Ignition Coil Pack",
    price: 89,
    brand: "BMW",
    category: "Interior",
    images: ["/products/ignition_coil.png"],
    rating: 4.0,
    reviews: [
      { user: "Maya", comment: "Replaced old coils, smooth idle now.", rating: 4 }
    ]
  }
];
