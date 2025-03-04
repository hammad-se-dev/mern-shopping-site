import express from 'express';
import { createProduct, postProduct, updateProduct, deleteProduct } from '../controller/product.controller.js';

const router = express.Router();

router.get('/', createProduct);

router.post('/', postProduct);

router.put('/:id', updateProduct);

router.delete('/:id', deleteProduct);

export default router;