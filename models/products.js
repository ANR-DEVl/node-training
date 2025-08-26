
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title :{
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discription: {
        type: String,
        required: true
    },

})


const Product = mongoose.model('Product', productSchema);

module.exports = Product



    // images :{
    //     type: [String],
    //     required: true
    // },
    // sizes: {
    //     type: [String],
    //     required: true
    // },
    // rate : {
    //     type: Number,
    //     default: 0
    // },