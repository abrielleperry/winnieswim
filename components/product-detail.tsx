// components/product-detail.tsx
"use client";
import { useState, createContext, useContext } from "react";

const VariantContext = createContext<any>(null);

export function VariantProvider({ variants, options, children }: any) {
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string>
  >({});

  const selectedVariant =
    variants.find((v: any) =>
      Object.entries(selectedOptions).every(([, value]) =>
        v.title.toLowerCase().includes(value.toLowerCase()),
      ),
    ) ?? null;

  return (
    <VariantContext.Provider
      value={{
        variants,
        options,
        selectedOptions,
        setSelectedOptions,
        selectedVariant,
      }}
    >
      {children}
    </VariantContext.Provider>
  );
}

export function SizePills() {
  const { variants, options, selectedOptions, setSelectedOptions } =
    useContext(VariantContext);
  return (
    <>
      {options.map((option: any) => (
        <div key={option.name} className="mt-6">
          <p className="mb-2 text-xs uppercase tracking-widest text-gray-400">
            {option.name}
          </p>
          <div className="flex flex-wrap gap-2">
            {option.values.map((value: string) => {
              const isSelected = selectedOptions[option.name] === value;
              const isAvailable = variants.some(
                (v: any) =>
                  v.availableForSale &&
                  v.title.toLowerCase().includes(value.toLowerCase()),
              );
              return (
                <button
                  key={value}
                  onClick={() => {
                    if (!isAvailable) return;
                    setSelectedOptions((prev: any) => ({
                      ...prev,
                      [option.name]: value,
                    }));
                  }}
                  disabled={!isAvailable}
                  className={`relative rounded-full border px-4 py-1.5 text-sm transition-colors ${
                    isSelected
                      ? "border-gray-900 bg-gray-900 text-white"
                      : isAvailable
                        ? "border-gray-300 text-gray-800 hover:border-gray-800"
                        : "border-gray-100 text-gray-300 cursor-not-allowed"
                  }`}
                >
                  {!isAvailable && (
                    <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                      <span className="block h-px w-full rotate-45 bg-gray-300" />
                    </span>
                  )}
                  {value}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
}

export function AddtoCartButton() {
  const { selectedOptions, selectedVariant, options } =
    useContext(VariantContext);
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);

  const allOptionsSelected = options.every(
    (option: any) => selectedOptions[option.name],
  );
  const canAdd = allOptionsSelected && selectedVariant?.availableForSale;

  async function handleAddToCart() {
    if (!canAdd) return;
    setLoading(true);

    const variantId = selectedVariant.id.replace(
      "gid://shopify/ProductVariant/",
      "",
    );

    try {
      await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: [{ id: Number(variantId), quantity: 1 }],
        }),
      });
      window.dispatchEvent(new CustomEvent("cart:updated"));
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    } catch {}

    setLoading(false);
  }

  return (
    <div className="mt-5">
      <button
        onClick={handleAddToCart}
        disabled={!canAdd || loading}
        className={`inline-block w-full rounded-full px-8 py-4 text-center text-sm uppercase tracking-widest transition-colors md:w-auto ${
          canAdd
            ? "bg-gray-900 text-white hover:bg-gray-700"
            : "bg-gray-100 text-gray-400 cursor-not-allowed"
        } disabled:opacity-50`}
      >
        {loading
          ? "Adding..."
          : added
            ? "Added!"
            : !allOptionsSelected
              ? "Select a size"
              : "Add to Cart"}
      </button>
    </div>
  );
}
