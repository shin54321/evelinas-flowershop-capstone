
import products from "../../data/products";

const galleryData = [
    {
        id: "post-1",
        customerName: "Sofia D.",
        caption: "My anniversary surprise turned out so beautiful! 💗",
        productId: 2,
        image: products.find((product) => product.id === 2)?.image,
        featured: true,
        likes: 28,
        liked: false,
        createdAt: "2026-10-08T10:00:00.000Z",
        comments: [
            {
                id: "comment-1",
                customerName: "Maria L.",
                text: "Such a beautiful bouquet! ❤️",
            },
            {
                id: "comment-2",
                customerName: "James T.",
                text: "Perfect for an anniversary!",
            },
        ],
    },
    {
        id: "post-2",
        customerName: "Isabelle F.",
        caption: "Bright flowers to make someone's day sunnier! 🌻",
        productId: 3,
        image: products.find((product) => product.id === 3)?.image,
        featured: true,
        likes: 18,
        liked: false,
        createdAt: "2026-10-07T08:00:00.000Z",
        comments: [],
    },
    {
        id: "post-3",
        customerName: "Priya M.",
        caption: "Still gorgeous days later. 🌸",
        productId: 1,
        image: products.find((product) => product.id === 1)?.image,
        featured: true,
        likes: 28,
        liked: false,
        createdAt: "2026-10-06T05:00:00.000Z",
        comments: [],
    },
    {
        id: "post-4",
        customerName: "Lucas P.",
        caption: "A colorful bouquet for a very special day! 🌷",
        productId: 7,
        image: products.find((product) => product.id === 7)?.image,
        featured: true,
        likes: 12,
        liked: false,
        createdAt: "2026-10-05T06:00:00.000Z",
        comments: [],
    },
];

export default galleryData;
