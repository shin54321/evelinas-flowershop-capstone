
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import products from "../../data/products";

import CatalogControls from "../../components/Catalog/CatalogControls/CatalogControls";
import CatalogFilters from "../../components/Catalog/CatalogFilters/CatalogFilters";
import CatalogGrid from "../../components/Catalog/CatalogGrid";

import "./Catalog.css";

function Catalog() {
    const [searchParams, setSearchParams] = useSearchParams();

    // Initialize search from the URL
    const [searchTerm, setSearchTerm] = useState(
        () => searchParams.get("search") || ""
    );

    const [sortOption, setSortOption] = useState("popular");

    // Read the selected category from the URL
    const [selectedCategories, setSelectedCategories] = useState(() => {
        const category = searchParams.get("category");
        return category ? [category] : [];
    });

    // Read the selected occasion from the URL
    const [selectedOccasions, setSelectedOccasions] = useState(() => {
        const occasion = searchParams.get("occasion");
        return occasion ? [occasion] : [];
    });

    const [priceRange, setPriceRange] = useState(1500);
    
    /* =========================
       FILTER PRODUCTS
    ========================== */

    const filteredProducts = useMemo(() => {
        let result = [...products];

        // Search
        if (searchTerm.trim() !== "") {
            const search = searchTerm.trim().toLowerCase();

            result = result.filter((product) => {
                return (
                    product.name?.toLowerCase().includes(search) ||
                    product.description?.toLowerCase().includes(search) ||
                    product.flowerTypes?.some((type) =>
                        type.toLowerCase().includes(search)
                    ) ||
                    product.occasions?.some((occasion) =>
                        occasion.toLowerCase().includes(search)
                    )
                );
            });
        }

        // Category
        if (selectedCategories.length > 0) {
            result = result.filter((product) =>
                product.flowerTypes?.some((type) =>
                    selectedCategories.includes(type)
                )
            );
        }

        // Occasion
        if (selectedOccasions.length > 0) {
            result = result.filter((product) =>
                product.occasions?.some((occasion) =>
                    selectedOccasions.includes(occasion)
                )
            );
        }

        // Price
        result = result.filter(
            (product) => product.price <= priceRange
        );

        // Sorting
        if (sortOption === "popular") {
            result.sort(
                (a, b) => (b.totalSales || 0) - (a.totalSales || 0)
            );
        }

        if (sortOption === "price-low") {
            result.sort((a, b) => a.price - b.price);
        }

        if (sortOption === "price-high") {
            result.sort((a, b) => b.price - a.price);
        }

        if (sortOption === "rating") {
            result.sort(
                (a, b) =>
                    (b.averageRating || 0) -
                    (a.averageRating || 0)
            );
        }

        return result;
    }, [
        searchTerm,
        sortOption,
        selectedCategories,
        selectedOccasions,
        priceRange
    ]);

    /* =========================
       CLEAR FILTERS
    ========================== */

    const handleClearFilters = () => {
        setSelectedCategories([]);
        setSelectedOccasions([]);
        setPriceRange(1500);
        setSearchTerm("");
        setSortOption("popular");

        setSearchParams({});
    };

    return (
        <main className="catalog-page">
            {/* CONTROLS */}
            <CatalogControls
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                sortOption={sortOption}
                setSortOption={setSortOption}
            />

            {/* CATALOG CONTENT */}
            <section className="catalog-content">
                <div className="container-lg">
                    <div className="catalog-layout">

                        {/* FILTER SIDEBAR */}
                        <CatalogFilters
                            selectedCategories={selectedCategories}
                            setSelectedCategories={setSelectedCategories}
                            selectedOccasions={selectedOccasions}
                            setSelectedOccasions={setSelectedOccasions}
                            priceRange={priceRange}
                            setPriceRange={setPriceRange}
                            onClearFilters={handleClearFilters}
                        />

                        {/* PRODUCTS */}
                        <div className="catalog-products">
                            <div className="catalog-results-count">
                                Showing{" "}
                                <strong>{filteredProducts.length}</strong>{" "}
                                of {products.length} bouquets
                            </div>

                            <CatalogGrid products={filteredProducts} />
                        </div>

                    </div>
                </div>
            </section>
        </main>
    );
}

export default Catalog;
