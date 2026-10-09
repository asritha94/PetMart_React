import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  pets as seedPets,
  seedUsers,
  seedOrders,
  initialSettings
} from "../data/data";
import {
  products as seedProducts,
} from "../data/products";
import seedCategories from "../data/categories";
import {
  getStorage,
  setStorage,
  removeStorage,
  getUserId,
  getUserStorageKey,
  getCurrentUser as getStoredCurrentUser,
  saveCurrentUser as setStoredCurrentUser,
  getAdminSession as getStoredAdminSession,
  saveAdminSession as setStoredAdminSession,
  getUserData,
  saveUserData,
  getUserCart,
  saveUserCart,
  getUserWishlist,
  saveUserWishlist,
  getUserOrders,
  saveUserOrders,
  migrateLegacyUserData
} from "../utils/storage";

const AppContext = createContext(null);

const categoryImageFallbacks = {
  pets: "/images/categories/pets.jpg",
  dogs: "/images/categories/pets.jpg",
  cats: "/images/categories/pets.jpg",
  birds: "/images/categories/pets.jpg",
  fish: "/images/categories/fish.jpg",
  rabbits: "/images/categories/pets.jpg",
  "small-pets": "/images/categories/pets.jpg",
  "pet-food": "/images/categories/pet-food.jpg",
  accessories: "/images/categories/accessories.jpg",
  "pet-accessories": "/images/categories/accessories.jpg",
  grooming: "/images/categories/grooming.jpg",
  toys: "/images/categories/toys.jpg",
  healthcare: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=900&q=85",
  aquarium: "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&w=900&q=85",
  "pet-furniture": "https://images.unsplash.com/photo-1591946614720-90a587da4a36?auto=format&fit=crop&w=900&q=85"
};

const categoryForProduct = (category = "") => {
  const value = String(category || "").toLowerCase();
  if (value === "pets") return "pets";
  if (value === "dogs" || value === "dog") return "dogs";
  if (value === "cats" || value === "cat") return "cats";
  if (value === "birds" || value === "bird") return "birds";
  if (value === "fish") return "fish";
  if (value === "rabbits" || value === "rabbit") return "rabbits";
  if (value === "small pets" || value === "small-pets" || value === "hamster") return "small-pets";
  if (value.includes("food") || value.includes("treat")) return "pet-food";
  if (["grooming"].includes(value)) return "grooming";
  if (["healthcare", "supplements", "medical", "care"].includes(value)) return "healthcare";
  if (["toys", "play", "games"].includes(value)) return "toys";
  if (["furniture", "beds", "crate", "cage", "tree", "enclosure"].includes(value)) return "pet-furniture";
  if (value.includes("accessor") || ["collars", "leashes", "bowls", "accessory"].includes(value)) return "accessories";
  if (value.includes("aquarium") || value.includes("fish tank") || value.includes("filter")) return "aquarium";
  return "accessories";
};

const CATALOG_VERSION = 6;
const PET_CATALOG_VERSION = 1;

const getProductsWithMigration = () => {
  const storedProducts = getStorage("petmart_products", null);
  const defaultProducts = [...seedProducts];

  if (!Array.isArray(storedProducts) || storedProducts.length === 0) {
    setStorage("petmart_catalog_version", CATALOG_VERSION);
    return defaultProducts;
  }

  const storedVersion = Number(getStorage("petmart_catalog_version", 0));
  if (storedVersion < CATALOG_VERSION) {
    setStorage("petmart_catalog_version", CATALOG_VERSION);
    return defaultProducts;
  }

  const storedById = new Map(storedProducts.map((product) => [product.id, product]));
  const normalizedProducts = defaultProducts.map((defaultProduct) => {
    const storedProduct = storedById.get(defaultProduct.id);
    return storedProduct ? { ...defaultProduct, ...storedProduct } : defaultProduct;
  });

  const defaultIds = new Set(defaultProducts.map((p) => p.id));
  const customProducts = storedProducts.filter((p) => !defaultIds.has(p.id));

  setStorage("petmart_catalog_version", CATALOG_VERSION);
  return [...normalizedProducts, ...customProducts];
};

