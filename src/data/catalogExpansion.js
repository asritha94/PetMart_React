const image = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=85`;

const categoryImages = {
  food: [
    image("photo-1589924691995-400dc9ecc119"), image("photo-1542838132-92c53300491e"),
    image("photo-1534531173927-aeb928d54385"), image("photo-1568640347023-a616a30bc3bd"),
    image("photo-1574158622682-e40e69881006"), image("photo-1601758228041-f3b2795255f1")
  ],
  accessories: [
    image("photo-1558929996-da64ba858215"), image("photo-1583337130417-3346a1be7dee"),
    image("photo-1548767797-d8c844163c4c"), image("photo-1587300003388-59208cc962cb"),
    image("photo-1517849845537-4d257902454a"), image("photo-1591946614720-90a587da4a36")
  ],
  grooming: [
    image("photo-1516734212186-a967f81ad0d7"), image("photo-1522335789203-aabd1fc54bc9"),
    image("photo-1556228578-8c89e6adf883"), image("photo-1556228720-195a672e8a2f"),
    image("photo-1585232351009-aa87416fca90"), image("photo-1608248543803-ba4f8c70ae0b")
  ],
  toys: [
    image("photo-1592194996308-7b43878e84a6"), image("photo-1548199973-03cce0bbc87b"),
    image("photo-1587300003388-59208cc962cb"), image("photo-1517849845537-4d257902454a"),
    image("photo-1560807707-8cc77767d783"), image("photo-1535930749574-1399327ce78f")
  ],
  healthcare: [
    image("photo-1584515933487-779824d29309"), image("photo-1559757175-0eb30cd8c063"),
    image("photo-1584308666744-24d5c474f2ae"), image("photo-1471864190281-a93a3070b6de"),
    image("photo-1603398938378-e54eab446dde"), image("photo-1580281658628-1a2f7f8e3b6a")
  ],
  aquarium: [
    image("photo-1493246507139-91e8fad9978e"), image("photo-1442876916995-676d1a7a40a6"),
    image("photo-1520990261265-0b7a4d6b7a4d"), image("photo-1544551763-46a013bb70d5"),
    image("photo-1535591273668-578e31182c4f"), image("photo-1524704654690-b56c05c78a00")
  ],
  furniture: [
    image("photo-1591946614720-90a587da4a36"), image("photo-1583337130417-3346a1be7dee"),
    image("photo-1548767797-d8c844163c4c"), image("photo-1517849845537-4d257902454a"),
    image("photo-1587300003388-59208cc962cb"), image("photo-1558788353-f76d92427f16")
  ]
};

const productGroups = [
  ["pet-food", "Dog Food", "PawHarvest", ["Premium Puppy Food", "Grain-Free Dog Food", "Chicken Dog Food", "Beef Dog Food", "Senior Dog Food", "Dry Dog Food", "Wet Dog Food", "Puppy Treats", "Dental Chews", "Active Adult Dog Food"], "food"],
  ["pet-food", "Cat Food", "WhiskerWell", ["Premium Cat Food", "Kitten Food", "Adult Cat Food", "Senior Cat Food", "Tuna Cat Food", "Chicken Cat Food", "Dry Cat Food", "Wet Cat Food", "Cat Treats"], "food"],
  ["pet-food", "Bird Food", "FeatherFeast", ["Parrot Food", "Budgie Food", "Cockatiel Food", "Lovebird Food", "Bird Seed Mix"], "food"],
  ["pet-food", "Fish Food", "AquaBite", ["Goldfish Food", "Betta Food", "Tropical Fish Food", "Fish Flakes", "Fish Pellets"], "food"],
  ["pet-food", "Small Pet Food", "LittlePaws", ["Rabbit Pellets", "Hamster Food", "Guinea Pig Food", "Timothy Hay"], "food"],
  ["accessories", "Collars & Leashes", "UrbanPaws", ["Dog Collar", "Cat Collar", "Leather Collar", "Adjustable Collar", "Reflective Collar", "Dog Leash", "Retractable Leash", "Training Leash", "Reflective Leash"], "accessories"],
  ["accessories", "Harnesses & Feeding", "HydraPet", ["Dog Harness", "Cat Harness", "Reflective Harness", "No-Pull Harness", "Stainless Steel Bowl", "Ceramic Bowl", "Automatic Feeder", "Water Dispenser", "Travel Water Bottle", "Slow Feeder"], "accessories"],
  ["accessories", "Beds & Travel", "PawComfort", ["Dog Bed", "Cat Bed", "Puppy Bed", "Donut Bed", "Pet Mat", "Cat Hammock", "Pet Carrier", "Cat Carrier", "Pet Backpack", "Travel Bag", "Car Safety Harness"], "accessories"],
  ["accessories", "Pet Clothing", "CozyTail", ["Dog Sweater", "Pet T-Shirt", "Dog Raincoat", "Puppy Jacket", "Pet Shoes"], "accessories"],
  ["grooming", "Grooming", "FurFresh", ["Complete Grooming Kit", "Dog Shampoo", "Cat Shampoo", "Pet Conditioner", "Grooming Brush", "Deshedding Tool", "Flea Comb", "Nail Clipper", "Electric Nail Grinder", "Pet Hair Dryer", "Pet Toothbrush", "Pet Toothpaste", "Dental Care Kit", "Ear Cleaning Kit", "Paw Cleaner"], "grooming"],
  ["toys", "Toys", "PawJoy", ["Tennis Ball", "Rubber Ball", "Rope Toy", "Chew Bone", "Frisbee", "Squeaky Toy", "Puzzle Toy", "Interactive Toy", "Cat Wand", "Feather Toy", "Cat Ball", "Laser Toy", "Cat Tunnel", "Scratching Post", "Cat Tree", "Interactive Cat Toy", "Bird Swing", "Bird Bell", "Hanging Toy", "Bird Ladder", "Bird Chewing Toy"], "toys"],
  ["healthcare", "Healthcare", "VetCare", ["Pet Vitamins", "Dog Supplements", "Cat Supplements", "Joint Support", "Dental Care", "Flea & Tick Care", "Pet First Aid Kit", "Ear Care", "Paw Care", "Skin Care", "Hygiene Products"], "healthcare"],
  ["aquarium", "Aquarium", "AquaLiving", ["Aquarium Tank", "Fish Bowl", "Aquarium Filter", "Air Pump", "Aquarium Light", "Aquarium Heater", "Water Conditioner", "Aquarium Gravel", "Aquarium Plants", "Fish Net", "Aquarium Food"], "aquarium"],
  ["pet-furniture", "Pet Furniture", "HomePaws", ["Dog House", "Pet Crate", "Puppy Playpen", "Cat Tree", "Cat Condo", "Scratching Tower", "Pet Sofa", "Pet Fence", "Window Perch", "Pet Steps"], "furniture"]
];

const petImages = {
  Dog: [
    image("photo-1552053831-71594a27632d"), image("photo-1583511655857-d19b40a7a54e"),
    image("photo-1537151625747-768eb6cf92b2"), image("photo-1543466835-00a7907e9de1"),
    image("photo-1589941013453-ec89f33b5e95"), image("photo-1605568427561-40dd23c2acea")
  ],
  Cat: [
    image("photo-1514888286974-6c03e2ca1dba"), image("photo-1518791841217-8f162f1e1131"),
    image("photo-1533738363-b7f9aef128ce"), image("photo-1513360309081-36f20ca48f2d")
  ],
  Bird: [
    image("photo-1444464666168-49d633b86797"), image("photo-1522869635100-9f4c5e86aa37"),
    image("photo-1555169062-013468b47731")
  ],
  "Small Pets": [
    image("photo-1585110396000-c9ffd4e4b308"), image("photo-1535241749838-299277b6305f"),
    image("photo-1425082661705-1834bfd09dca")
  ],
  Fish: [
    image("photo-1520990261265-0b7a4d6b7a4d"), image("photo-1493246507139-91e8fad9978e"),
    image("photo-1442876916995-676d1a7a40a6")
  ]
};

const petGroups = [
  ["Dog", ["Golden Retriever", "Labrador Retriever", "German Shepherd", "Pomeranian", "Beagle", "Pug", "Siberian Husky", "Shih Tzu", "Dachshund", "Rottweiler", "French Bulldog", "Cocker Spaniel"]],
  ["Cat", ["Persian Cat", "Siamese Cat", "British Shorthair", "Maine Coon", "Bengal Cat", "Ragdoll", "Scottish Fold", "American Shorthair"]],
  ["Bird", ["Parrot", "Cockatiel", "Lovebird", "Budgerigar", "Canary", "Finch"]],
  ["Small Pets", ["Rabbit", "Hamster", "Guinea Pig", "Turtle"]],
  ["Fish", ["Goldfish", "Betta Fish", "Guppy", "Angelfish", "Molly Fish"]]
];

export const expandedPets = petGroups.flatMap(([species, breeds], groupIndex) =>
  breeds.map((breed, index) => {
    let price = 8000 + groupIndex * 5000 + index * 1200;
    if (species === "Fish") price = 850 + index * 250;
    if (species === "Bird") price = 2200 + index * 500;
    return {
    id: `pet-catalog-${groupIndex + 1}-${index + 1}`,
    name: `${breed.split(" ")[0]} ${index + 1}`,
    species,
    breed,
    age: `${1 + (index % 3)} year${index % 3 === 0 ? "" : "s"}`,
    ageGroup: index % 3 === 0 ? "Young" : "Adult",
    gender: index % 2 === 0 ? "Male" : "Female",
    color: "Healthy natural coat",
    location: ["Hyderabad", "Bangalore", "Mumbai", "Pune"][index % 4],
    price,
    image: petImages[species][index % petImages[species].length],
    gallery: [petImages[species][index % petImages[species].length]],
    description: `Healthy ${breed} companion, responsibly raised and ready for a caring forever home.`,
    vaccination: species === "Fish" ? "Aquatic health checked" : "Health checked and vaccination records available",
    availability: "Available",
    healthInfo: "Vet checked with active health record.",
    temperament: "Friendly, social, and well cared for.",
    featured: index < 2
    };
  })
);

export const expandedProducts = productGroups.flatMap(([primaryCategory, category, brand, names, imageGroup], groupIndex) =>
  names.map((name, index) => {
    const imageUrl = categoryImages[imageGroup][(groupIndex + index) % categoryImages[imageGroup].length];
    const price = 299 + ((groupIndex * 173 + index * 137) % 2600);
    return {
      id: `catalog-${groupIndex + 1}-${index + 1}`,
      name,
      category,
      primaryCategory,
      brand,
      price,
      oldPrice: price + Math.round(price * 0.2),
      discount: 20,
      rating: Number((4.2 + ((index % 8) / 10)).toFixed(1)),
      reviews: 18 + (groupIndex * 11) + index,
      image: imageUrl,
      gallery: [imageUrl],
      stock: 12 + ((groupIndex + index) % 34),
      description: `${name} selected for everyday pet care, with dependable quality and practical design for caring pet parents.`,
      specifications: { Brand: brand, Category: category, Collection: primaryCategory },
      featured: index < 2
    };
  })
);
