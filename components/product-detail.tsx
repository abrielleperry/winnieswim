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
    ) ?? variants.find((v: any) => v.availableForSale);

  const checkoutUrl = selectedVariant?.availableForSale
    ? `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/cart/${selectedVariant.id.replace("gid://shopify/ProductVariant/", "")}:1`
    : null;

  return (
    <VariantContext.Provider
      value={{
        variants,
        options,
        selectedOptions,
        setSelectedOptions,
        checkoutUrl,
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
        <div key={option.name} className="mt-8">
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
                  onClick={() =>
                    setSelectedOptions((prev: any) => ({
                      ...prev,
                      [option.name]: value,
                    }))
                  }
                  disabled={!isAvailable}
                  className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                    isSelected
                      ? "border-gray-900 bg-gray-900 text-white"
                      : isAvailable
                        ? "border-gray-300 text-gray-800 hover:border-gray-800"
                        : "border-gray-100 text-gray-300 line-through cursor-not-allowed"
                  }`}
                >
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
  const { selectedOptions, checkoutUrl } = useContext(VariantContext);
  return (
    <div className="mt-5">
      {checkoutUrl ? (
        <a
          href={checkoutUrl}
          className="inline-block w-full rounded-full bg-gray-900 px-8 py-4 text-center text-sm uppercase tracking-widest text-white hover:bg-gray-700 transition-colors md:w-auto"
        >
          Add to Cart
        </a>
      ) : (
        <p className="text-sm text-gray-400">
          {Object.keys(selectedOptions).length === 0
            ? "Select a size"
            : "Currently unavailable"}
        </p>
      )}
    </div>
  );
}