const getCategoriesWithMigration = () => {
  const storedCategories = getStorage("petmart_categories", null);
  const categoryVersion = Number(getStorage("petmart_category_catalog_version", 0));
  const hasToys = Array.isArray(storedCategories) && storedCategories.some((c) => c.slug === "toys");
  if (!Array.isArray(storedCategories) || categoryVersion < CATALOG_VERSION || !hasToys) {
    setStorage("petmart_category_catalog_version", CATALOG_VERSION);
    setStorage("petmart_categories", seedCategories);
    return [...seedCategories];
  }
  return storedCategories;
};

const getPetsWithMigration = () => {
  const storedPets = getStorage("petmart_pets", null);
  const defaultPets = [...seedPets];

  if (!Array.isArray(storedPets) || storedPets.length === 0) {
    setStorage("petmart_pet_catalog_version", PET_CATALOG_VERSION);
    return defaultPets;
  }

  const storedVersion = Number(getStorage("petmart_pet_catalog_version", 0));
  if (storedVersion < PET_CATALOG_VERSION) {
    const storedIds = new Set(storedPets.map((pet) => pet.id));
    const missingPets = defaultPets.filter((pet) => !storedIds.has(pet.id));
    setStorage("petmart_pet_catalog_version", PET_CATALOG_VERSION);
    return [...storedPets, ...missingPets];
  }
  return storedPets;
};

const getUsersWithSeedAccounts = () => {
  const storedUsers = getStorage("petmart_users", []);
  if (!Array.isArray(storedUsers)) return seedUsers;

  const storedByEmail = new Map(
    storedUsers.map((user) => [String(user.email || "").trim().toLowerCase(), user])
  );
  const seededUsers = seedUsers.map((seedUser) =>
    storedByEmail.get(seedUser.email.toLowerCase()) || seedUser
  );
  const seededEmails = new Set(seedUsers.map((user) => user.email.toLowerCase()));

  return [
    ...seededUsers,
    ...storedUsers.filter((user) => !seededEmails.has(String(user.email || "").trim().toLowerCase()))
  ];
};

const getCustomerSession = () => {
  const storedUser = getStoredCurrentUser();
  return storedUser?.role === "admin" ? null : storedUser;
};

const getAdminSession = () => {
  const storedAdmin = getStoredAdminSession();
  if (storedAdmin?.role === "admin") return storedAdmin;

  const legacyUser = getStoredCurrentUser();
  return legacyUser?.role === "admin"
    ? { id: legacyUser.id, name: legacyUser.name, email: legacyUser.email, role: "admin" }
    : null;
};

const getCatalogWithImageFallbacks = (items) => {
  if (!Array.isArray(items) || items.length === 0) return seedProducts;

  return items.map((item) => {
    let primaryCategory = item.primaryCategory;
    if (!primaryCategory) primaryCategory = categoryForProduct(item.category);
    const image = item.image || categoryImageFallbacks[primaryCategory] || categoryImageFallbacks.accessories;
    const gallery = Array.isArray(item.gallery) && item.gallery.length
      ? item.gallery.filter(Boolean)
      : [image];

    return {
      ...item,
      primaryCategory,
      image,
      gallery
    };
  });
};

