const fallbacks = {
  pets: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&q=85",
  dogs: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=900&q=85",
  cats: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=900&q=85",
  birds: "https://images.unsplash.com/photo-1444464666168-49d633b86797?auto=format&fit=crop&w=900&q=85",
  fish: "/images/categories/fish.jpg",
  rabbits: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=900&q=85",
  "small-pets": "https://images.unsplash.com/photo-1425082661705-1834bfd09dca?auto=format&fit=crop&w=900&q=85",
  "pet-food": "/images/categories/pet-food.jpg",
  accessories: "/images/categories/accessories.jpg",
  grooming: "/images/categories/grooming.jpg",
  toys: "/images/categories/toys.jpg",
  healthcare: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=85",
  aquarium: "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&w=900&q=85",
  "pet-furniture": "https://images.unsplash.com/photo-1591946614720-90a587da4a36?auto=format&fit=crop&w=900&q=85"
};

export function getImageFallback(itemOrCategory) {
  const category = typeof itemOrCategory === "string"
    ? itemOrCategory
    : itemOrCategory?.primaryCategory || itemOrCategory?.category;
  const normalized = String(category || "").toLowerCase().replace(/\s+/g, "-");
  if (fallbacks[normalized]) return fallbacks[normalized];
  if (normalized.includes("food") || normalized.includes("treat")) return fallbacks["pet-food"];
  if (normalized.includes("groom")) return fallbacks.grooming;
  if (normalized.includes("toy")) return fallbacks.toys;
  if (normalized.includes("health")) return fallbacks.healthcare;
  if (normalized.includes("aquarium") || normalized.includes("fish")) return fallbacks.aquarium;
  if (normalized.includes("bed") || normalized.includes("furniture")) return fallbacks["pet-furniture"];
  if (normalized.includes("pet") || normalized.includes("dog") || normalized.includes("cat")) return fallbacks.pets;
  return fallbacks.accessories;
}
