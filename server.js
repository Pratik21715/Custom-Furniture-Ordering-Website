const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");
const path=require("path");
const app=express();
app.use(cors()); app.use(express.json());
const PORT=5000;
mongoose.connect("mongodb://127.0.0.1:27017/custom_furniture")
.then(()=>console.log("MongoDB connected"))
.catch(e=>console.log("MongoDB not connected:",e.message));

const orderSchema=new mongoose.Schema({
 customer:String, email:String, furniture:String, material:String,
 color:String, dimensions:String, quantity:Number, price:Number, createdAt:{type:Date,default:Date.now}
});
const Order=mongoose.model("Order",orderSchema);

app.get("/api/products",(req,res)=>res.json([
 {id:1,name:"Modern Sofa",category:"Sofa",price:25000,material:"Wood + Fabric"},
 {id:2,name:"Luxury Wardrobe",category:"Wardrobe",price:32000,material:"Engineered Wood"},
 {id:3,name:"Dining Table",category:"Table",price:18000,material:"Solid Wood"},
 {id:4,name:"Study Table",category:"Table",price:12000,material:"Plywood"},
 {id:5,name:"King Bed",category:"Bed",price:28000,material:"Solid Wood"},
 {id:6,name:"TV Unit",category:"TV Unit",price:15000,material:"Engineered Wood"}
]));
app.post("/api/orders",async(req,res)=>{
 try{const order=await Order.create(req.body);res.status(201).json({message:"Order placed successfully",order});}
 catch(e){res.status(400).json({message:"Order failed",error:e.message});}
});
app.get("/api/orders",async(req,res)=>res.json(await Order.find().sort({createdAt:-1})));
app.use(express.static(path.join(__dirname,"../frontend")));
app.get("*",(req,res)=>res.sendFile(path.join(__dirname,"../frontend/index.html")));
app.listen(PORT,()=>console.log(`Website running: http://localhost:${PORT}`));