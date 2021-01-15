import express from 'express';
import { registerUser, loginUser, deleteUser, isTokenValid, getUser } from '../controllers/users.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.delete('/delete', auth, deleteUser);
router.post('/tokenIsValid', isTokenValid);
router.get('/', auth, getUser);

export default router;