import roseIcon from "../assets/icons/categories/rose.svg";
import tulipIcon from "../assets/icons/categories/tulip.svg";
import sunflowerIcon from "../assets/icons/categories/sunflower.svg";
import orchidIcon from "../assets/icons/categories/orchid.svg";
import mixedIcon from "../assets/icons/categories/mixed.svg";
import lilyIcon from "../assets/icons/categories/lily.svg";


const categories = [
    {
        id: 1,
        name: "Roses",
        icon: roseIcon,
        theme: "pink",
        route: "/catalog?category=Rose"
    },
    {
        id: 2,
        name: "Tulips",
        icon: tulipIcon,
        theme: "purple",
        route: "/catalog?category=Tulip"
    },
    {
        id: 3,
        name: "Sunflowers",
        icon: sunflowerIcon,
        theme: "orange",
        route: "/catalog?category=Sunflower"
    },
    {
        id: 4,
        name: "Orchids",
        icon: orchidIcon,
        theme: "pinkgradient",
        route: "/catalog?category=Orchid"
    },
    {
        id: 5,
        name: "Mixed",
        icon: mixedIcon,
        theme: "gradient",
        route: "/catalog?category=Mixed"
    },
    {
        id: 6,
        name: "Lilies",
        icon: lilyIcon,
        theme: "purple",
        route: "/catalog?category=Lily"
    }
];

export default categories;