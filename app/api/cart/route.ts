import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const STOREFRONT_URL = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`;
const TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

export async function GET() {
  const cookieStore = await cookies();
  const cartId = cookieStore.get("shopify_cart_id")?.value;

  if (!cartId)
    return NextResponse.json({ items: [], total_price: 0, item_count: 0 });

  const res = await fetch(STOREFRONT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": TOKEN,
    },
    cache: "no-store",
    body: JSON.stringify({
      query: `
        query GetCart($cartId: ID!) {
          cart(id: $cartId) {
            id
            totalQuantity
            checkoutUrl
            cost { totalAmount { amount } }
            lines(first: 20) {
              edges {
                node {
                  id
                  quantity
                  merchandise {
                    ... on ProductVariant {
                      id
                      title
                      price { amount }
                      image { url }
                      product { title handle }
                    }
                  }
                }
              }
            }
          }
        }
      `,
      variables: { cartId },
    }),
  });

  const { data } = await res.json();
  const cart = data?.cart;

  if (!cart)
    return NextResponse.json({ items: [], total_price: 0, item_count: 0 });

  const items = cart.lines.edges.map(({ node }: any) => ({
    key: node.id,
    quantity: node.quantity,
    variant_id: node.merchandise.id,
    product_title: node.merchandise.product.title,
    variant_title: node.merchandise.title,
    image: node.merchandise.image?.url,
    final_line_price: Math.round(
      parseFloat(node.merchandise.price.amount) * node.quantity * 100,
    ),
  }));

  return NextResponse.json({
    items,
    item_count: cart.totalQuantity,
    total_price: Math.round(parseFloat(cart.cost.totalAmount.amount) * 100),
    checkout_url: cart.checkoutUrl,
  });
}
