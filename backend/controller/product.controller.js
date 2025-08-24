import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const createProduct = async(req, res) => {
    try{
        const { search, minPrice, maxPrice, sort, category } = req.query;
        
        // Build query
        let query = {};
        
        // Search functionality
        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }
        
        // Category filtering
        if (category && category !== 'all') {
            query.category = category;
        }
        
        // Price filtering
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = parseFloat(minPrice);
            if (maxPrice) query.price.$lte = parseFloat(maxPrice);
        }
        
        // Build sort object
        let sortObj = { createdAt: -1 }; // default sort
        if (sort) {
            const [field, order] = sort.split(':');
            sortObj = { [field]: order === 'desc' ? -1 : 1 };
        }
        
        const products = await Product.find(query).sort(sortObj);
        res.status(200).json({success: true, data: products});
    } catch(error){
        console.log("Error in get products", error.message);
        res.status(500).json({success: false, message: "server error"});
    }
}

export const postProduct = async(req, res) => {
    const product = req.body;

    if(!product.name || !product.price ||!product.image || !product.category){
        return res.status(400).json({success: false, message:"please provide all required fields"})
    }

    const newProduct = await Product(product);
    try{
        await newProduct.save();
        res.status(201).json({success: true, data: newProduct});
    } catch(error){
        console.log("Error in create product", error.message);
        res.status(500).json({success: false, message: "server error"});
    }
}

export const updateProduct = async (req, res) => {
    const id = req.params.id;
    const product = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "Invalid product id"});
     }

    try{
        const updatedProduct = await Product.findByIdAndUpdate(id,product, {new: true});
        res.status(200).json({success: true, data: updatedProduct}); 
    } catch(error){
        console.log("Error in update product", error.message);
        res.status(404).json({success: false, message: "Product not found"});
    }
}

export const deleteProduct = async (req, res) => {
    const id = req.params.id;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success: false, message: "Invalid product id"});
    }
    
    try{
        await Product.findByIdAndDelete(id);
        res.status(200).json({success: true, message: "Product deleted successfully"});
    } catch(error){
        console.log("Error in delete product", error.message);
         res.status(404).json({success: false, message: "Product not found"});
    }
}

// Get all categories
export const getCategories = async (req, res) => {
    try {
        const categories = await Product.distinct('category');
        res.status(200).json({success: true, data: categories});
    } catch(error) {
        console.log("Error in get categories", error.message);
        res.status(500).json({success: false, message: "server error"});
    }
}