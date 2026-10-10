import { useState } from "react";
import "./CatalogFilters.css";

function CatalogFilters({
    selectedCategories,
    setSelectedCategories,
    selectedOccasions,
    setSelectedOccasions,
    priceRange,
    setPriceRange,
    onClearFilters
}) {

    const [isFiltersOpen, setIsFiltersOpen] = useState(false);

    const categories = [
        "Rose",
        "Lily",
        "Sunflower",
        "Tulip",
        "Mixed",
        "Orchid",
        "Peony"
    ];

    const occasions = [
        "Birthday",
        "Anniversary",
        "Romance",
        "Valentine's Day",
        "Wedding",
        "Sympathy",
        "Get Well",
        "Thank You",
        "Congratulations",
        "Spring",
        "Mother's Day",
        "Luxury Gift",
        "Corporate"
    ];


    /* =========================
       CATEGORY
    ========================== */

    const handleCategoryChange = (category) => {

        if (selectedCategories.includes(category)) {

            setSelectedCategories(
                selectedCategories.filter((item) => item !== category)
            );
        } else {

            setSelectedCategories([...selectedCategories, category]);
        }
    };


    /* =========================
       OCCASION
    ========================== */

    const handleOccasionChange = (occasion) => {
        if (selectedOccasions.includes(occasion)) {
            setSelectedOccasions(
                selectedOccasions.filter((item) => item !== occasion)
            );
        } else {
            setSelectedOccasions([...selectedOccasions, occasion]);
        }
    };


    return (
        <aside
            className={`catalog-filters ${isFiltersOpen ? "filters-open" : ""}`}
        >
            {/* FILTER HEADER / TOGGLE */}
            <button
                type="button"
                className="filters-header"
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                aria-expanded={isFiltersOpen}
                aria-controls="catalog-filter-content"
            >
                <span className="filters-header-title">
                    <i className="filter-funnel bi bi-funnel"></i>
                    <span>Filters</span>
                </span>

                <i
                    className={`bi ${
                        isFiltersOpen
                            ? "bi-chevron-up"
                            : "bi-chevron-down"
                    } filters-toggle-arrow`}
                ></i>
            </button>

            {/* FILTER CONTENT */}
            <div
                id="catalog-filter-content"
                className="filters-content"
            >
                {/* CATEGORY */}
                <div className="filter-group">
                    <h4>Category</h4>

                    {categories.map((category) => (
                        <label key={category} className="filter-checkbox">
                            <input
                                type="checkbox"
                                checked={selectedCategories.includes(category)}
                                onChange={() => handleCategoryChange(category)}
                            />
                            <span>{category}</span>
                        </label>
                    ))}
                </div>

                {/* OCCASION */}
                <div className="filter-group">
                    <h4>Occasion</h4>

                    {occasions.map((occasion) => (
                        <label key={occasion} className="filter-checkbox">
                            <input
                                type="checkbox"
                                checked={selectedOccasions.includes(occasion)}
                                onChange={() => handleOccasionChange(occasion)}
                            />
                            <span>{occasion}</span>
                        </label>
                    ))}
                </div>

                {/* PRICE */}
                <div className="filter-group">
                    <div className="price-header">
                        <h4>Price</h4>
                        <span>₱100 - ₱{priceRange.toLocaleString("en-PH")}</span>
                    </div>

                    <input
                        type="range"
                        min="100"
                        max="1500"
                        step="50"
                        value={priceRange}
                        onChange={(e) =>
                            setPriceRange(Number(e.target.value))
                        }
                        className="price-range"
                    />
                </div>

                {/* CLEAR FILTERS */}
                <button
                    type="button"
                    className="clear-filters-btn"
                    onClick={onClearFilters}
                >
                    Clear All Filters
                </button>
            </div>
        </aside>
    );
}

export default CatalogFilters;