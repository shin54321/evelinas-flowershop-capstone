import orchidImg from "../assets/images/products/orchid.jpg";
import rosebouquetImg from "../assets/images/products/rose-bouquet.jpg";
import sunflowerbouquetImg from "../assets/images/products/sunflower-bouquet.jpg";
import tulipImg from "../assets/images/products/tulip.jpg";
import tulip_bouquetImg from "../assets/images/products/tulip-bouquet.jpg";
import gerbera_bouquetImg from "../assets/images/products/gerbera-bouquet.jpg";
import carnation_bouquetImg from "../assets/images/products/carnation-bouquet.jpg";

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

        badge: "Best Seller",

        customerPhotos: [
            {
                id: 1,
                customerName: "Isabelle F.",
                date: "May 28, 2026",
                image: orchidImg
            },

            {
                id: 2,
                customerName: "Maria L.",
                date: "June 2, 2026",
                image: rosebouquetImg
            }
        ],
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
            "Valentine's Day",
            "Wedding"
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
            "Wedding"
        ],

        colors: [
            "Red",
            "White",
            "Pink",
            "Yellow"
        ],

        inStock: true,

        badge: "Best Seller"
    },

    {
        id: 5,
        slug: "/catalog/gerbera_bouquet",
        name: "Gerbera Bouquet",
        image: gerbera_bouquetImg,
        price: 300,

        description: "Bright and cheerful gerbera daisies that bring color and happiness to any occasion.",

        averageRating: 4.0,
        reviewCount: 12,
        totalSales: 35,

        flowerTypes: [
            "Gerbera"
        ],

        occasions: [
            "Birthday",
            "Graduation",
            "Thank You",
            "Get Well"
        ],

        colors: [
            "Pink",
            "Red",
            "Orange",
            "Yellow",
            "White"
        ],

        inStock: true
    },
    {
        id: 6,
        slug: "/catalog/carnation_bouquet",
        name: "Carnation Bouquet",
        image: carnation_bouquetImg,
        price: 280,

        description: "A lovely arrangement of carnations, perfect for expressing appreciation, care, and affection.",

        averageRating: 3.8,
        reviewCount: 8,
        totalSales: 20,

        flowerTypes: [
            "Carnation"
        ],

        occasions: [
            "Birthday",
            "Anniversary",
            "Thank You",
            "Mother's Day",
            "Wedding"
        ],

        colors: [
            "Pink",
            "Red",
            "White",
            "Yellow"
        ],

        inStock: true
    },
    {
        id: 7,
        slug: "/catalog/tulip_bouquet",
        name: "Tulip Bouquet",
        image: tulip_bouquetImg,
        price: 280,

        description: "A lovely arrangement of tulips, perfect for expressing appreciation, care, and affection.",

        averageRating: 4.0,
        reviewCount: 8,
        totalSales: 20,

        flowerTypes: [
            "Tulip"
        ],

        occasions: [
            "Birthday",
            "Anniversary",
            "Thank You",
            "Mother's Day",
            "Valentines",
            "Wedding"
        ],

        colors: [
            "Pink",
            "Red",
            "White",
            "Yellow"
        ],

        inStock: true
    }
    
];

export default products;