export function AppProvider({ children }) {
  // Persistent States
  const [users, setUsers] = useState(getUsersWithSeedAccounts);
  const [currentUser, setCurrentUser] = useState(getCustomerSession);
  const [adminSession, setAdminSession] = useState(getAdminSession);
  const [pets, setPets] = useState(getPetsWithMigration);
  const [products, setProducts] = useState(() => getCatalogWithImageFallbacks(getProductsWithMigration()));
  const [categories, setCategories] = useState(getCategoriesWithMigration);

  // Active user ID ref to track authenticated context and prevent cross-account state leakage
  const activeUserIdRef = useRef(currentUser?.id || "guest");

  // Orders initialized with migration to guarantee user-level isolation
  const [orders, setOrders] = useState(() => {
    const initialUser = getCustomerSession();
    const initialUsers = getUsersWithSeedAccounts();
    return migrateLegacyUserData(initialUser, initialUsers, seedOrders) || getStorage("petmart_orders", seedOrders);
  });

  // Isolated Cart and Wishlist states (loaded specifically for the active authenticated user)
  const [cart, setCart] = useState(() => {
    const initialUser = getCustomerSession();
    return getUserCart(initialUser?.id || "guest");
  });
  const [wishlist, setWishlist] = useState(() => {
    const initialUser = getCustomerSession();
    return getUserWishlist(initialUser?.id || "guest");
  });

  const [settings, setSettings] = useState(() => getStorage("petmart_settings", initialSettings));
  const [reviews, setReviews] = useState(() => getStorage("petmart_reviews", []));

  // Transient States
  const [coupon, setCoupon] = useState(null); // { code: "PETMART10", discountPercent: 10 }
  const [toast, setToast] = useState(null);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  // Sync Global & Administrative States to LocalStorage
  useEffect(() => setStorage("petmart_users", users), [users]);
  useEffect(() => setStoredCurrentUser(currentUser), [currentUser]);
  useEffect(() => setStoredAdminSession(adminSession), [adminSession]);
  useEffect(() => setStorage("petmart_pets", pets), [pets]);
  useEffect(() => setStorage("petmart_products", products), [products]);
  useEffect(() => setStorage("petmart_categories", categories), [categories]);
  useEffect(() => setStorage("petmart_orders", orders), [orders]);
  useEffect(() => setStorage("petmart_settings", settings), [settings]);
  useEffect(() => setStorage("petmart_reviews", reviews), [reviews]);

  // Reload isolated cart & wishlist whenever the authenticated user changes (prevents state leakage)
  useEffect(() => {
    const currentId = currentUser?.id || "guest";
    if (activeUserIdRef.current !== currentId) {
      activeUserIdRef.current = currentId;
      setCart(getUserCart(currentId));
      setWishlist(getUserWishlist(currentId));
      setCoupon(null);
    }
  }, [currentUser?.id]);

  useEffect(() => {
    const syncFromAnotherTab = (event) => {
      if (event.key === "petmart_products" && event.newValue) setProducts(JSON.parse(event.newValue));
      if (event.key === "petmart_categories" && event.newValue) setCategories(JSON.parse(event.newValue));
      if (event.key === "petmart_orders" && event.newValue) setOrders(JSON.parse(event.newValue));
      if (event.key === "petmart_reviews" && event.newValue) setReviews(JSON.parse(event.newValue));
    };
    window.addEventListener("storage", syncFromAnotherTab);
    return () => window.removeEventListener("storage", syncFromAnotherTab);
  }, []);

  // Toast helper
  const notify = (message, type = "success") => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast((current) => (current?.message === message ? null : current));
    }, 3200);
  };

  // Authentication
  const login = (email, password) => {
    const normalizedEmail = String(email || "").trim().toLowerCase();
    const normalizedPassword = String(password || "");
    const user = users.find(
      (u) => String(u.email || "").trim().toLowerCase() === normalizedEmail && String(u.password || "") === normalizedPassword
    );
    if (!user || user.role === "admin") return false;

    activeUserIdRef.current = user.id;
    setCurrentUser(user);
    setStoredCurrentUser(user);

    // Load that user's specific cart, wishlist, and reset transient coupon
    const userCart = getUserCart(user.id);
    const userWishlist = getUserWishlist(user.id);
    setCart(userCart);
    setWishlist(userWishlist);
    setCoupon(null);

    notify(`Welcome back, ${user.name.split(" ")[0]}!`);
    return user;
  };

  const adminLogin = (email, password) => {
    const normalizedEmail = String(email || "").trim().toLowerCase();
    const normalizedPassword = String(password || "");
    const admin = users.find(
      (user) => user.role === "admin" &&
        String(user.email || "").trim().toLowerCase() === normalizedEmail &&
        String(user.password || "") === normalizedPassword
    );
    if (!admin) return false;
    const session = { id: admin.id, name: admin.name, email: admin.email, role: admin.role };
    setAdminSession(session);
    setStoredAdminSession(session);
    notify(`Welcome to the admin portal, ${admin.name.split(" ")[0]}!`);
    return admin;
  };

  const logout = () => {
    activeUserIdRef.current = "guest";
    setCurrentUser(null);
    setStoredCurrentUser(null);

    // Clear in-memory cart, wishlist, and coupon so nothing leaks to the next session
    setCart([]);
    setWishlist([]);
    setCoupon(null);

    notify("You have logged out successfully.", "info");
  };

  const adminLogout = () => {
    setAdminSession(null);
    setStoredAdminSession(null);
    notify("Admin session ended.", "info");
  };

  const register = (userData) => {
    const exists = users.some(
      (u) => u.email.toLowerCase() === userData.email.trim().toLowerCase()
    );
    if (exists) {
      notify("An account with this email already exists.", "error");
      return false;
    }
    const newUserId = "u-" + Date.now();
    const newUser = {
      id: newUserId,
      name: userData.fullName || userData.name,
      email: userData.email.trim(),
      phone: userData.phone || "",
      password: userData.password,
      role: "user",
      joined: new Date().toISOString().split("T")[0],
      addresses: [
        {
          id: "addr-" + Date.now(),
          title: "Home",
          fullName: userData.fullName || userData.name,
          phone: userData.phone || "",
          street: userData.address || "Street Address",
          city: userData.city || "Hyderabad",
          state: userData.state || "Telangana",
          pincode: userData.pincode || "500001",
          isDefault: true
        }
      ]
    };

    // Initialize isolated storage record for new customer
    saveUserData(newUserId, {
      cart: [],
      wishlist: [],
      orders: [],
      profile: newUser
    });

    setUsers((prev) => [...prev, newUser]);
    activeUserIdRef.current = newUserId;
    setCurrentUser(newUser);
    setStoredCurrentUser(newUser);
    setCart([]);
    setWishlist([]);
    setCoupon(null);

    notify("Registration successful! Welcome to PetMart.");
    return true;
  };

  const updateProfile = (updatedFields) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updatedFields };
    setCurrentUser(updated);
    setUsers((prev) => prev.map((u) => (u.id === currentUser.id ? updated : u)));
    saveUserData(currentUser.id, { profile: updated });
    notify("Profile updated successfully!");
  };

  const addAddress = (address) => {
    if (!currentUser) return;
    const newAddr = { ...address, id: "addr-" + Date.now() };
    const updatedAddresses = [...(currentUser.addresses || []), newAddr];
    updateProfile({ addresses: updatedAddresses });
    notify("Address added!");
  };

  const deleteAddress = (addrId) => {
    if (!currentUser) return;
    const filtered = (currentUser.addresses || []).filter((a) => a.id !== addrId);
    updateProfile({ addresses: filtered });
    notify("Address removed.");
  };

  // Cart Operations (user-isolated)
  const addCart = (item, qty = 1) => {
    const userId = currentUser?.id || "guest";
    setCart((prev) => {
      const existing = prev.some((i) => i.id === item.id);
      let updated;
      if (existing) {
        updated = prev.map((i) =>
          i.id === item.id ? { ...i, qty: i.qty + qty } : i
        );
      } else {
        updated = [...prev, { ...item, qty }];
      }
      saveUserCart(userId, updated);
      return updated;
    });
    notify(`Added "${item.name}" to cart.`);
  };

  const updateQty = (id, qty) => {
    const userId = currentUser?.id || "guest";
    if (qty <= 0) {
      removeCart(id);
      return;
    }
    setCart((prev) => {
      const updated = prev.map((i) => (i.id === id ? { ...i, qty } : i));
      saveUserCart(userId, updated);
      return updated;
    });
  };

  const removeCart = (id) => {
    const userId = currentUser?.id || "guest";
    setCart((prev) => {
      const updated = prev.filter((i) => i.id !== id);
      saveUserCart(userId, updated);
      return updated;
    });
    notify("Item removed from cart.", "info");
  };

  const clearCart = () => {
    const userId = currentUser?.id || "guest";
    setCart([]);
    saveUserCart(userId, []);
    setCoupon(null);
  };

  const applyCoupon = (code) => {
    const formatted = (code || "").trim().toUpperCase();
    if (formatted === "PETMART10") {
      setCoupon({ code: "PETMART10", discountPercent: 10 });
      notify("Coupon PETMART10 applied! 10% discount added.");
      return { success: true, message: "10% off applied!" };
    } else if (formatted === "WELCOME15") {
      setCoupon({ code: "WELCOME15", discountPercent: 15 });
      notify("Coupon WELCOME15 applied! 15% discount added.");
      return { success: true, message: "15% off applied!" };
    } else {
      notify("Invalid coupon code. Try PETMART10", "error");
      return { success: false, message: "Invalid coupon" };
    }
  };

  const removeCoupon = () => {
    setCoupon(null);
    notify("Coupon removed.", "info");
  };

  // Cart Calculation Helpers
  const cartSubtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  }, [cart]);

  const cartSavings = useMemo(() => {
    return cart.reduce((sum, item) => {
      if (item.oldPrice && item.oldPrice > item.price) {
        return sum + (item.oldPrice - item.price) * item.qty;
      }
      return sum;
    }, 0);
  }, [cart]);

  const couponDiscountAmount = useMemo(() => {
    if (!coupon) return 0;
    return Math.round((cartSubtotal * coupon.discountPercent) / 100);
  }, [cartSubtotal, coupon]);

  const deliveryFee = useMemo(() => {
    if (cart.length === 0) return 0;
    const threshold = settings?.freeDeliveryThreshold || 999;
    return cartSubtotal >= threshold ? 0 : (settings?.standardDeliveryFee || 99);
  }, [cart, cartSubtotal, settings]);

  const taxAmount = useMemo(() => {
    const rate = (settings?.taxRatePercent || 5) / 100;
    return Math.round((cartSubtotal - couponDiscountAmount) * rate);
  }, [cartSubtotal, couponDiscountAmount, settings]);

  const cartGrandTotal = useMemo(() => {
    if (cart.length === 0) return 0;
    return Math.max(0, cartSubtotal - couponDiscountAmount + deliveryFee + taxAmount);
  }, [cartSubtotal, couponDiscountAmount, deliveryFee, taxAmount, cart]);

  // Wishlist Operations (user-isolated)
  const toggleWish = (item) => {
    const userId = currentUser?.id || "guest";
    setWishlist((prev) => {
      const exists = prev.some((i) => i.id === item.id);
      let updated;
      if (exists) {
        notify(`Removed "${item.name}" from wishlist.`, "info");
        updated = prev.filter((i) => i.id !== item.id);
      } else {
        notify(`Added "${item.name}" to wishlist!`);
        updated = [...prev, item];
      }
      saveUserWishlist(userId, updated);
      return updated;
    });
  };

  const removeWish = (id) => {
    const userId = currentUser?.id || "guest";
    setWishlist((prev) => {
      const updated = prev.filter((i) => i.id !== id);
      saveUserWishlist(userId, updated);
      return updated;
    });
    notify("Removed from wishlist.", "info");
  };

  const moveWishToCart = (item) => {
    addCart(item, 1);
    removeWish(item.id);
  };

  const clearWishlist = () => {
    const userId = currentUser?.id || "guest";
    setWishlist([]);
    saveUserWishlist(userId, []);
    notify("Wishlist cleared.", "info");
  };

  // Orders Management (user-isolated placement and customer/admin synchronization)
  const placeOrder = (customerDetails, paymentMethod) => {
    const userId = currentUser?.id || "guest";
    const newOrder = {
      id: "PM" + Date.now(),
      userId,
      date: new Date().toISOString(),
      customer: customerDetails.fullName,
      email: customerDetails.email || currentUser?.email || "",
      phone: customerDetails.phone || currentUser?.phone || "",
      address: `${customerDetails.address}, ${customerDetails.city}, ${customerDetails.state} - ${customerDetails.pincode}`,
      items: [...cart],
      subtotal: cartSubtotal,
      discount: couponDiscountAmount,
      coupon: coupon ? coupon.code : null,
      delivery: deliveryFee,
      tax: taxAmount,
      total: cartGrandTotal,
      payment: paymentMethod,
      status: "Confirmed"
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Save order into the placing customer's isolated account history
    const existingUserOrders = getUserOrders(userId);
    saveUserOrders(userId, [newOrder, ...existingUserOrders]);

    clearCart();
    notify("Order placed successfully! Congratulations 🎉");
    return newOrder;
  };

  const cancelOrder = (orderId) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: "Cancelled" } : o))
    );
    if (currentUser?.id) {
      const existingUserOrders = getUserOrders(currentUser.id);
      saveUserOrders(
        currentUser.id,
        existingUserOrders.map((o) => (o.id === orderId ? { ...o, status: "Cancelled" } : o))
      );
    }
    notify("Order has been cancelled.", "info");
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) => {
      const updated = prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o));
      const target = updated.find((o) => o.id === orderId);
      if (target?.userId) {
        const targetUserOrders = getUserOrders(target.userId);
        saveUserOrders(
          target.userId,
          targetUserOrders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
        );
      }
      return updated;
    });
    notify(`Order #${orderId} status changed to "${newStatus}".`);
  };

  // Filtered orders belonging strictly to the authenticated customer
  const userOrders = useMemo(() => {
    if (!currentUser) return [];
    return orders.filter((o) => {
      if (o.userId && currentUser.id) {
        return o.userId === currentUser.id;
      }
      return Boolean(o.email && currentUser.email && o.email.toLowerCase() === currentUser.email.toLowerCase());
    });
  }, [orders, currentUser]);

  const addReview = (review) => {
    const newReview = {
      ...review,
      id: `review-${Date.now()}`,
      date: new Date().toISOString()
    };
    setReviews((previous) => [newReview, ...previous]);
    notify("Thank you for sharing your review!");
    return newReview;
  };

  const deleteReview = (reviewId) => {
    setReviews((previous) => previous.filter((review) => review.id !== reviewId));
    notify("Review removed.", "info");
  };

  // Admin CRUD for Pets
  const addPet = (petData) => {
    const newPet = {
      ...petData,
      id: "p" + (pets.length + 1) + "-" + Date.now().toString().slice(-4),
      price: Number(petData.price) || 0,
      image: petData.image || "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&q=85",
      gallery: petData.gallery?.length ? petData.gallery : [petData.image]
    };
    setPets((prev) => [newPet, ...prev]);
    notify("New pet added to listings!");
    return newPet;
  };

  const editPet = (petData) => {
    setPets((prev) =>
      prev.map((p) => (p.id === petData.id ? { ...p, ...petData, price: Number(petData.price) } : p))
    );
    notify("Pet information updated successfully.");
  };

  const deletePet = (id) => {
    setPets((prev) => prev.filter((p) => p.id !== id));
    notify("Pet removed from inventory.", "info");
  };

  // Admin CRUD for Products
  const addProduct = (productData) => {
    const primaryCategory = productData.primaryCategory || categoryForProduct(productData.category);
    const categoryProductCount = products.filter(
      (product) => product.primaryCategory === primaryCategory
    ).length;
    if (categoryProductCount >= 4) {
      notify("Each category already has its maximum of 4 products.", "error");
      return null;
    }

    const newProduct = {
      ...productData,
      id: "prod-" + (products.length + 1) + "-" + Date.now().toString().slice(-4),
      price: Number(productData.price) || 0,
      oldPrice: Number(productData.oldPrice) || Number(productData.price),
      discount: Number(productData.discount) || 0,
      stock: Number(productData.stock) || 10,
      rating: Number(productData.rating) || 4.5,
      reviews: Number(productData.reviews) || 1,
      primaryCategory,
      image: productData.image || categoryImageFallbacks[primaryCategory],
      gallery: productData.gallery?.length ? productData.gallery : [productData.image || categoryImageFallbacks[primaryCategory]],
      specifications: productData.specifications || { Brand: productData.brand, Category: productData.category }
    };
    setProducts((prev) => [newProduct, ...prev]);
    notify("Product created successfully!");
    return newProduct;
  };

  const editProduct = (productData) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productData.id
          ? {
              ...p,
              ...productData,
              primaryCategory: productData.primaryCategory || categoryForProduct(productData.category),
              image: productData.image || p.image || categoryImageFallbacks[productData.primaryCategory || categoryForProduct(productData.category)],
              price: Number(productData.price),
              oldPrice: Number(productData.oldPrice) || Number(productData.price),
              stock: Number(productData.stock)
            }
          : p
      )
    );
    notify("Product updated successfully.");
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    notify("Product deleted from catalog.", "info");
  };

  const updateProductStock = (id, newStock) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, stock: Math.max(0, Number(newStock)) } : p))
    );
    notify("Stock updated.");
  };

  const updateProductPrice = (id, newPrice) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, price: Math.max(0, Number(newPrice)) } : p))
    );
    notify("Price updated.");
  };

  // Admin CRUD for Categories
  const addCategory = (catData) => {
    const slug = catData.name.toLowerCase().replace(/\s+/g, "-");
    const newCat = {
      id: "cat-" + Date.now(),
      name: catData.name,
      slug,
      icon: catData.icon || "🐾",
      count: 0,
      image: catData.image || categoryImageFallbacks[slug] || categoryImageFallbacks.accessories,
      description: catData.description || ""
    };
    setCategories((prev) => [...prev, newCat]);
    notify(`Category "${catData.name}" created!`);
  };

  const editCategory = (catData) => {
    const slug = catData.name.toLowerCase().replace(/\s+/g, "-");
    setCategories((prev) => prev.map((category) => category.id === catData.id
      ? { ...category, ...catData, slug, image: catData.image || category.image || categoryImageFallbacks[slug] || categoryImageFallbacks.accessories }
      : category
    ));
    notify(`Category "${catData.name}" updated.`);
  };

  const deleteCategory = (id) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
    notify("Category deleted.", "info");
  };

  // Admin CRUD for Users
  const deleteUser = (id) => {
    const target = users.find((u) => u.id === id);
    if (target?.role === "admin") {
      notify("Cannot delete default Administrator account.", "error");
      return;
    }
    setUsers((prev) => prev.filter((u) => u.id !== id));
    notify("User removed successfully.", "info");
  };

  // Admin Settings
  const updateSettings = (newSettings) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
    notify("Store settings updated successfully.");
  };

  const value = useMemo(
    () => ({
      users,
      currentUser,
      adminSession,
      pets,
      products,
      categories,
      cart,
      wishlist,
      orders,
      userOrders,
      settings,
      reviews,
      coupon,
      toast,
      searchModalOpen,
      setSearchModalOpen,
      notify,
      login,
      adminLogin,
      logout,
      adminLogout,
      register,
      updateProfile,
      addAddress,
      deleteAddress,
      addCart,
      updateQty,
      removeCart,
      clearCart,
      applyCoupon,
      removeCoupon,
      cartSubtotal,
      cartSavings,
      couponDiscountAmount,
      deliveryFee,
      taxAmount,
      cartGrandTotal,
      toggleWish,
      removeWish,
      moveWishToCart,
      clearWishlist,
      placeOrder,
      cancelOrder,
      updateOrderStatus,
      addReview,
      deleteReview,
      addPet,
      editPet,
      deletePet,
      addProduct,
      editProduct,
      deleteProduct,
      updateProductStock,
      updateProductPrice,
      addCategory,
      editCategory,
      deleteCategory,
      deleteUser,
      updateSettings
    }),
    [
      users,
      currentUser,
      adminSession,
      pets,
      products,
      categories,
      cart,
      wishlist,
      orders,
      userOrders,
      settings,
      coupon,
      toast,
      searchModalOpen,
      cartSubtotal,
      cartSavings,
      couponDiscountAmount,
      deliveryFee,
      taxAmount,
      cartGrandTotal
    ]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => useContext(AppContext);
