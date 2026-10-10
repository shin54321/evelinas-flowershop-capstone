
const BUDGETS = {
    under280: { min: 0, max: 279.99 },
    range280to300: { min: 280, max: 300 },
    range301to350: { min: 301, max: 350 },
    noLimit: { min: 0, max: Infinity },
};

const COLOR_GROUPS = {
    pinksReds: ["Pink", "Red"],
    purplesLavender: ["Purple", "Violet", "Lavender"],
    whitesCreams: ["White", "Cream"],
    yellowsOranges: ["Yellow", "Orange"],
    mixedColorful: [
        "Pink", "Red", "Purple", "Violet", "Lavender",
        "White", "Cream", "Yellow", "Orange",
    ],
};

export function getRecommendations(products, answers) {
    const budget = BUDGETS[answers.budget];

    return products
        .filter((product) => product.inStock !== false)
        .map((product) => {
            let score = 0;
            const reasons = [];

            const matchesOccasion = product.occasions?.some(
                (occasion) =>
                    occasion.toLowerCase() ===
                    answers.occasion?.toLowerCase()
            ) ?? false;

            const matchesBudget = budget
                ? product.price >= budget.min &&
                  product.price <= budget.max
                : true;

            const preferredColors = COLOR_GROUPS[answers.palette] || [];

            const matchesColor = product.colors?.some((color) =>
                preferredColors.some(
                    (preferred) =>
                        preferred.toLowerCase() === color.toLowerCase()
                )
            ) ?? false;

            if (matchesOccasion) {
                score += 5;
                reasons.push("Matches your occasion");
            }

            if (matchesBudget) {
                score += 4;
                reasons.push("Fits your budget");
            }

            if (matchesColor) {
                score += 3;
                reasons.push("Matches your preferred colors");
            }

            // Small bonuses for customer ratings and popularity.
            score += (product.averageRating || 0) * 0.2;
            score += Math.min((product.totalSales || 0) / 1000, 0.5);

            if (product.badge === "Best Seller") {
                reasons.push("Best seller");
            }

            if (reasons.length === 0) {
                reasons.push("One of our available bouquets");
            }

            return {
                ...product,
                recommendationScore: score,
                recommendationReasons: reasons,
                matchesOccasion,
                matchesBudget,
                matchesColor,
            };
        })
        .sort(
            (a, b) =>
                b.recommendationScore - a.recommendationScore ||
                (b.averageRating || 0) - (a.averageRating || 0)
        );
}
