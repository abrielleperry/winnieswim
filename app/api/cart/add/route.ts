import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const STOREFRONT_URL = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2024-01/graphql.json`;
const TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

export async function POST(request: Request) {
  const { items } = await request.json();
  const cookieStore = await cookies();
  let cartId = cookieStore.get("shopify_cart_id")?.value;

  const variantGid = `gid://shopify/ProductVariant/${items[0].id}`;
  const quantity = items[0].quantity;

  if (!cartId) {
    // Create a new cart
    const res = await fetch(STOREFRONT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": TOKEN,
      },
      body: JSON.stringify({
        query: `
          mutation CreateCart($lines: [CartLineInput!]!) {
            cartCreate(input: { lines: $lines }) {
              cart { id }
            }
          }
        `,
        variables: {
          lines: [{ merchandiseId: variantGid, quantity }],
        },
      }),
    });
    const { data } = await res.json();
    cartId = data?.cartCreate?.cart?.id;
  } else {
    // Add to existing cart
    await fetch(STOREFRONT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": TOKEN,
      },
      body: JSON.stringify({
        query: `
          mutation AddToCart($cartId: ID!, $lines: [CartLineInput!]!) {
            cartLinesAdd(cartId: $cartId, lines: $lines) {
              cart { id }
            }
          }
        `,
        variables: {
          cartId,
          lines: [{ merchandiseId: variantGid, quantity }],
        },
      }),
    });
  }

  const response = NextResponse.json({ ok: true });
  if (cartId) {
    response.cookies.set("shopify_cart_id", cartId, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 14,
    });
  }
  return response;
}
