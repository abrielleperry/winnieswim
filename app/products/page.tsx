import { shopifyFetch } from "@/lib/shopify";

const PRODUCTS_QUERY = `
  query Products {
    products(first: 12) {
      edges {
        node {
          id
          title
          handle
          description
          featuredImage {
            url
            altText
          }
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

export default async function ProductsPage() {
  const data = await shopifyFetch(PRODUCTS_QUERY);
  const products = data.products.edges.map((edge: any) => edge.node);

  return (
    <main className="min-h-screen bg-white px-6 py-20 md:px-12">
      <div className="mx-auto max-w-6xl">
        <h1 className="font-prestregular mb-2 py-4 text-5xl tracking-tight text-gray-900">
          East x West Collection
        </h1>
        <p className="mb-12 text-sm uppercase tracking-widest text-gray-400">
          {products.length} styles
        </p>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product: any) => (
            <a
              key={product.id}
              href={`/products/${product.handle}`}
              className="group block"
            >
              <div className="relative overflow-hidden rounded-xl bg-gray-50">
                {product.featuredImage?.url ? (
                  <img
                    src={product.featuredImage.url}
                    alt={product.featuredImage.altText || product.title}
                    className="aspect-[3/4] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex aspect-[3/4] w-full items-center justify-center text-xs text-gray-400">
                    No image
                  </div>
                )}
              </div>

              <div className="mt-3 flex items-start justify-between gap-2">
                <p className="text-sm text-gray-800 leading-snug">
                  {product.title}
                </p>
                <p className="shrink-0 text-sm text-gray-500">
                  $
                  {parseFloat(
                    product.priceRange.minVariantPrice.amount,
                  ).toFixed(2)}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
