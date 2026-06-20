import { shopifyFetch } from "@/lib/shopify";
import Link from "next/link";

import {
  VariantProvider,
  SizePills,
  AddtoCartButton,
} from "@/components/product-detail";

const PRODUCT_BY_HANDLE_QUERY = `
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      description
      featuredImage {
        url
        altText
      }
      images(first: 6) {
        edges {
          node {
            url
            altText
          }
        }
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      variants(first: 20) {
        edges {
          node {
            id
            title
            availableForSale
            price {
              amount
              currencyCode
            }
          }
        }
      }
      options {
        name
        values
      }
    }
  }
`;

type ProductPageProps = {
  params: Promise<{
    handle: string;
  }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { handle } = await params;
  const data = await shopifyFetch(PRODUCT_BY_HANDLE_QUERY, { handle });
  const product = data.product;

  if (!product) {
    return (
      <main className="min-h-screen bg-white px-6 py-24">
        <p className="font-prestregular text-3xl text-gray-900">
          Product not found.
        </p>
      </main>
    );
  }

  const variants = product.variants.edges.map((edge: any) => edge.node);
  const images = product.images?.edges?.map((edge: any) => edge.node) ?? [];

  // Group variants by option name for rendering selectors
  const options: { name: string; values: string[] }[] = product.options ?? [];

  const price = parseFloat(product.priceRange.minVariantPrice.amount).toFixed(
    2,
  );

  return (
    <main className="min-h-screen bg-white px-6 py-20 md:px-12">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:gap-16">
        {/* Image column */}
        <div className="flex flex-col gap-3">
          {product.featuredImage?.url ? (
            <img
              src={product.featuredImage.url}
              alt={product.featuredImage.altText || product.title}
              className="aspect-[3/4] w-full rounded-2xl object-cover"
            />
          ) : (
            <div className="flex aspect-[3/4] w-full items-center justify-center rounded-2xl bg-gray-100 text-sm text-gray-400">
              No image yet
            </div>
          )}

          {/* Thumbnail strip if multiple images */}
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {images.map((img: any, i: number) => (
                <img
                  key={i}
                  src={img.url}
                  alt={img.altText || `${product.title} ${i + 1}`}
                  className="h-20 w-16 flex-shrink-0 rounded-lg object-cover opacity-70 hover:opacity-100 transition-opacity"
                />
              ))}
            </div>
          )}
        </div>

        {/* Info column */}
        <div className="flex flex-col">
          {/* Breadcrumb */}
          <Link
            href="/products"
            className="mb-6 text-xs uppercase tracking-widest text-gray-400 hover:text-gray-600 transition-colors"
          >
            ← All styles
          </Link>

          <h1 className="font-prestregular text-4xl leading-tight text-gray-900 md:text-5xl">
            {product.title}
          </h1>

          <p className="mt-3 text-xl text-gray-600">${price}</p>

          {/* Variant options */}
          <VariantProvider variants={variants} options={options}>
            <SizePills />

            {/* Description */}
            {product.description && (
              <div className="mt-8 space-y-2 text-sm leading-relaxed text-gray-500">
                {product.description
                  .split(/(?=Details:|Fabric:|Size & Fit:)/)
                  .map((section: string, i: number) => {
                    const [label, ...rest] = section.split(":");
                    const content = rest.join(":").trim();

                    if (label === "Details") {
                      const bullets = content
                        .split(/(?=[A-Z])/)
                        .map((s) => s.trim())
                        .filter(Boolean);
                      return (
                        <div key={i}>
                          <p className="mb-2 text-xs uppercase tracking-widest text-gray-400">
                            Details
                          </p>
                          <ul className="space-y-0.0">
                            {bullets.map((b, j) => (
                              <li key={j} className="flex gap-0">
                                <span className="flex-shrink-0"></span>
                                {b}
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    }

                    return (
                      <div key={i}>
                        <p className="mb-1 text-xs uppercase tracking-widest text-gray-400">
                          {label.trim()}
                        </p>
                        <p>{content}</p>
                      </div>
                    );
                  })}
              </div>
            )}

            {/* CTA */}
            <AddtoCartButton />
          </VariantProvider>
        </div>
      </div>
    </main>
  );
}
