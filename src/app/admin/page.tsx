"use client";

import { useState } from "react";
import { uploadProduct } from "@/lib/api";

interface Variant {
  color: string;
  images: File[];
  focusValues: string[];
}

export default function ProductUploadForm() {
  const [title, setTitle] = useState("");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [variants, setVariants] = useState<Variant[]>([
    { color: "", images: [], focusValues: [] },
  ]);

  const handleFileChange = (index: number, files: FileList | null) => {
    if (!files) return;
    const updated = [...variants];
    updated[index].images = Array.from(files);
    updated[index].focusValues = Array.from(files).map(() => "center"); // default focus
    setVariants(updated);
  };

  const handleFocusChange = (variantIndex: number, imageIndex: number, value: string) => {
    const updated = [...variants];
    updated[variantIndex].focusValues[imageIndex] = value;
    setVariants(updated);
  };

  const addVariant = () => {
    setVariants([...variants, { color: "", images: [], focusValues: [] }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("original_price", originalPrice);
    formData.append("discount_price", discountPrice);
    formData.append("category", category);
    formData.append("description", description);

    const variantMeta = variants.map((v) => ({
      color: v.color,
      images: v.focusValues.map((focus) => ({ focus })),
    }));
    formData.append("variants", JSON.stringify(variantMeta));

    variants.forEach((variant, vIndex) => {
      const color = variant.color.trim().toLowerCase();
      variant.images.forEach((file, fIndex) => {
        const focus = variant.focusValues[fIndex];
        const renamed = new File(
          [file],
          `${color}_${focus}_${fIndex}.jpg`,
          { type: file.type }
        );
        formData.append("images", renamed);
      });
    });

    try {
      const result = await uploadProduct(formData);
      alert("✅ Product uploaded: " + result.id);
      window.location.reload();
    } catch (error) {
      alert("❌ Upload failed");
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-xl mx-auto p-4 bg-white shadow rounded mt-30"
    >
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
        className="w-full p-2 border rounded"
      />
      <input
        value={originalPrice}
        onChange={(e) => setOriginalPrice(e.target.value)}
        placeholder="Original Price"
        required
        className="w-full p-2 border rounded"
      />
      <input
        value={discountPrice}
        onChange={(e) => setDiscountPrice(e.target.value)}
        placeholder="Discount Price"
        required
        className="w-full p-2 border rounded"
      />
      <input
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category"
        className="w-full p-2 border rounded"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="w-full p-2 border rounded"
      />

      <h3 className="font-semibold">Color Variants</h3>
      {variants.map((variant, i) => (
        <div key={i} className="space-y-2 border p-3 rounded">
          <input
            placeholder="Color"
            value={variant.color}
            onChange={(e) => {
              const updated = [...variants];
              updated[i].color = e.target.value;
              setVariants(updated);
            }}
            className="w-full p-2 border rounded"
          />
          <input
            type="file"
            multiple
            onChange={(e) => handleFileChange(i, e.target.files)}
            className="w-full"
          />

          {/* Focus Selector */}
          {variant.images.map((file, imgIndex) => (
            <div key={imgIndex} className="flex items-center gap-4 mt-2">
              <p className="truncate w-40 text-sm">{file.name}</p>
              <select
                value={variant.focusValues[imgIndex]}
                onChange={(e) => handleFocusChange(i, imgIndex, e.target.value)}
                className="border rounded px-2 py-1"
              >
                <option value="top">Top</option>
                <option value="center">Center</option>
                <option value="bottom">Bottom</option>
              </select>
            </div>
          ))}
        </div>
      ))}

      <button
        type="button"
        onClick={addVariant}
        className="text-blue-600 underline"
      >
        + Add Another Color
      </button>

      <button type="submit" className="w-full bg-black text-white py-2 rounded">
        Upload Product
      </button>
    </form>
  );
}
