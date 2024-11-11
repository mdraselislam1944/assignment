import { Product } from "@/types";
import { useRouter } from "next/navigation";
import React from "react";

interface ProductListProps {
  products: Product[];
  onOpenModal: (product: Product) => void;
}

export const ProductList: React.FC<ProductListProps> = ({
  products,
  onOpenModal,
}) => {
  const router = useRouter();
  return (
    <div>
      {products.map((product) => (
        <div key={product.id} className="flex border p-2 justify-between">
          <div className="flex">
            <div>{product.id}</div>. {product.name}
          </div>
          <button
            onClick={() => {
              onOpenModal(product);
              router.push(`/products?product-id=${product.id}`);
            }}
          >
            Details
          </button>
        </div>
      ))}
    </div>
  );
};
