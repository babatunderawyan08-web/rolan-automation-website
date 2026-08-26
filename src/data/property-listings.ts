export type ListingType = "buy" | "rent";
export type PropertyKind = "Apartment" | "House" | "Villa" | "Loft" | "Studio" | "Townhouse";

export type PropertyAgent = {
  name: string;
  agency: string;
  phone: string;
  email: string;
};

export type PropertyListing = {
  id: string;
  title: string;
  location: string;
  address: string;
  listingType: ListingType;
  propertyType: PropertyKind;
  price: number;
  beds: number;
  baths: number;
  area: number;
  description: string;
  amenities: string[];
  agent: PropertyAgent;
  images: string[];
};

const NOAH: PropertyAgent = {
  name: "Noah Blake",
  agency: "Harbor Realty",
  phone: "+1 312 555 0144",
  email: "noah@harborrealty.demo",
};

const SOFIA: PropertyAgent = {
  name: "Sofia Lane",
  agency: "East Quay Homes",
  phone: "+1 312 555 0198",
  email: "sofia@eastquay.demo",
};

const MARCO: PropertyAgent = {
  name: "Marco Voss",
  agency: "Canal & Co",
  phone: "+1 312 555 0162",
  email: "marco@canalandco.demo",
};

const PRIYA: PropertyAgent = {
  name: "Priya Shah",
  agency: "Hillside Estates",
  phone: "+1 312 555 0117",
  email: "priya@hillside.demo",
};

export const PROPERTY_LOCATIONS = [
  "River North",
  "East Quay",
  "Hillside",
  "Canal District",
  "Harbor Park",
  "Maple Grove",
  "West End",
] as const;

export const PROPERTY_KINDS: PropertyKind[] = [
  "Apartment",
  "House",
  "Villa",
  "Loft",
  "Studio",
  "Townhouse",
];

