import mongoose from 'mongoose';

const stockSchema = new mongoose.Schema({
    id : {type: String, required: true},
    symbol: {type: String, required: true},
    name:{type: String, required: true}
}, {
    toJSON : {
        transform(doc, ret){
            delete ret._id
            delete ret.__v
        }
        }})

export const stocks= mongoose.model('stocks', stockSchema)

const marketSchema = new mongoose.Schema({
    id:  {type: String, required: true},
     symbol:  {type: String, required: true},
     name:  {type: String, required: true},
     current_price:  {type: Number},
     market_cap:  {type: Number},
     high_24h:  {type: Number},
     low_24h:  {type: Number},
     price_change_24h:  {type: Number},
     price_change_percentage_24h: {type: Number},
     market_cap_change_24h:  {type: Number},
     market_cap_change_percentage_24h:  {type: Number},
     total_supply: {type: Number},
     max_supply:  {type: Number}
})

export const market= mongoose.model('market', marketSchema)