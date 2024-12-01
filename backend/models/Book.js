import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },

    title: {
        type: String,
        required: true
    }

}, {
    timestamps: true
})

const Book = mongoose.model("Book", bookSchema)

export default Book;