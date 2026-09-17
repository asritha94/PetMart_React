import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Package } from "lucide-react";
import { useApp } from "../context/AppContext";
import {
  PageTitle,
  CategoryCard,
  ProductCard,
  Empty
} from "../components/Common";
import { normalizeCategory } from "../utils/categoryUtils";

export default function Category() {
  const { category: slug } = useParams();
  const { categories, products } = useApp();
  const [sortBy, setSortBy] = useState("featured");

  // Overview mode: all categories
  if (!slug) {
    const categoriesWithCount = categories.map((cat) => ({
      ...cat,
      count: products.filter(
        (p) =>
          normalizeCategory(p.primaryCategory) === cat.slug ||
          normalizeCategory(p.category) === cat.slug
      ).length
    }));

    return (
      <div className="categories-page-view">
        <PageTitle
          title="Browse All Categories 🐾"
          subtitle="From nutrient-dense food and cozy beds to lovable companions and training accessories."
          breadcrumbs={[{ label: "Categories" }]}
        />
        <div className="container py-10">
          <div className="category-grid-10">
            {categoriesWithCount.map((cat) => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const normSlug = normalizeCategory(slug);

  // Find matched category object
  const currentCategory = categories.find(
    (c) => normalizeCategory(c.slug) === normSlug || normalizeCategory(c.name) === normSlug
  );

  const categoryName = currentCategory ? currentCategory.name : String(slug).replaceAll("-", " ");

  // Matching products
  const matchingProducts = products
    .filter(
      (p) =>
        normalizeCategory(p.primaryCategory) === normSlug ||
        normalizeCategory(p.category) === normSlug
    )
    .sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;
      if (sortBy === "price-high") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  return (
    <div className="category-detail-view">
      <PageTitle
        title={`${categoryName} Collection`}
        subtitle={currentCategory?.description || `Explore our high-quality ${categoryName} selections.`}
        breadcrumbs={[
          { label: "Categories", link: "/categories" },
          { label: categoryName }
        ]}
      />

      <div className="container py-8">
        <div className="category-top-bar">
          <Link to="/categories" className="back-link-btn">
            <ArrowLeft size={16} /> All Categories
          </Link>

          <div className="sort-box">
            <span>Sort by:</span>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Display Matching Products */}
        {matchingProducts.length > 0 && (
          <div className="category-section-block">
            <div className="section-head-simple">
              <h3>
                <Package size={20} /> {categoryName} Products & Supplies ({matchingProducts.length})
              </h3>
              <p>Top-rated nutrition, equipment, and comfort gear.</p>
            </div>
            <div className="pm-grid-4 mt-6">
              {matchingProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          </div>
        )}

        {/* If neither found */}
        {matchingProducts.length === 0 && (
          <Empty
            icon="🐾"
            title={`No items currently in ${categoryName}`}
            description="We are regularly restocking this category. Check out our other popular pet essentials!"
            actionText="Browse All Categories"
            actionLink="/categories"
            secondaryText="Back to Home"
            secondaryLink="/"
          />
        )}
      </div>
    </div>
  );
}
