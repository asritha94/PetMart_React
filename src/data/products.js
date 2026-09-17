const product = (id, name, category, subcategory, image, price, oldPrice, brand, rating, reviews, stock) => ({
  id,
  name,
  category,
  primaryCategory: category.toLowerCase().replaceAll(" ", "-"),
  subcategory,
  brand,
  image,
  gallery: [image],
  additionalImages: [image],
  description: `${name} is a carefully selected ${category.toLowerCase()} essential from PetMart.`,
  price,
  oldPrice,
  originalPrice: oldPrice,
  discount: Math.round(((oldPrice - price) / oldPrice) * 100),
  rating,
  reviews,
  stock,
  isFeatured: rating >= 4.8
});

const image = (url, variant) => `${url}?auto=format&fit=crop&w=900&q=85&v=${variant}`;

export const products = [
  product("dogs-1", "Labrador Retriever", "Dogs", "Family Dogs", image("https://images.unsplash.com/photo-1583511655857-d19b40a7a54e", "dogs-1"), 22999, 29999, "HappyPaws", 4.7, 126, 6),
  product("dogs-2", "German Shepherd", "Dogs", "Working Dogs", image("https://images.unsplash.com/photo-1589941013453-ec89f33b5e95", "dogs-2"), 26999, 34999, "UrbanPaws", 4.9, 144, 4),
  product("dogs-3", "Beagle", "Dogs", "Family Dogs", image("https://images.unsplash.com/photo-1537151625747-768eb6cf92b2", "dogs-3"), 16999, 21999, "PawJoy", 4.7, 112, 7),
  product("dogs-4", "Shih Tzu", "Dogs", "Small Dogs", image("https://images.unsplash.com/photo-1543466835-00a7907e9de1", "dogs-4"), 14999, 19999, "PawNest", 4.6, 101, 8),

  product("cats-1", "British Shorthair", "Cats", "Indoor Cats", image("https://images.unsplash.com/photo-1518791841217-8f162f1e1131", "cats-1"), 17999, 22999, "KittyNest", 4.7, 122, 6),
  product("cats-2", "Siamese Cat", "Cats", "Indoor Cats", image("https://images.unsplash.com/photo-1533738363-b7f9aef128ce", "cats-2"), 20999, 26999, "WhiskerWorld", 4.9, 127, 5),
  product("cats-3", "Maine Coon", "Cats", "Long Hair Cats", image("https://images.unsplash.com/photo-1519052537078-e6302a4968d4", "cats-3"), 24999, 31999, "FelineHouse", 4.8, 104, 4),
  product("cats-4", "Ragdoll Cat", "Cats", "Indoor Cats", image("https://images.unsplash.com/photo-1513245543132-31f507417b26", "cats-4"), 22999, 28999, "PurrfectHome", 4.7, 98, 5),

  product("birds-1", "Blue Lovebird", "Birds", "Lovebirds", image("https://images.unsplash.com/photo-1444464666168-49d633b86797", "birds-1"), 2500, 3500, "AvianJoy", 4.7, 84, 10),
  product("birds-2", "Cockatiel Pair", "Birds", "Cockatiels", image("https://images.unsplash.com/photo-1555169062-013468b47731", "birds-2"), 6900, 8900, "FeatherFriend", 4.6, 75, 12),
  product("birds-3", "Green Budgie", "Birds", "Budgies", image("https://images.unsplash.com/photo-1452570053594-1b985d6ea890", "birds-3"), 1800, 2400, "NestJoy", 4.5, 63, 15),
  product("birds-4", "Sun Conure Parrot", "Birds", "Parrots", image("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQy7E-GQwX1lsPkeEOAE7fVnCY4_h6rQjeTD0ILWD_9-lC-03sYQan7rwc&s=10", "birds-4"), 9900, 13900, "ParrotHaven", 4.8, 84, 6),

  product("fish-1", "Goldfish", "Fish", "Goldfish", image("https://a-z-animals.com/media/2026/06/shutterstock-1766159030-huge-licensed-scaled-1024x576.jpg", "fish-1"), 2400, 3400, "BlueWave", 4.5, 52, 22),
  product("fish-2", "Betta Fish", "Fish", "Betta", image("https://images.unsplash.com/photo-1524704654690-b56c05c78a00", "fish-2"), 2900, 3900, "AquaEden", 4.6, 58, 19),
  product("fish-3", "Guppy Collection", "Fish", "Guppies", image("https://images.unsplash.com/photo-1535591273668-578e31182c4f", "fish-3"), 1800, 2500, "FinFriends", 4.5, 44, 20),
  product("fish-4", "Angelfish", "Fish", "Tropical Fish", image("https://pet-health-content-media.chewy.com/wp-content/uploads/2025/04/16191118/202503bec-Pterophyllum-scalare-angelfish-1024x576.jpg", "fish-4"), 3200, 4200, "TropicalTank", 4.7, 61, 14),

  product("rabbits-1", "Holland Lop", "Rabbits", "Lop Rabbits", image("https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308", "rabbits-1"), 5700, 7800, "HoppyHome", 4.7, 69, 14),
  product("rabbits-2", "Mini Rex Rabbit", "Rabbits", "Rex Rabbits", image("https://images.unsplash.com/photo-1535241749838-299277b6305f", "rabbits-2"), 6200, 8200, "BunnyBite", 4.6, 58, 10),
  product("rabbits-3", "Lionhead Rabbit", "Rabbits", "Lionhead Rabbits", image("https://images.unsplash.com/photo-1518796745738-41048802f99a", "rabbits-3"), 6500, 8500, "MeadowPaws", 4.7, 51, 8),
  product("rabbits-4", "Netherland Dwarf", "Rabbits", "Dwarf Rabbits", image("https://images.unsplash.com/photo-1591382386627-349b692688ff", "rabbits-4"), 5900, 7900, "HoppyHome", 4.6, 47, 9),

  product("small-pets-1", "Syrian Hamster", "Small Pets", "Hamsters", image("https://images.unsplash.com/photo-1425082661705-1834bfd09dca", "small-pets-1"), 1600, 2200, "TinyNibble", 4.6, 125, 18),
  product("small-pets-2", "Guinea Pig", "Small Pets", "Guinea Pigs", image("https://gawa.org.uk/wp-content/uploads/2024/07/Guinea-pig-image.jpg", "small-pets-2"), 2400, 3200, "PocketPals", 4.7, 88, 12),
  product("small-pets-3", "Fancy Mouse", "Small Pets", "Mice", image("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRE3x-NLZXIbLZhSWd6vkCXvraF4DHQUmse5Bz5t_9NpeOflogWnxESzS4&s=10", "small-pets-3"), 900, 1300, "TinyHome", 4.5, 54, 20),
  product("small-pets-4", "Chinchilla", "Small Pets", "Chinchillas", image("https://static.wixstatic.com/media/ba8560_9519da6fe1eb477ea402a667e8e3468c~mv2.jpg/v1/fill/w_1480,h_1110,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/ba8560_9519da6fe1eb477ea402a667e8e3468c~mv2.jpg", "small-pets-4"), 8500, 10900, "FurFriends", 4.8, 42, 5),

  product("pet-food-1", "Premium Puppy Food", "Pet Food", "Dog Food", image("https://www.caninecraving.com/cdn/shop/articles/Puppy_Starter_Food__What_You_Need_to_Know_Healthy.png?v=1773313569", "pet-food-1"), 1499, 1899, "Royal Canin", 4.8, 540, 24),
  product("pet-food-2", "Adult Cat Food", "Pet Food", "Cat Food", image("https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVAVIvoF7WqXx14HndibcbXiRXE5gcXwLLL7Pz0tWzP19wM1j28TOMfQs&s=10", "pet-food-2"), 1099, 1399, "Me-O", 4.7, 344, 27),
  product("pet-food-3", "Premium Bird Seed Mix", "Pet Food", "Bird Food", image("https://rukmini1.flixcart.com/image/1500/1500/xif0q/pet-food/c/m/e/1-bird-1-big-multi-seed-1kg-sky-original-imahhykfmwwgmy6h.jpeg?q=70", "pet-food-3"), 649, 799, "FeatherChoice", 4.5, 180, 33),
  product("pet-food-4", "Tropical Fish Food", "Pet Food", "Fish Food", image("https://m.media-amazon.com/images/I/81YDlnpTUeL.jpg", "pet-food-4"), 499, 699, "AquaNourish", 4.5, 143, 40),

  product("accessories-1", "Leather Dog Collar", "Accessories", "Collars", image("https://karmacollars.com/cdn/shop/files/leather-dog-collars-karma-collars-882278_1200x.jpg?v=1716199142", "accessories-1"), 899, 1199, "PawLux", 4.7, 230, 24),
  product("accessories-2", "Adjustable Pet Leash", "Accessories", "Leashes", image("https://m.media-amazon.com/images/I/61G2Pmu-UTL._AC_UF1000,1000_QL80_.jpg", "accessories-2"), 1299, 1699, "WalkWise", 4.8, 260, 20),
  product("accessories-3", "Pet Harness", "Accessories", "Harnesses", image("https://m.media-amazon.com/images/I/81ngzUcuSUL._AC_UF1000,1000_QL80_.jpg", "accessories-3"), 1499, 1999, "TrailPaws", 4.7, 214, 18),
  product("accessories-4", "Stainless Steel Pet Bowl", "Accessories", "Food Bowls", image("https://www.wonderchef.com/cdn/shop/files/1_96f9cc16-a2ad-4532-9733-015f766fa53f.jpg?v=1767698137", "accessories-4"), 599, 799, "BowlMate", 4.6, 200, 31),

  product("grooming-1", "Complete Grooming Kit", "Grooming", "Grooming Kits", image("https://m.media-amazon.com/images/I/71wty+BsSgL._AC_UF1000,1000_QL80_.jpg", "grooming-1"), 1899, 2499, "PetCare Pro", 4.8, 270, 18),
  product("grooming-2", "Pet Shampoo", "Grooming", "Shampoos", image("https://images.meesho.com/images/products/510331253/x4pz5_512.webp?width=512", "grooming-2"), 699, 899, "FurGlow", 4.6, 220, 26),
  product("grooming-3", "Slicker Brush", "Grooming", "Brushes", image("https://m.media-amazon.com/images/I/613el+OJlDL.jpg", "grooming-3"), 649, 799, "BrushBark", 4.6, 180, 30),
  product("grooming-4", "Pet Nail Clipper", "Grooming", "Nail Care", image("https://www.mutneys.com/wp-content/uploads/2019/05/Ergo_Nail_Clippers_v2_bf9292aa-f0e9-4aea-95ab-344489f8b0e1_800x800.png", "grooming-4"), 499, 699, "ClawCut", 4.6, 140, 38),

  product("toys-1", "Durable Rubber Chew Bone", "Toys", "Dog Toys", image("https://m.media-amazon.com/images/I/71cZMNIifHL.jpg", "toys-1"), 399, 549, "PawJoy", 4.8, 184, 25),
  product("toys-2", "Interactive Feather Cat Wand", "Toys", "Cat Toys", image("https://m.media-amazon.com/images/I/71l37Yyn2CL._AC_UF1000,1000_QL80_.jpg", "toys-2"), 299, 399, "KittyPlay", 4.7, 142, 30),
  product("toys-3", "Natural Cotton Rope Tug Toy", "Toys", "Dog Toys", image("https://m.media-amazon.com/images/I/71CkZKcuDML.jpg", "toys-3"), 349, 499, "BiteWise", 4.6, 120, 20),
  product("toys-4", "Smart Treat Dispensing Puzzle Ball", "Toys", "Interactive Toys", image("https://m.media-amazon.com/images/I/615mxFy4P+L._AC_UF1000,1000_QL80_.jpg", "toys-4"), 599, 799, "PlayFetch", 4.9, 195, 18)
];

export const categoryImageFolders = {
  Pets: "/images/pets/",
  Dogs: "/images/pets/dogs/",
  Cats: "/images/pets/cats/",
  Birds: "/images/pets/birds/",
  Fish: "/images/pets/fish/",
  Rabbits: "/images/pets/small-pets/",
  "Small Pets": "/images/pets/small-pets/",
  "Pet Food": "/images/food/",
  Accessories: "/images/products/accessories/",
  Grooming: "/images/products/grooming/",
  Toys: "/images/products/toys/"
};

export const validateCategoryImage = (category = "", imagePath = "") => {
  const folder = categoryImageFolders[category];
  return Boolean(folder && imagePath && (imagePath.startsWith(folder) || imagePath.startsWith("http")));
};

export default products;
