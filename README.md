# 🐾 PetMart – Online Pet Store

PetMart is a modern, responsive online pet store frontend application built with React.js. It provides a convenient shopping experience for pet owners to explore pets, browse pet food and accessories, manage their shopping cart and wishlist, place orders, and maintain their profiles.

The application also includes a separate Admin Dashboard for managing store inventory, categories, customer accounts, orders, reviews, and store settings. It uses browser LocalStorage to persist application data without requiring a backend server or database.

## 📌 Project Overview

* **Project Name:** PetMart – Online Pet Store
* **Project Type:** Frontend E-commerce Web Application
* **Architecture:** React Single-Page Application (SPA)
* **Build Tool:** Vite
* **Data Persistence:** Browser LocalStorage
* **Backend:** Not implemented
* **Database:** Not required

## ✨ Key Features

### 1. Customer Storefront

* Responsive home page with a modern e-commerce layout.
* Browse pets, pet products, and accessories.
* Explore 10 product categories: Dogs, Cats, Birds, Fish, Rabbits, Small Pets, Pet Food, Accessories, Grooming, and Toys.
* View product and pet details, including images, descriptions, and prices.
* Search and browse products through category-based navigation.
* Responsive navigation and reusable product cards.

### 2. User Authentication

* Register a new customer account.
* Log in using registered account details.
* Maintain customer profile information.
* Protect account-specific pages such as checkout, profile, and orders.
* Keep customer sessions separate from the admin session.

### 3. Shopping Cart and Wishlist

* Add products to the shopping cart.
* Update product quantities and remove items.
* View cart subtotal, savings, delivery charges, taxes, and order total.
* Add and remove wishlist items.
* Store cart and wishlist data separately for each customer account.
* Preserve customer-specific shopping data using LocalStorage.

### 4. Checkout and Order Management

* Enter and validate delivery information.
* Review order totals before placing an order.
* Choose from the available checkout options: UPI, card, or Cash on Delivery.
* Place orders and save order information locally.
* View order history from the customer account.

**Note:** Checkout and payment options are frontend demonstrations. The project does not integrate a real payment gateway or backend order-processing service.

### 5. Customer Profile

* View and manage profile information.
* Maintain delivery address information.
* Access account-specific orders.
* Keep customer shopping information separated between accounts.

### 6. Admin Dashboard

The application provides a dedicated admin portal separate from the customer storefront.

Admin features include:

* **Dashboard:** View store administration information.
* **Manage Pets:** Add, update, and manage pet listings.
* **Manage Products:** Maintain product information and inventory.
* **Manage Categories:** Manage product categories.
* **Manage Orders:** Review and manage customer orders.
* **Manage Users:** View and manage customer accounts.
* **Manage Reviews:** Manage product reviews.
* **Admin Settings:** Access available store configuration options.

The admin portal uses a separate login and protected admin routes.

## 🛠️ Technologies Used

| Technology        | Purpose                                         |
| ----------------- | ----------------------------------------------- |
| HTML5             | Web page structure                              |
| CSS3              | Styling and responsive layouts                  |
| JavaScript (ES6+) | Application logic and interactions              |
| React.js          | Component-based user interface                  |
| React Router      | Client-side navigation and routing              |
| Context API       | Shared application state management             |
| LocalStorage      | Browser-based data persistence                  |
| Vite              | Development server and production build tool    |
| Lucide React      | Icons                                           |
| Recharts          | Chart components and data visualization support |

## ⚙️ How the Project Works

### Customer Workflow

1. The customer opens the PetMart home page.
2. The customer browses the available pets, categories, and products.
3. The customer selects a product to view its details.
4. The customer adds products to the cart or wishlist.
5. The customer registers or logs in to access account-specific features.
6. The customer reviews the cart, updates quantities, and proceeds to checkout.
7. The customer enters delivery information and selects a checkout payment option.
8. The application creates an order and stores the relevant information in LocalStorage.
9. The customer can access their profile and order history.

### Admin Workflow

1. The administrator opens the Admin Login page.
2. The administrator signs in using the configured admin credentials.
3. The application checks the admin session and grants access to protected admin routes.
4. The administrator opens the dashboard.
5. The administrator manages pets, products, categories, orders, users, reviews, and settings through the corresponding sections.
6. Changes are saved in browser LocalStorage and reflected in the application.

