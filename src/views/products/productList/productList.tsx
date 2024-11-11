import { Product } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductModal } from "../productModal";

interface ProductListProps {
  products: Product[];
}

export const ProductList: React.FC<ProductListProps> = ({ products }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get("product-id");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (productId) {
      const product = products.find((p) => p.id === productId);
      setSelectedProduct(product || null);
    } else {
      setSelectedProduct(null);
    }
  }, [productId, products]);

  const handleOpenModal = (product: Product) => {
    router.push(`/products?product-id=${product.id}`);
  };

  const handleCloseModal = () => {
    router.push("/products");
  };

  return (
    <div>
      {products.map((product) => (
        <div key={product.id} className="flex border p-2 justify-between">
          <div className="flex">
            <div>{product.id}</div>. {product.name}
          </div>
          <button onClick={() => handleOpenModal(product)}>Details</button>
        </div>
      ))}

      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={handleCloseModal} />
      )}
    </div>
  );
};
