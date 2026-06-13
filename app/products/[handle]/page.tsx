import { Navbar } from "@/components/navbar";
import { shopifyFetch } from "@/lib/shopify";

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
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      variants(first: 10) {
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
      <>
        <Navbar />
        <main className="min-h-screen bg-white px-4 py-24">
          <h1 className="text-3xl font-prestigesemibold text-gray-900">
            Product not found
          </h1>
        </main>
      </>
    );
  }

  const variants = product.variants.edges.map((edge: any) => edge.node);
  const firstAvailableVariant = variants.find(
    (variant: any) => variant.availableForSale,
  );

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-white px-4 py-24">
        <section className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2">
          <div>
            {product.featuredImage?.url ? (
              <img
                src={product.featuredImage.url}
                alt={product.featuredImage.altText || product.title}
                className="aspect-square w-full rounded-2xl object-cover"
              />
            ) : (
              <div className="flex aspect-square w-full items-center justify-center rounded-2xl bg-gray-100 text-gray-500">
                No image yet
              </div>
            )}
          </div>

          <div>
            <h1 className="text-4xl font-prestigesemibold text-gray-900">
              {product.title}
            </h1>

            <p className="mt-4 text-xl text-gray-700">
              ${product.priceRange.minVariantPrice.amount}
            </p>

            <p className="mt-6 whitespace-pre-line text-gray-600">
              {product.description}
            </p>

            <div className="mt-8">
              {firstAvailableVariant ? (
                <a
                  href={`https://${process.env.SHOPIFY_STORE_DOMAIN}/cart/${firstAvailableVariant.id.replace(
                    "gid://shopify/ProductVariant/",
                    "",
                  )}:1`}
                  className="inline-block rounded-full bg-black px-8 py-3 text-white"
                >
                  Buy Now
                </a>
              ) : (
                <p className="text-gray-500">
                  This product is currently unavailable.
                </p>
              )}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
