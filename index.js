
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const productsRouter = require('./Routes/products.route');
const usersRouter = require('./Routes/users.route');




mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 15000, 
}).then(() => {
    console.log("✅ Connected to MongoDB successfully!");}).catch((err)=>{console.log('================',err,'==========================')})

const app = express();
app.use(express.json());
app.use('/api/products',productsRouter)
app.use('/api/users',usersRouter)



app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