### Data Management Workflow

PetMart uses React Context API to share application state between components. LocalStorage saves data in the browser so that supported information remains available after refreshing the page or reopening the application in the same browser.

Customer cart, wishlist, and order information are associated with individual user accounts. When the active customer changes, the application reloads the corresponding account's shopping data to prevent one customer's cart or wishlist from appearing in another customer's session.

**Important:** This is a frontend-only implementation. LocalStorage is not a secure database, and client-side authentication is suitable for demonstration and learning purposes rather than production security.

## 📂 Project Structure

```text
PetMart_React/
├── public/
│   └── images/
├── src/
│   ├── admin/
│   │   ├── AdminLogin.jsx
│   │   ├── AdminLayout.jsx
│   │   ├── Dashboard.jsx
│   │   ├── ManagePets.jsx
│   │   ├── ManageProducts.jsx
│   │   ├── ManageCategories.jsx
│   │   ├── ManageOrders.jsx
│   │   ├── ManageUsers.jsx
│   │   ├── ManageReviews.jsx
│   │   └── AdminSettings.jsx
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ProductCard.jsx
│   │   ├── PetCard.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/
│   │   └── AppContext.jsx
│   ├── data/
│   │   ├── data.js
│   │   ├── products.js
│   │   ├── categories.js
│   │   └── catalogExpansion.js
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Category.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── PetDetails.jsx
│   │   ├── Cart.jsx
│   │   ├── Wishlist.jsx
│   │   ├── Checkout.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Profile.jsx
│   │   ├── Orders.jsx
│   │   └── Info.jsx
│   ├── utils/
│   │   ├── storage.js
│   │   ├── categoryUtils.js
│   │   └── imageFallbacks.js
│   ├── App.jsx
│   ├── main.jsx
│   └── ...
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 Installation and Setup

### Prerequisites

Install the following on your computer:

* Node.js (LTS version recommended)
* npm (included with Node.js)
* Visual Studio Code or another code editor

### Step 1: Download the Project

Clone the repository or download and extract the project ZIP file.

```bash
git clone https://github.com/asritha94/PetMart_React.git
```

Navigate to the project directory:

```bash
cd PetMart_React
```

### Step 2: Install Dependencies

Run the following command in the project terminal:

```bash
npm install
```

### Step 3: Start the Development Server

```bash
npm run dev
```

### Step 4: Open the Application

Open the local URL displayed in your terminal. Vite commonly uses:

```text
http://localhost:5173/
```

### Step 5: Create a Production Build

To create an optimized production build, run:

```bash
npm run build
```

To preview the generated build locally, run:

```bash
npm run preview
```

## 🔐 Admin Demo Login

The project includes the following default admin demo credentials:

* **Email:** `admin@petmart.com`
* **Password:** `admin123`

Open the admin login page at:

```text
http://localhost:5173/admin/login
```

These are demonstration credentials defined by the current project. Do not use them for a publicly deployed application.

Customers can register through the storefront's Register page and log in with their registered details.

## 💾 Data Storage

The project stores application data in the browser's LocalStorage, including supported user accounts, sessions, products, pets, categories, carts, wishlists, orders, reviews, and settings.

* Data is local to the browser and website origin.
* Clearing browser storage may remove saved application data.
* Data is not automatically synchronized between different devices or browsers.
* There is no server-side database or real payment processing.

## 🔮 Future Enhancements

* Integrate a backend API using Spring Boot, Node.js, or another server technology.
* Add a database such as MySQL or PostgreSQL.
* Implement secure server-side authentication and role-based authorization.
* Integrate a real payment gateway.
* Add server-side order processing, inventory updates, and order tracking.
* Deploy the application with production-ready configuration.

## 🎯 Project Objective

The main objective of PetMart is to develop a professional, responsive e-commerce frontend that demonstrates React component design, routing, shared state management, account-specific data handling, LocalStorage persistence, shopping cart and wishlist functionality, checkout workflows, and administrative operations.

## 👩‍💻 Author

I. Asritha 

GitHub Repository : https://github.com/asritha94/PetMart_React


