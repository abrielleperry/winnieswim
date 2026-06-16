import { ProductsSection } from "@/components/products";
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

export default async function Collection() {
  const data = await shopifyFetch(PRODUCTS_QUERY);

  console.log("SHOPIFY DATA:", JSON.stringify(data, null, 2));

  const products = data.products.edges.map((edge: any) => edge.node);

  console.log("PRODUCTS:", products);

  return (
    <>
      <main className="min-h-screen bg-white">
        <ProductsSection products={products} />
      </main>
    </>
  );
}
