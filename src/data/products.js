import orchidImg from "../assets/images/products/orchid.jpg";
import rosebouquetImg from "../assets/images/products/rose-bouquet.jpg";
import sunflowerbouquetImg from "../assets/images/products/sunflower-bouquet.jpg";
import tulipImg from "../assets/images/products/tulip.jpg";

const products = [
    {
        id: 1,
        slug: "/catalog/orchid",
        name: "Orchid",
        image: orchidImg,
        price: 250,

        description: "Sophisticated orchids for the discerning flower lover. Exotic and long-lasting beauty.",

        averageRating: 4.5,
        reviewCount: 55,
        totalSales: 200,

        flowerTypes: [
            "Orchid"
        ],

        occasions: [
            "Anniversary",
            "Romance",
            "Valentine's Day",
            "Birthday"
        ],

        colors: [
            "Violet",
            "White"
        ],

        inStock: true,

        badge: "Best Seller"
    },

    {
        id: 2,
        slug: "/catalog/classic-rose-bouquet",
        name: "Classic Rose Bouquet",
        image: rosebouquetImg,
        price: 350,

        description: "Timeless red roses arranged to perfection. The ultimate symbol of love and passion.",

        averageRating: 4.8,
        reviewCount: 50,
        totalSales: 150,

        flowerTypes: [
            "Rose"
        ],

        occasions: [
            "Anniversary",
            "Romance",
            "Valentine's Day"
        ],

        colors: [
            "Red",
            "White"
        ],

        inStock: true,

        badge: "Best Seller"
    },

    {
        id: 3,
        slug: "/catalog/classic-sunflower-bouquet",
        name: "Classic Sunflower Bouquet",
        image: sunflowerbouquetImg,
        price: 350,

        description: "Bright and cheerful sunflowers that bring a smile to any occasion.",

        averageRating: 4.9,
        reviewCount: 100,
        totalSales: 350,

        flowerTypes: [
            "Sunflower",
            "Baby's Breath"
        ],

        occasions: [
            "Anniversary",
            "Romance",
            "Valentine's Day",
            "Birthday",
            "Graduation"
        ],

        colors: [
            "Yellow",
            "White"
        ],

        inStock: true,

        badge: "Best Seller"
    },

    {
        id: 4,
        slug: "/catalog/tulip",
        name: "Tulip",
        image: tulipImg,
        price: 350,

        description: "Elegant tulips in a variety of colors, perfect for any special occasion.",

        averageRating: 4.7,
        reviewCount: 70,
        totalSales: 285,

        flowerTypes: [
            "Tulip"
        ],

        occasions: [
            "Anniversary",
            "Romance",
            "Valentine's Day",
            "Birthday",
            "Graduation"
        ],

        colors: [
            "Red",
            "White",
            "Pink",
            "Yellow"
        ],

        inStock: true,

        badge: "Best Seller"
    }
];

export default products;