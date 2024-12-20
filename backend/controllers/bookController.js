import Book from '../models/Book.js'
import expressAsyncHandler from 'express-async-handler'
import mongoose from 'mongoose'

export const getBooks = expressAsyncHandler(async (req, res) => {
    try {
        const books = await Book.find({ user: req.user.id });
        return res.status(200).json({ message: "All Books", books });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

export const createBook = expressAsyncHandler(async (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ message: "Title is required" }); 
    }

    try {
        const book = await Book.create({ title, user: req.user.id });
        return res.status(201).json({ message: "New Book", book, user: req.user.id });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

export const updateBook = expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid Id" }); 
    }

    const updatedBook = req.body;

    try {
        const book = await Book.findByIdAndUpdate(id, updatedBook, { new: true });
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        return res.status(200).json({ message: "Update Book", book, user: req.user.id });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

export const deleteBook = expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid Id" });
    }

    try {
        const book = await Book.findByIdAndDelete(id);
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        return res.status(200).json({ message: "Book Deleted", book, user: req.user.id });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});
