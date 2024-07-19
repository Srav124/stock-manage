import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({
    name : {type: String, required: true},
    symbol: {type: String, required: true},
    rank:{type: Number, required: true}
}, {
    toJSON : {
        transform(doc, ret){
            delete ret._id
            delete ret.__v
        }
        }})

export const stocks= mongoose.model('stocks', stockSchema)