export const PROPERTY_LISTINGS: PropertyListing[] = [
  {
    id: "harbor-lofts-4b",
    title: "Harbor Lofts 4B",
    location: "River North",
    address: "418 W Hubbard Street, River North",
    listingType: "buy",
    propertyType: "Apartment",
    price: 1240000,
    beds: 3,
    baths: 2,
    area: 1840,
    description:
      "A river-facing apartment with full-height windows, a chef’s kitchen, and a private balcony over the water. The building has a doorman, a residents’ lounge, and underground parking.",
    amenities: ["River views", "Doorman", "Parking", "Balcony", "Gym", "Concierge"],
    agent: NOAH,
    images: ["/images/listings/p04.jpg", "/images/listings/p07.jpg", "/images/listings/p03.jpg"],
  },
  {
    id: "maple-court-12a",
    title: "Maple Court 12A",
    location: "East Quay",
    address: "12 Maple Court, East Quay",
    listingType: "buy",
    propertyType: "Apartment",
    price: 640000,
    beds: 2,
    baths: 1,
    area: 920,
    description:
      "A bright two-bedroom with oak floors, a renovated bath, and a quiet courtyard aspect. A short walk to the quay, cafés, and the weekend market.",
    amenities: ["Courtyard", "Renovated kitchen", "Storage", "Bike room", "Near transit"],
    agent: SOFIA,
    images: ["/images/listings/p05.jpg", "/images/listings/p08.jpg", "/images/listings/p12.jpg"],
  },
  {
    id: "cedar-villa",
    title: "Cedar Villa",
    location: "Hillside",
    address: "9 Cedar Ridge, Hillside",
    listingType: "buy",
    propertyType: "Villa",
    price: 2100000,
    beds: 5,
    baths: 4,
    area: 4120,
    description:
      "A gated villa on a double lot with a pool, a covered terrace, and a separate guest suite. Interiors are stone and timber, with a double-height living room.",
    amenities: ["Pool", "Guest suite", "Garage", "Garden", "Wine room", "Smart home"],
    agent: PRIYA,
    images: ["/images/listings/p01.jpg", "/images/listings/p14.jpg", "/images/listings/p13.jpg"],
  },
  {
    id: "river-studio",
    title: "River Studio",
    location: "Canal District",
    address: "88 Canal Walk, Canal District",
    listingType: "buy",
    propertyType: "Studio",
    price: 415000,
    beds: 1,
    baths: 1,
    area: 610,
    description:
      "An efficient studio with a sleeping alcove, built-in storage, and canal light all afternoon. Ideal as a first home or a lock-up pied-à-terre.",
    amenities: ["Canal light", "Built-in storage", "Laundry in building", "Roof deck"],
    agent: MARCO,
    images: ["/images/listings/p08.jpg", "/images/listings/p12.jpg", "/images/listings/p05.jpg"],
  },
  {
    id: "oak-townhouse",
    title: "Oak Townhouse",
    location: "Maple Grove",
    address: "27 Oak Row, Maple Grove",
    listingType: "buy",
    propertyType: "Townhouse",
    price: 875000,
    beds: 3,
    baths: 3,
    area: 1620,
    description:
      "A three-storey townhouse with a private rear garden and a garage. The ground floor is open-plan; the top floor is a quiet primary suite.",
    amenities: ["Private garden", "Garage", "Fireplace", "Primary suite", "Near schools"],
    agent: SOFIA,
    images: ["/images/listings/p09.jpg", "/images/listings/p10.jpg", "/images/listings/p02.jpg"],
  },
  {
    id: "west-end-house",
    title: "West End House",
    location: "West End",
    address: "140 West End Avenue",
    listingType: "buy",
    propertyType: "House",
    price: 1050000,
    beds: 4,
    baths: 3,
    area: 2280,
    description:
      "A detached family house with a south garden, a dedicated office, and a recently replaced roof. Walking distance to the park and the high street.",
    amenities: ["Garden", "Home office", "Parking", "Updated roof", "Family kitchen"],
    agent: PRIYA,
    images: ["/images/listings/p10.jpg", "/images/listings/p09.jpg", "/images/listings/p15.jpg"],
  },
  {
    id: "skyline-loft",
    title: "Skyline Loft",
    location: "River North",
    address: "600 N Franklin, River North",
    listingType: "buy",
    propertyType: "Loft",
    price: 790000,
    beds: 2,
    baths: 2,
    area: 1400,
    description:
      "A converted warehouse loft with exposed brick, steel windows, and a mezzanine studio. The building has freight-style lifts and a shared roof terrace.",
    amenities: ["Exposed brick", "Roof terrace", "High ceilings", "Artist studio", "Elevator"],
    agent: NOAH,
    images: ["/images/listings/p07.jpg", "/images/listings/p03.jpg", "/images/listings/p04.jpg"],
  },
  {
    id: "quay-one-bed",
    title: "Quay One-Bed",
    location: "East Quay",
    address: "3 Quay Lane, East Quay",
    listingType: "rent",
    propertyType: "Apartment",
    price: 2800,
    beds: 1,
    baths: 1,
    area: 720,
    description:
      "A furnished one-bedroom rental facing the marina. Includes utilities, building Wi-Fi, and access to the shared gym. Available immediately.",
    amenities: ["Furnished", "Utilities included", "Gym", "Marina view", "Pets considered"],
    agent: SOFIA,
    images: ["/images/listings/p12.jpg", "/images/listings/p05.jpg", "/images/listings/p08.jpg"],
  },
  {
    id: "harbor-park-duplex",
    title: "Harbor Park Duplex",
    location: "Harbor Park",
    address: "19 Harbor Park Drive",
    listingType: "rent",
    propertyType: "Townhouse",
    price: 4200,
    beds: 3,
    baths: 2,
    area: 1550,
    description:
      "A duplex rental with its own entrance, a small terrace, and two allocated parking spaces. Family-friendly street near the waterfront path.",
    amenities: ["Private entrance", "Terrace", "Two parking spaces", "Washer-dryer", "Pet friendly"],
    agent: NOAH,
    images: ["/images/listings/p02.jpg", "/images/listings/p15.jpg", "/images/listings/p09.jpg"],
  },
  {
    id: "hillside-cottage",
    title: "Hillside Cottage",
    location: "Hillside",
    address: "44 Ridge Lane, Hillside",
    listingType: "rent",
    propertyType: "House",
    price: 3500,
    beds: 2,
    baths: 2,
    area: 1180,
    description:
      "A two-bedroom cottage on a quiet lane, with a wood-burning stove and a fenced garden. Unfurnished, twelve-month term preferred.",
    amenities: ["Garden", "Wood stove", "Quiet lane", "Unfurnished", "Street parking"],
    agent: PRIYA,
    images: ["/images/listings/p15.jpg", "/images/listings/p10.jpg", "/images/listings/p13.jpg"],
  },
  {
    id: "canal-penthouse",
    title: "Canal Penthouse",
    location: "Canal District",
    address: "1 Lock House, Canal District",
    listingType: "rent",
    propertyType: "Apartment",
    price: 8500,
    beds: 3,
    baths: 2,
    area: 2100,
    description:
      "A penthouse rental with a wraparound terrace, a chef’s kitchen, and canal views on three sides. Concierge, underground parking, and a private lift lobby.",
    amenities: ["Terrace", "Concierge", "Parking", "Private lift", "Canal views", "Air conditioning"],
    agent: MARCO,
    images: ["/images/listings/p13.jpg", "/images/listings/p14.jpg", "/images/listings/p11.jpg"],
  },
  {
    id: "grove-studio-let",
    title: "Studio on Grove",
    location: "Maple Grove",
    address: "5 Grove Mews, Maple Grove",
    listingType: "rent",
    propertyType: "Studio",
    price: 1850,
    beds: 1,
    baths: 1,
    area: 480,
    description:
      "A compact studio let above a bookshop, with a new kitchenette and a Juliet balcony. Bills except council tax are included.",
    amenities: ["Bills included", "Juliet balcony", "New kitchenette", "Central location"],
    agent: MARCO,
    images: ["/images/listings/p08.jpg", "/images/listings/p07.jpg", "/images/listings/p12.jpg"],
  },
];

export function formatListingPrice(listing: PropertyListing) {
  const formatted = listing.price.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  return listing.listingType === "rent" ? `${formatted}/mo` : formatted;
}

export function getListingById(id: string) {
  return PROPERTY_LISTINGS.find((listing) => listing.id === id);
}
