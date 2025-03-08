import express from 'express';
import {
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from '../Controllers/products.controller.js';

const router = express.Router();

router.route('/all').get(getProducts);
router.route('/:id').get(getProduct);
router.route('/:id').patch(updateProduct);
router.route('/:id').delete(deleteProduct);

export default router;
