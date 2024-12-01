import express from 'express'
import { createBook, deleteBook, getBooks, updateBook } from '../controllers/bookController.js'
import {protect} from '../middleware/auth.js'

const router = express.Router()

router.get("/", protect, getBooks)
router.post("/", protect, createBook)
router.put("/:id", protect, updateBook)
router.delete("/:id", protect, deleteBook)

export default router;