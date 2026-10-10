import "./CatalogControls.css";

function CatalogControls({
    searchTerm,
    setSearchTerm,
    sortOption,
    setSortOption
}) {
    return (
        <section className="catalog-controls">

            <div className="container-lg">

                <div className="catalog-controls-row">

                    {/* =========================
                        SEARCH
                    ========================== */}

                    <div className="catalog-search">

                        <i className="bi bi-search"></i>

                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) =>
                                setSearchTerm(e.target.value)
                            }
                            placeholder="Search bouquets, flowers, occasions..."
                        />

                    </div>


                    {/* =========================
                        SORT
                    ========================== */}

                    <div className="catalog-sort">

                        <select
                            value={sortOption}
                            onChange={(e) =>
                                setSortOption(e.target.value)
                            }
                        >
                            <option value="popular">
                                Most Popular
                            </option>

                            <option value="price-low">
                                Price: Low to High
                            </option>

                            <option value="price-high">
                                Price: High to Low
                            </option>

                            <option value="rating">
                                Highest Rated
                            </option>
                        </select>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default CatalogControls;