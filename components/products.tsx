type Product = {
  id: string;
  title: string;
  handle: string;
  description: string;
  featuredImage?: {
    url: string;
    altText?: string;
  };
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
};

export function ProductsSection({ products }: { products: Product[] }) {
  return (
    <section className="px-4 py-24">
      <h1 className="mb-10 text-4xl font-prestigesemibold text-gray-900">
        Shop
      </h1>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <div key={product.id} className="rounded-2xl border p-4">
            {product.featuredImage?.url && (
              <img
                src={product.featuredImage.url}
                alt={product.featuredImage.altText || product.title}
                className="mb-4 aspect-square w-full rounded-xl object-cover"
              />
            )}

            <h2 className="text-xl font-prestigesemibold">{product.title}</h2>

            <p className="mt-2 text-gray-600">
              ${product.priceRange.minVariantPrice.amount}
            </p>

            <a
              href={`/products/${product.handle}`}
              className="mt-4 inline-block rounded-full bg-black px-5 py-2 text-white"
            >
              View Product
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
