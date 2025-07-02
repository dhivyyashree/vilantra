export default async function ShopPage() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/products`, {
      cache: "no-store",
    });
    const products = await res.json();
    console.log("Fetched products:", products);
    return (
      <main className="p-8">
        <h1 className="text-4xl font-bold mb-8">Shop All Products</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product: any) => (
            <div key={product._id} className="border rounded-lg p-4 shadow">
              <img src={product.image} alt={product.title} className="w-full h-48 object-cover rounded" />
              <h2 className="mt-4 text-xl font-semibold">{product.title}</h2>
              <p className="text-brandpink font-bold mt-2">₹{product.price}</p>
              <p className="mt-1 text-gray-600">{product.description}</p>
            </div>
          ))}
        </div>
      </main>
    );
  }
  