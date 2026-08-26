export type ProductSlug =
  | "property"
  | "food"
  | "logistics"
  | "learning"
  | "clinic"
  | "finance";

export type Product = {
  slug: ProductSlug;
  name: string;
  productLine: string;
  tagline: string;
  industry: string;
  demonstrates: string;
  automation: string;
  problem: string;
  solution: string;
  features: string[];
  technologies: string[];
  roles: { title: string; description: string }[];
  workflow: string[];
  screens: string[];
  image: string;
  video?: string | string[];
  accent: string;
  accentSoft: string;
  glow: string;
};

export const PRODUCTS: Product[] = [
  {
    slug: "property",
    name: "Property Platform",
    productLine: "Property Platform",
    tagline: "A premium marketplace for listings, viewings, and agent dashboards.",
    industry: "Real Estate",
    demonstrates: "Marketplace + dashboards",
    automation: "AI property assistant + WhatsApp lead automation",
    problem:
      "Buyers search across listing sites, agents chase enquiries in WhatsApp, and nobody has a single view of what is saved, requested, or qualified.",
    solution:
      "A property platform with search, listing detail, saved homes, viewing requests, and an agent dashboard that turns enquiries into a managed pipeline.",
    features: [
      "Marketplace search and filters",
      "Property detail and saved homes",
      "Viewing request workflow",
      "Agent dashboard and lead capture",
      "AI property assistant + WhatsApp lead automation",
    ],
    technologies: ["Next.js", "Mapbox", "Supabase", "WhatsApp API", "OpenAI"],
    roles: [
      { title: "Buyer", description: "Search, save, and request viewings." },
      { title: "Agent", description: "Qualify leads and manage the pipeline." },
      { title: "AI property assistant", description: "Capture the enquiry, qualify the lead, and start WhatsApp lead automation." },
    ],
    workflow: [
      "Visitor enquiry",
      "AI property assistant",
      "Lead captured",
      "Agent notified",
      "WhatsApp follow-up",
    ],
    screens: ["Marketplace", "Listing", "Saved", "Viewings", "Agent dashboard"],
    image: "/images/products/property.jpg",
    video: "/videos/products/property.mp4",
    accent: "#818CF8",
    accentSoft: "rgba(129, 140, 248, 0.16)",
    glow: "rgba(129, 140, 248, 0.35)",
  },
  {
    slug: "food",
    name: "Food Ordering",
    productLine: "Food Ordering",
    tagline: "An e-commerce food platform with customer, kitchen, and restaurant roles.",
    industry: "Hospitality",
    demonstrates: "E-commerce + multi-role system",
    automation: "AI order assistant + automated notifications",
    problem:
      "Orders arrive by phone and chat, the kitchen has no live queue, and customers cannot see whether food is confirmed, cooking, or out for delivery.",
    solution:
      "A food platform covering menus, cart, checkout, live order tracking, and a restaurant dashboard for kitchen status and sales.",
    features: [
      "E-commerce restaurant and menu browsing",
      "Cart and checkout",
      "Multi-role kitchen and restaurant dashboards",
      "AI order assistant",
      "Automated notifications",
    ],
    technologies: ["Next.js", "Stripe", "Supabase", "Twilio", "OpenAI"],
    roles: [
      { title: "Customer", description: "Browse, order, and track delivery." },
      { title: "Kitchen", description: "Update prep and ready status." },
      { title: "Restaurant", description: "Watch sales and incoming tickets." },
      { title: "AI order assistant", description: "Recommend dishes and help place the order." },
    ],
    workflow: [
      "Customer order",
      "AI order assistant",
      "Restaurant receives order",
      "Kitchen status updates",
      "Automated notifications",
    ],
    screens: ["Discover", "Menu", "Cart", "Tracking", "Kitchen"],
    image: "/images/products/food.jpg",
    video: ["/videos/products/food.mp4", "/videos/products/food-door.mp4"],
    accent: "#FB923C",
    accentSoft: "rgba(251, 146, 60, 0.16)",
    glow: "rgba(251, 146, 60, 0.35)",
  },
  {
    slug: "logistics",
    name: "Logistics Platform",
    productLine: "Logistics Platform",
    tagline: "Shipment tracking and real-time delivery status for live operations.",
    industry: "Logistics",
    demonstrates: "Tracking + real-time status",
    automation: "Automated delivery notifications + AI support",
    problem:
      "Dispatchers work from spreadsheets, drivers update status by call, and customers cannot see where a package actually is.",
    solution:
      "An operations console for creating shipments, assigning drivers, tracking timelines, and notifying customers as status changes.",
    features: [
      "Shipment creation",
      "Package tracking timeline",
      "Real-time delivery status",
      "Automated delivery notifications",
      "AI support",
    ],
    technologies: ["Next.js", "PostgreSQL", "Mapbox", "Twilio", "OpenAI"],
    roles: [
      { title: "Dispatcher", description: "Create jobs and assign drivers." },
      { title: "Driver", description: "Update pickup and drop-off status." },
      { title: "Customer", description: "Follow the delivery timeline." },
      { title: "AI support", description: "Answer tracking questions as status changes." },
    ],
    workflow: [
      "Shipment created",
      "Driver assigned",
      "Real-time status changes",
      "Automated delivery notifications",
      "AI support",
      "Delivery completed",
    ],
    screens: ["Shipments", "Tracking", "Drivers", "Dispatch", "Analytics"],
    image: "/images/products/logistics.jpg",
    video: "/videos/products/logistics.mp4",
    accent: "#22D3EE",
    accentSoft: "rgba(34, 211, 238, 0.16)",
    glow: "rgba(34, 211, 238, 0.35)",
  },
  {
    slug: "learning",
    name: "Learning Platform",
    productLine: "Learning Platform",
    tagline: "An LMS with student and instructor roles, plus an in-lesson AI tutor.",
    industry: "Education",
    demonstrates: "LMS + user roles",
    automation: "AI tutor + automated certificates",
    problem:
      "Lessons live in folders, progress is guessed, and students wait for office hours when they get stuck mid-module.",
    solution:
      "A learning product with course discovery, a lesson player, quizzes, instructor tools, certificates, and an in-lesson AI tutor.",
    features: [
      "Course discovery and student home",
      "Lesson player with progress",
      "Quizzes and results",
      "Instructor course management",
      "AI tutor + automated certificates",
    ],
    technologies: ["Next.js", "Mux", "Supabase", "OpenAI", "Resend"],
    roles: [
      { title: "Student", description: "Learn, quiz, and collect certificates." },
      { title: "Instructor", description: "Publish courses and track completion." },
      { title: "AI tutor", description: "Explain the current lesson on demand." },
    ],
    workflow: [
      "Student asks the AI tutor",
      "Lesson is explained",
      "Course completed",
      "Automated certificate generated",
      "Notification sent",
    ],
    screens: ["Catalog", "Player", "Quiz", "Instructor", "Certificate"],
    image: "/images/products/learning.jpg",
    video: "/videos/products/learning.mp4",
    accent: "#A78BFA",
    accentSoft: "rgba(167, 139, 250, 0.16)",
    glow: "rgba(167, 139, 250, 0.35)",
  },
  {
    slug: "clinic",
    name: "Clinic Platform",
    productLine: "Clinic Platform",
    tagline: "Fictional clinic software for booking and a multi-user staff and patient system.",
    industry: "Healthcare",
    demonstrates: "Booking + multi-user system",
    automation: "AI receptionist + reminders",
    problem:
      "Patients book by phone, availability is tribal knowledge, and reminders never go out until someone remembers.",
    solution:
      "A calm clinic product for availability, booking, staff schedules, visit history, and reminder automation — presented as a fictional demo, not a medical service.",
    features: [
      "Appointment booking",
      "Doctor availability",
      "Patient and staff dashboards",
      "Visit history",
      "AI receptionist + reminders",
    ],
    technologies: ["Next.js", "Google Calendar", "Twilio", "OpenAI", "Supabase"],
    roles: [
      { title: "Patient", description: "Request a slot and see visit history." },
      { title: "Staff", description: "Manage the day’s appointments." },
      { title: "AI receptionist", description: "Find an open slot and confirm." },
    ],
    workflow: [
      "Patient request",
      "AI receptionist",
      "Available slot found",
      "Appointment booked",
      "Reminder sent",
    ],
    screens: ["Book", "Schedule", "Patients", "Staff", "Reminders"],
    image: "/images/products/clinic.jpg",
    video: "/videos/products/clinic.mp4",
    accent: "#2DD4BF",
    accentSoft: "rgba(45, 212, 191, 0.16)",
    glow: "rgba(45, 212, 191, 0.35)",
  },
  {
    slug: "finance",
    name: "Finance App",
    productLine: "Finance App",
    tagline: "A finance dashboard with data visualization, AI financial insights, and smart alerts.",
    industry: "Finance",
    demonstrates: "Dashboard + data visualization",
    automation: "AI financial insights + smart alerts",
    problem:
      "Transactions sit in exports, budgets are rebuilt monthly, and nobody sees a spend trend until it is already over.",
    solution:
      "A finance workspace with overview, transactions, budgets, reports, and in-product AI insights that flag drift before month-end.",
    features: [
      "Financial overview",
      "Transactions and categories",
      "Budget tracking",
      "Reports and data visualization",
      "AI financial insights + smart alerts",
    ],
    technologies: ["Next.js", "PostgreSQL", "Recharts", "Plaid", "OpenAI"],
    roles: [
      { title: "Founder", description: "Watch cash, burn, and runway." },
      { title: "Ops", description: "Categorize spend and hold budgets." },
      { title: "AI financial insights", description: "Surface trends and smart alerts inside the product." },
    ],
    workflow: [
      "Transactions land",
      "Budgets compared",
      "AI financial insights generated",
      "Smart alerts",
    ],
    screens: ["Overview", "Transactions", "Budgets", "Reports", "Insights"],
    image: "/images/products/finance.jpg",
    video: ["/videos/products/finance.mp4", "/videos/products/finance-alert.mp4"],
    accent: "#34D399",
    accentSoft: "rgba(52, 211, 153, 0.16)",
    glow: "rgba(52, 211, 153, 0.28)",
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((product) => product.slug === slug);
}

export function getProductSlugs(): ProductSlug[] {
  return PRODUCTS.map((product) => product.slug);
}
