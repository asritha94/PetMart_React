/**
 * PetMart Storage Utility
 * Provides centralized, safe LocalStorage interactions with strict user account isolation.
 */

// Safe read from LocalStorage
export const getStorage = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (error) {
    console.warn(`Error reading localStorage key "${key}":`, error);
    return fallback;
  }
};

// Safe write to LocalStorage
export const setStorage = (key, value) => {
  try {
    if (value === undefined || value === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (error) {
    console.warn(`Error saving to localStorage key "${key}":`, error);
  }
};

// Safe delete from LocalStorage
export const removeStorage = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.warn(`Error removing localStorage key "${key}":`, error);
  }
};

/**
 * Extracts a stable, unique identifier for a user.
 * Prefers user.id; falls back to user.email or string id.
 */
export const getUserId = (userOrId) => {
  if (!userOrId) return "guest";
  if (typeof userOrId === "string") return userOrId.trim();
  return userOrId.id || userOrId.email || "guest";
};

/**
 * Constructs the isolated LocalStorage key for a specific user account.
 * Example: "petmart_user_data_u-user" or "petmart_user_data_u-1728300000000"
 */
export const getUserStorageKey = (userId) => {
  const normalizedId = getUserId(userId);
  return `petmart_user_data_${normalizedId}`;
};

/**
 * Current customer authentication session
 */
export const getCurrentUser = () => {
  const user = getStorage("petmart_current_user", null);
  return user?.role === "admin" ? null : user;
};

export const saveCurrentUser = (user) => {
  if (!user) {
    removeStorage("petmart_current_user");
  } else {
    setStorage("petmart_current_user", user);
  }
};

/**
 * Admin portal authentication session
 */
export const getAdminSession = () => {
  const admin = getStorage("petmart_admin_session", null);
  if (admin?.role === "admin") return admin;

  const legacy = getStorage("petmart_current_user", null);
  return legacy?.role === "admin"
    ? { id: legacy.id, name: legacy.name, email: legacy.email, role: "admin" }
    : null;
};

export const saveAdminSession = (adminSession) => {
  if (!adminSession) {
    removeStorage("petmart_admin_session");
  } else {
    setStorage("petmart_admin_session", adminSession);
  }
};

/**
 * Retrieves the complete isolated account record for a user.
 * Format:
 * {
 *   cart: [...],
 *   wishlist: [...],
 *   orders: [...],
 *   profile: {...}
 * }
 */
export const getUserData = (userId) => {
  const key = getUserStorageKey(userId);
  const data = getStorage(key, null);
  if (data && typeof data === "object") {
    return {
      cart: Array.isArray(data.cart) ? data.cart : [],
      wishlist: Array.isArray(data.wishlist) ? data.wishlist : [],
      orders: Array.isArray(data.orders) ? data.orders : [],
      profile: data.profile && typeof data.profile === "object" ? data.profile : {}
    };
  }
  return {
    cart: [],
    wishlist: [],
    orders: [],
    profile: {}
  };
};

/**
 * Saves or merges isolated account data for a specific user.
 */
export const saveUserData = (userId, partialData) => {
  const normalizedId = getUserId(userId);
  const key = getUserStorageKey(normalizedId);
  const current = getUserData(normalizedId);
  const updated = {
    ...current,
    ...partialData
  };
  setStorage(key, updated);

  // Synchronize secondary isolated keys for compatibility
  if (partialData.cart !== undefined) {
    setStorage(`petmart_cart_${normalizedId}`, updated.cart);
  }
  if (partialData.wishlist !== undefined) {
    setStorage(`petmart_wishlist_${normalizedId}`, updated.wishlist);
  }

  return updated;
};

/**
 * User-isolated Cart
 */
export const getUserCart = (userId) => {
  const normalizedId = getUserId(userId);
  const centralized = getUserData(normalizedId).cart;
  if (Array.isArray(centralized) && centralized.length > 0) return centralized;

  const secondary = getStorage(`petmart_cart_${normalizedId}`, null);
  if (Array.isArray(secondary)) return secondary;

  return centralized || [];
};

export const saveUserCart = (userId, cart) => {
  const normalizedId = getUserId(userId);
  const safeCart = Array.isArray(cart) ? cart : [];
  const current = getUserData(normalizedId);
  return saveUserData(normalizedId, { ...current, cart: safeCart });
};

