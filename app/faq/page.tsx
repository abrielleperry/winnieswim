// app/faq/page.tsx

"use client";

import FaqsAccordion from "@/components/smoothui/faq-2/index";

const faqData = {
  title: "Frequently Asked Questions",
  description: "Find answers to common questions about Winnie Swim.",
  faqs: [
    {
      question: "What size should I order?",
      answer:
        "We recommend using our Size Guide to find your best fit. Measure your bust, underbust, waist, and hips, then compare your measurements to the chart. If you're between sizes, we generally recommend sizing up for a more comfortable fit. Still unsure? Contact us at winnieswim@winnieswim.com and we'll be happy to help recommend a size.",
    },
    {
      question: "How does shipping work?",
      answer:
        "Orders are typically processed within 2–5 business days. Once your order has shipped, you'll receive a confirmation email with tracking information. Please note that processing times may be slightly longer during new collection launches, holidays, or high-volume periods.",
    },
    {
      question: "What is your return and exchange policy?",
      answer:
        "Because our collections are released in limited quantities, all WinnieSwim purchases are final sale. We are unable to offer returns, exchanges, refunds, or order cancellations. Please double-check your size and order details before checkout.",
    },
    {
      question: "How should I care for my swimwear?",
      answer:
        "Rinse your swimwear thoroughly in cool water after every wear. Chlorine, salt, sunscreen, and oils can impact the fabric over time. Avoid bleach, fabric softeners, and harsh detergents. Never wring or twist your swimwear. Gently remove excess water with a towel and lay flat in the shade to dry naturally.",
    },
    {
      question: "Why doesn't WinnieSwim restock sold-out collections?",
      answer:
        "WinnieSwim is built around intentional drops. Each collection is inspired by a specific place, season, experience, or feeling and is designed to capture that moment in time. Rather than endlessly reproducing the same prints and colorways, we release limited collections that are created with purpose and meaning. Most prints and colorways are released once and are not restocked. Released once. Never repeated.",
    },
  ],
};

const FAQPage = () => (
  <main className="min-h-screen w-full bg-white px-6  py-4">
    <FaqsAccordion {...faqData} />
  </main>
);

export default FAQPage;
