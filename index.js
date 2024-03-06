const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// create product schma

const productsSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  price: {
 type:Number,
 required:true,

  },
  description: {
    type:String,
    required:true
  },
  createdAt: {
  type: Date,
  default:Date.now,
  },
});

//create a product model

const product = mongoose.model("Product",productsSchema)

const connectDb = async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/Product");
  console.log("db is connect");

  try {
  } catch (error) {
    console.log("db is not connect");
    console.log(error.message);
    process.exit(1);
  }
};

app.post("/products", async (req, res) => {

  try {
  
 const productDate = await product.insertMany([
  {"title":"i phone 5","price":250, "description":"this is i phone"}
 ]);
    res.status(201).send(productDate)
  } catch (error) {
    res.status(500).send({message: error.message})
    
  }
});

app.listen(port, async () => {
  console.log(`server is renning https//:localhost: ${port}`);
  await connectDb();
});