export const clearUserCart = (userId) => {
  return saveUserCart(userId, []);
};

/**
 * User-isolated Wishlist
 */
export const getUserWishlist = (userId) => {
  const normalizedId = getUserId(userId);
  const centralized = getUserData(normalizedId).wishlist;
  if (Array.isArray(centralized) && centralized.length > 0) return centralized;

  const secondary = getStorage(`petmart_wishlist_${normalizedId}`, null);
  if (Array.isArray(secondary)) return secondary;

  return centralized || [];
};

export const saveUserWishlist = (userId, wishlist) => {
  const normalizedId = getUserId(userId);
  const safeWishlist = Array.isArray(wishlist) ? wishlist : [];
  const current = getUserData(normalizedId);
  return saveUserData(normalizedId, { ...current, wishlist: safeWishlist });
};

export const clearUserWishlist = (userId) => {
  return saveUserWishlist(userId, []);
};

/**
 * User-isolated Orders
 */
export const getUserOrders = (userId) => {
  const normalizedId = getUserId(userId);
  return getUserData(normalizedId).orders || [];
};

export const saveUserOrders = (userId, orders) => {
  const normalizedId = getUserId(userId);
  const safeOrders = Array.isArray(orders) ? orders : [];
  const current = getUserData(normalizedId);
  return saveUserData(normalizedId, { ...current, orders: safeOrders });
};

/**
 * User-isolated Profile
 */
export const getUserProfile = (userId) => {
  const normalizedId = getUserId(userId);
  return getUserData(normalizedId).profile || {};
};

export const saveUserProfile = (userId, profile) => {
  const normalizedId = getUserId(userId);
  const current = getUserData(normalizedId);
  return saveUserData(normalizedId, { ...current, profile: profile || {} });
};

/**
 * Safe Migration:
 * Transitions any legacy shared data (e.g. global "petmart_cart", "petmart_wishlist",
 * and unassigned orders) into account-isolated records.
 */
export const migrateLegacyUserData = (currentUser, users = [], seedOrders = []) => {
  try {
    // 1. Migrate orders to ensure every order has a valid userId
    const storedOrders = getStorage("petmart_orders", null);
    const baseOrders = Array.isArray(storedOrders) && storedOrders.length > 0 ? storedOrders : seedOrders;
    let ordersModified = false;

    const migratedOrders = baseOrders.map((order) => {
      if (order.userId) return order;
      ordersModified = true;

      if (order.email && order.email.toLowerCase() === "user@petmart.com") {
        return { ...order, userId: "u-user" };
      }

      const matchingUser = users.find(
        (u) => u.email && order.email && u.email.toLowerCase() === order.email.toLowerCase()
      );
      return { ...order, userId: matchingUser ? matchingUser.id : "u-user" };
    });

    if (ordersModified || !storedOrders) {
      setStorage("petmart_orders", migratedOrders);
    }

    // Seed Priya Sharma's (u-user) isolated account with her seed orders if not populated yet
    const uUserData = getUserData("u-user");
    if (!uUserData.orders || uUserData.orders.length === 0) {
      const uOrders = migratedOrders.filter((o) => o.userId === "u-user");
      if (uOrders.length > 0) {
        saveUserData("u-user", { orders: uOrders });
      }
    }

    // 2. Safely migrate legacy global cart and delete the global key
    const legacyCart = getStorage("petmart_cart", null);
    if (legacyCart !== null) {
      if (Array.isArray(legacyCart) && legacyCart.length > 0) {
        const targetId = currentUser?.id || "guest";
        const currentTargetCart = getUserCart(targetId);
        if (currentTargetCart.length === 0) {
          saveUserCart(targetId, legacyCart);
        }
      }
      removeStorage("petmart_cart");
    }

    // 3. Safely migrate legacy global wishlist and delete the global key
    const legacyWishlist = getStorage("petmart_wishlist", null);
    if (legacyWishlist !== null) {
      if (Array.isArray(legacyWishlist) && legacyWishlist.length > 0) {
        const targetId = currentUser?.id || "guest";
        const currentTargetWishlist = getUserWishlist(targetId);
        if (currentTargetWishlist.length === 0) {
          saveUserWishlist(targetId, legacyWishlist);
        }
      }
      removeStorage("petmart_wishlist");
    }

    return migratedOrders;
  } catch (error) {
    console.warn("Migration warning:", error);
    return null;
  }
};
