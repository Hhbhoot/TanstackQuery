import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const Product = () => {
  const { id } = useParams();

  const fetchProduct = async () => {
    const { data } = await axios.get(
      `http://localhost:8080/api/v1/products/${id}`,
    );
    return data.data.product;
  };

  const {
    data: product,
    isLoading,
    error,
  } = useQuery({ queryKey: ['product', id], queryFn: fetchProduct });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return (
      <div>
        {error.name} : {error.message}
      </div>
    );
  }

  return (
    <div key={product.id} className="group relative">
      <img
        crossOrigin="anonymous"
        alt={product.title}
        src={product.thumbnail}
        className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto "
      />
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm text-gray-700">
            <span aria-hidden="true" className="absolute inset-0" />
            {product.title}
          </h3>
          <p className="mt-1 text-sm text-gray-500">{product.brand}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">{product.price}</p>
      </div>
      <div className="mt-2 flex justify-between">
        <p className="mt-1 text-sm text-gray-500">{product.description}</p>
      </div>
    </div>
  );
};

export default Product;
