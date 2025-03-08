import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';

const fetchProducts = async () => {
  const { data } = await axios.get('http://localhost:8080/api/v1/products/all');
  return data.data.products;
};
const ProductList = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id) => {
      return axios.delete(`http://localhost:8080/api/v1/products/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const {
    isLoading,
    error,
    data: products,
  } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Customers also purchased
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <Trash2
                onClick={() => mutation.mutate(product.id)}
                className="absolute right-1 top-1 text-red-500 bg-white p-1 z-50 cursor-pointer   rounded-full"
              />
              <img
                crossOrigin="anonymous"
                alt={product.title}
                src={product.thumbnail}
                className="aspect-square w-full rounded-md bg-gray-200 object-cover group-hover:opacity-75 lg:aspect-auto lg:h-80"
              />
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link to={`/product/${product.id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.title}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.brand}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  {product.price}
                </p>
              </div>
              <div className="mt-2 flex justify-between">
                <p className="mt-1 text-sm text-gray-500">
                  {product.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;
