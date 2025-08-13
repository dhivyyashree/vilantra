export async function getAllProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

// lib/api.ts
export async function uploadProduct(formData: FormData) {
  const res = await fetch("http://localhost:8000/upload/", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("❌ Upload error:", errorText);
    throw new Error("Upload failed");
  }

  return res.json();
}