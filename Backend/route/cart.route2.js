import express from 'express';
import { getCart, addToCart, removeFromCart, clearCart } from '../controller/cart.controller.js';
import authMiddleware from '../middleware/auth.middleware.js';

const router = express.Router();

// Protect all cart routes with authentication middleware
router.use(authMiddleware);

router.get('/', getCart);
router.post('/add', addToCart);
router.post('/remove', removeFromCart);
router.post('/clear', clearCart);

export default router;
