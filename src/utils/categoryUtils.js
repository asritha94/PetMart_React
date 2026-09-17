/**
 * Category Normalization Utility
 * Standardizes category slugs across PetMart to prevent string comparison mismatches.
 */
export const normalizeCategory = (category = "") => {
  if (!category) return "";
  const cleaned = String(category).trim().toLowerCase().replace(/\s+/g, "-");
  if (cleaned === "dog") return "dogs";
  if (cleaned === "cat") return "cats";
  if (cleaned === "bird") return "birds";
  if (cleaned === "rabbit") return "rabbits";
  if (cleaned === "toy") return "toys";
  if (cleaned === "accessory" || cleaned === "pet-accessories") return "accessories";
  if (cleaned === "food" || cleaned === "petfood" || cleaned === "pet_food") return "pet-food";
  if (cleaned === "small-pet" || cleaned === "smallpet" || cleaned === "small_pets" || cleaned === "hamster") return "small-pets";
  return cleaned;
};
