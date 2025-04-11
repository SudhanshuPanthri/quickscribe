import { isDev } from "./helpers";

export const pricingPlans = [
  {
    id: "free",
    name: "Free",
    price: 0,
    description: "For Basic Usage",
    items: ["3 PDF Summaries every month", "Basic Processing", "Model 1.x"],
    paymentLink: isDev ? "https://buy.stripe.com/test_28o4hR7556y21K86oo" : "",
    priceId: isDev ? "price_1RBhHT2KtpltozyuRoDYOUKC" : "",
  },
  {
    id: "basic",
    name: "Basic",
    price: 8.99,
    description: "Best for School, Office work",
    items: [
      "20 PDF Summaries every month",
      "Model 2.x for faster processing",
      "Email Support",
    ],
    paymentLink: isDev ? "https://buy.stripe.com/test_00gcOnahh7C60G4dQR" : "",
    priceId: isDev ? "price_1RBhHT2KtpltozyuTvLXYXqR" : "",
  },
  {
    id: "pro",
    name: "Pro",
    price: 18.99,
    description: "For professionals and teams",
    items: [
      "Unlimited PDF summaries",
      "Priority Processing",
      "Model 2.x pro-v.1 for the best output",
      "24/7 priortiy support",
      "Markdown export",
    ],
    paymentLink: isDev ? "https://buy.stripe.com/test_fZe7u3gFF2hM74s002" : "",
    priceId: isDev ? "price_1RBhHT2KtpltozyuAr6FxD6l" : "",
  },
];
