import Product from '../model/products.model.js';
import axios from 'axios';
import asyncHandler from 'express-async-handler';

export const getProductsAndSaveToDb = async () => {
  try {
    let count = await Product.estimatedDocumentCount();
    if (count > 0) {
      return;
    }

    let products = [];
    const { data } = await axios.get('https://dummyjson.com/products');
    products = data.products;
    await Product.insertMany(products);
  } catch (error) {
    console.log(error);
  }
};

export const getProducts = asyncHandler(async (req, res) => {
  let products = await Product.find();

  if (products.length === 0) {
    return res.status(200).json({
      status: 'success',
      message: 'No products found',
      data: {
        products: [],
      },
    });
  }

  res.status(200).json({
    status: 'success',
    message: 'Products fetched successfully',
    data: {
      products,
    },
  });
});

export const getProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findOne({ id: Number(id) });
  res.status(200).json({
    status: 'success',
    message: 'Product fetched successfully',
    data: {
      product,
    },
  });
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findOneAndDelete({ id: Number(id) });
  res.status(200).json({
    status: 'success',
    message: 'Product deleted successfully',
    data: {
      product,
    },
  });
});

export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findOneAndUpdate({ id: Number(id) }, req.body, {
    new: true,
  });
  res.status(200).json({
    status: 'success',
    message: 'Product updated successfully',
    data: {
      product,
    },
  });
});
