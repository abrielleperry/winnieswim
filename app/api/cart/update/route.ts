import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const STOREFRONT_URL = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`;
const TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

export async function POST(request: Request) {
  const { lineId, quantity } = await request.json();
  const cookieStore = await cookies();
  const cartId = cookieStore.get("shopify_cart_id")?.value;

  if (!cartId) return NextResponse.json({ ok: false });

  if (quantity === 0) {
    await fetch(STOREFRONT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": TOKEN,
      },
      body: JSON.stringify({
        query: `
          mutation RemoveFromCart($cartId: ID!, $lineIds: [ID!]!) {
            cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
              cart { id }
            }
          }
        `,
        variables: { cartId, lineIds: [lineId] },
      }),
    });
  } else {
    await fetch(STOREFRONT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": TOKEN,
      },
      body: JSON.stringify({
        query: `
          mutation UpdateCart($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
            cartLinesUpdate(cartId: $cartId, lines: $lines) {
              cart { id }
            }
          }
        `,
        variables: {
          cartId,
          lines: [{ id: lineId, quantity }],
        },
      }),
    });
  }

  return NextResponse.json({ ok: true });
}
