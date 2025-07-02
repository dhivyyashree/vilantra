"use client";

import { useState } from "react";

export default function ProductUploadForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = new FormData(form);

    setLoading(true);

    try {
      const res = await fetch("/api/products/upload", {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error("Upload failed");
      alert("Product uploaded successfully!");
      form.reset();
    } catch (error) {
      console.error(error);
      alert("Failed to upload product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4 p-4 pt-50">
      <input name="title" placeholder="Title" required className="border p-2 w-full" />
      <input name="price" type="number" placeholder="Price" required className="border p-2 w-full" />
      <input name="category" placeholder="Category" required className="border p-2 w-full" />
      <textarea name="description" placeholder="Description" required className="border p-2 w-full" />
      <input name="image" type="file" accept="image/*" required className="border p-2 w-full" />
      <button
        type="submit"
        disabled={loading}
        className={`p-2 rounded text-white transition bg-pink-600
            ${loading ? "bg-pink-600 cursor-not-allowed" : "bg-brandpink hover:bg-pink-600"}
        `}
        >
        {loading ? "Uploading..." : "Upload Product"}
     </button>
    </form>
  );
}

