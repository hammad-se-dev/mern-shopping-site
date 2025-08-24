import express from 'express';
import { createProduct, postProduct, updateProduct, deleteProduct, getCategories } from '../controller/product.controller.js';

const router = express.Router();

router.get('/', createProduct);
router.get('/categories', getCategories);

router.post('/', postProduct);

router.put('/:id', updateProduct);

router.delete('/:id', deleteProduct);

export default router;