import Book from '../models/Book.js'
import expressAsyncHandler from 'express-async-handler'
import mongoose from 'mongoose'

export const getBooks = expressAsyncHandler(async (req, res) => {
    try{
        const book = await Book.find()
        return res.status(200).json({message: "All Books", book})
    }catch(error){
        return res.status(500).json({message: error.message})
    }
})

export const createBook = expressAsyncHandler(async (req, res) => {
    const {title} = req.body;
    if(!title) {
        res.status(404).json({message: "Title is required"})
    }

    try{
        const book = await Book.create({title})
        return res.status(201).json({message: "New Book", book})
    }catch(error){
        return res.status(500).json({message: error.message})
    }
})

export const updateBook = expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(401).json({message: "Invalid Id"})
    }

    const updatedBook = req.body;

    try{
        const book = await Book.findByIdAndUpdate(id, updatedBook, {new: true})
        return res.status(200).json({message: "Update Book", book})
    }catch(error){
        return res.status(500).json({message: error.message})
    }
})

export const deleteBook = expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        res.status(401).json({message: "Invalid Id"})
    }

    try{
        const book = await Book.findByIdAndDelete(id)
        return res.status(200).json({message: "Book Deleted", book})
    }catch(error){
        return res.status(500).json({message: error.message})
    }
})