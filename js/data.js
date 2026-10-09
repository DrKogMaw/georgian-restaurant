/**
 * Tbilisi Hearth (თბილისური კერა) - Restaurant Configuration & Data Store
 * Developer Friendly Data Structure:
 * All content, menu items, gallery images, prices, wine list, and contact details 
 * are organized here for seamless customization or API backend integration.
 */

export const restaurantData = {
  info: {
    name: "Tbilisi Hearth",
    georgianName: "თბილისური კერა",
    tagline: "Authentic Woodfire & Clay Oven Georgian Culinary Heritage",
    heroHeadline: "Where Every Guest is a Gift From God",
    heroSubheadline: "Experience the timeless warmth of authentic Georgian Supra feasts, wood-fired clay oven breads, and UNESCO-honored 8,000-year-old Qvevri winemaking traditions.",
    address: "18 Shota Rustaveli Avenue, Old Tbilisi, Georgia",
    phone: "+995 32 299 8877",
    email: "stumari@tbilisihearth.ge",
    hours: {
      weekday: "Monday - Thursday: 12:00 PM - 11:30 PM",
      weekend: "Friday - Sunday: 11:00 AM - 01:00 AM"
    },
    stats: [
      { number: "8,000+", label: "Years of Winemaking History" },
      { number: "100%", label: "Authentic Clay Oven Hearth" },
      { number: "4.9 ★", label: "Over 2,400 Traveler Reviews" },
      { number: "50+", label: "Artisanal Qvevri Wines" }
    ],
    socialLinks: {
      instagram: "https://instagram.com",
      facebook: "https://facebook.com",
      tripadvisor: "https://tripadvisor.com"
    }
  },

  categories: [
    { id: "all", name: "All Specialties", nameGe: "ყველა", icon: "sparkles" },
    { id: "khachapuri", name: "Khachapuri & Breads", nameGe: "ხაჭაპური", icon: "sandwich" },
    { id: "khinkali", name: "Khinkali Dumplings", nameGe: "ხინკალი", icon: "utensils" },
    { id: "starters", name: "Cold Starters & Pkhali", nameGe: "ფხალეული", icon: "salad" },
    { id: "mains", name: "Mtsvadi & Hot Mains", nameGe: "მწვადი", icon: "flame" },
    { id: "soups", name: "Hearty Soups", nameGe: "წვნიანი", icon: "soup" },
    { id: "desserts", name: "Georgian Sweets", nameGe: "დესერტი", icon: "cookie" },
    { id: "wines", name: "Qvevri Wines & Cellar", nameGe: "ღვინო", icon: "wine" }
  ],

  dietaryTags: [
    "Chef Special",
    "Vegetarian",
    "Vegan",
    "Spicy",
    "Woodfired Clay Oven",
    "Organic Qvevri"
  ],

  menuItems: [
    {
      id: "khachapuri-adjaruli",
      name: "Khachapuri Adjaruli",
      nameGe: "აჭარული ხაჭაპური",
      category: "khachapuri",
      price: 18.50,
      description: "Classic boat-shaped bread freshly baked in our wood-fired clay oven, filled with rich melted Sulguni and Imeretian cheeses, topped with a fresh farm egg yolk and creamy butter knob.",
      ingredients: ["Sulguni Cheese", "Imeretian Cheese", "Organic Egg Yolk", "Farm Butter", "Hand-kneaded Dough"],
      image: "images/khachapuri_adjaruli.jpg",
      spicy: 0,
      prepTime: "15-20 min",
      tags: ["Chef Special", "Vegetarian", "Woodfired Clay Oven"],
      history: "Hailing from the coastal Adjara region, the boat shape represents a ship sailing on the Black Sea, while the egg yolk represents the sun setting over the blue waves."
    },
    {
      id: "khinkali-kalakuri",
      name: "Khinkali Kalakuri (5 pcs)",
      nameGe: "ქალაქური ხინკალი",
      category: "khinkali",
      price: 14.50,
      description: "Traditional hand-pleated mountain dumplings stuffed with minced pork and beef, fresh wild cilantro, black pepper, and rich aromatic meat broth sealed inside.",
      ingredients: ["Pork & Beef Blend", "Cilantro", "Caraway", "Garlic", "Rich Meat Broth"],
      image: "images/khinkali.jpg",
      spicy: 1,
      prepTime: "20 min",
      tags: ["Chef Special", "Spicy"],
      history: "Originating in the high Caucasus mountains of Mtiuleti, these dumplings were created to sustain warriors with nutrient-rich broth during harsh winters."
    },
    {
      id: "mtsvadi-kakhetian",
      name: "Kakhetian Pork Mtsvadi",
      nameGe: "კახური მწვადი",
      category: "mains",
      price: 28.00,
      description: "Tender pork shoulder skewered and flame-grilled over dried grapevine embers, garnished with thin sliced purple onions, sumac, and fresh pomegranate seeds.",
      ingredients: ["Pork Shoulder", "Grapevine Embers", "Purple Onions", "Pomegranate Seeds", "Tkemali Plum Sauce"],
      image: "images/mtsvadi.jpg",
      spicy: 0,
      prepTime: "25 min",
      tags: ["Chef Special", "Woodfired Clay Oven"],
      history: "In Kakheti, Georgia's winemaking heartland, burning dry grapevine wood coals imparts a distinct fruity smoke aroma to grilled skewers."
    },
    {
      id: "badrijani-nigvzit",
      name: "Badrijani Nigvzit",
      nameGe: "ბადრიჯანი ნიგვზით",
      category: "starters",
      price: 16.00,
      description: "Golden pan-roasted eggplant rolls stuffed with a silky paste of crushed Kakhetian walnuts, garlic, blue fenugreek, dried marigold, and cilantro, crowned with ruby pomegranate.",
      ingredients: ["Roasted Eggplant", "Georgian Walnut Paste", "Blue Fenugreek", "Marigold Petals", "Pomegranate"],
      image: "images/badrijani.jpg",
      spicy: 0,
      prepTime: "10 min",
      tags: ["Vegetarian", "Vegan"],
      history: "An indispensable crown starter of every Georgian Supra (feast), balancing savory garlic warmth with fragrant mountain herbs."
    },
    {
      id: "pkhali-trio",
      name: "Heritage Pkhali Trio",
      nameGe: "ფხალის ასორტი",
      category: "starters",
      price: 17.50,
      description: "Vibrant trio of artisanal vegetable pâtés: wild mountain spinach, sweet beetroot, and green bean, finely ground with walnuts, garlic, Georgian spices, and cider vinegar.",
      ingredients: ["Spinach", "Beetroot", "Green Beans", "Crushed Walnuts", "Garlic", "Georgian Spices"],
      image: "images/pkhali.jpg",
      spicy: 1,
      prepTime: "10 min",
      tags: ["Vegetarian", "Vegan"],
      history: "Pkhali is one of Georgia's oldest culinary creations, reflecting thousands of years of plant-based Caucasus mountain nourishment."
    },
    {
      id: "soup-kharcho",
      name: "Traditional Beef Kharcho",
      nameGe: "ხარჩო",
      category: "soups",
      price: 19.00,
      description: "Rich, slow-simmered beef soup featuring short-grain rice, ground Kakhetian walnuts, sour Tklapi plum paste, fresh cilantro, and aromatic Georgian Khmeli-Suneli spices.",
      ingredients: ["Slow-braised Beef", "Ground Walnuts", "Tklapi Plum Paste", "Rice", "Cilantro", "Utskho Suneli"],
      image: "images/kharcho.jpg",
      spicy: 2,
      prepTime: "15 min",
      tags: ["Spicy", "Chef Special"],
      history: "A legendary Megrelian dish loved across the country for its exhilarating blend of sour plum tartness, walnut richness, and spicy warmth."
    },
    {
      id: "pelamushi-churchkhela",
      name: "Pelamushi & Churchkhela Feast",
      nameGe: "ფელამუში & ჩურჩხელა",
      category: "desserts",
      price: 14.00,
      description: "Silky chilled grape juice pudding (Pelamushi) sprinkled with toasted walnuts, paired with handmade candle-shaped Churchkhela walnut strings dipped in Saperavi grape reduction.",
      ingredients: ["Condensed Badagi Grape Juice", "Walnuts", "Whole Wheat Flour", "Wild Mountain Honey"],
      image: "images/desserts.jpg",
      spicy: 0,
      prepTime: "5 min",
      tags: ["Vegetarian", "Vegan"],
      history: "Churchkhela was historically carried by Georgian warriors into battle as a high-calorie, long-lasting natural superfood."
    },
    {
      id: "wine-saperavi-qvevri",
      name: "Reserve Saperavi Qvevri 2021",
      nameGe: "საფერავი ქვევრი 2021",
      category: "wines",
      price: 65.00,
      description: "Deep garnet dry red wine fermented and aged in underground clay Qvevri vessels with skins for 12 months. Intense notes of dark blackberry, wild cherry, smoke, leather, and velvety tannins.",
      ingredients: ["100% Kakhetian Saperavi Grapes", "Zero Additives", "Unfiltered Qvevri Fermentation"],
      image: "images/saperavi_wine.jpg",
      spicy: 0,
      prepTime: "Instant",
      tags: ["Chef Special", "Organic Qvevri"],
      history: "Saperavi means 'to dye' in Georgian, referring to its rich dark red juice and skin that gives Qvevri wine its legendary depth."
    }
  ],

  ambianceGallery: [
    {
      id: "main-hall",
      title: "Fireplace Main Dining Hall",
      titleGe: "მთავარი დარბაზი",
      category: "Interior",
      image: "images/place_main_hall.jpg",
      description: "Warm stone archways, open roaring hearth fireplace, handwoven Caucasian rugs, and candlelit wooden tables."
    },
    {
      id: "wine-cellar",
      title: "Subterranean Marani Wine Cellar",
      titleGe: "ისტორიული მარანი",
      category: "Wine Cellar",
      image: "images/place_wine_cellar.jpg",
      description: "Our historic cellar storing 40+ clay Qvevri vessels buried deep in subterranean clay soil for natural temperature control."
    },
    {
      id: "garden-terrace",
      title: "Twilight Garden Terrace",
      titleGe: "ღია ტერასა",
      category: "Outdoor",
      image: "images/place_terrace.jpg",
      description: "Enchanting outdoor terrace under grapevine arbors and warm string lights overlooking Old Tbilisi's historic skyline."
    }
  ],

  seatingZones: [
    { id: "main-hall", name: "Main Fireplace Dining Room", desc: "Warm cozy atmosphere by the wood-burning stone fireplace." },
    { id: "marani", name: "Historic Qvevri Wine Cellar", desc: "Intimate subterranean dining amongst ancient wine vessels." },
    { id: "terrace", name: "Outdoor Garden Terrace", desc: "Romantic outdoor seating under grapevine arbors with city views." }
  ],

  reviews: [
    {
      id: 1,
      author: "Sophia & Daniel",
      role: "International Food Critics",
      rating: 5,
      comment: "The Adjaruli Khachapuri here is single-handedly the best we have tasted outside of Batumi! The Qvevri Saperavi paired with Mtsvadi was unforgettable.",
      date: "August 2026"
    },
    {
      id: 2,
      author: "Giorgi Beridze",
      role: "Tbilisi Culinary Guide",
      rating: 5,
      comment: "Authentic Georgian hospitality at its finest. The rich broth inside the Khinkali Kalakuri is cooked to perfection. Felt like dining at a family Supra in Kakheti.",
      date: "July 2026"
    },
    {
      id: 3,
      author: "Charlotte & Mark",
      role: "Travel Bloggers",
      rating: 5,
      comment: "The subterranean Marani wine cellar tour before dinner was the highlight of our trip to Tbilisi. Highly recommend reserving a spot on the terrace!",
      date: "August 2026"
    }
  ]
};
