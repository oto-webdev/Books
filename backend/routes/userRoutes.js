import express from 'express'
import {register, login} from '../controllers/userController.js'
import {protect} from '../middleware/auth.js'

const router = express.Router()

router.post("/", register)
router.post("/login", login)
router.get("/", protect, )

export default router;