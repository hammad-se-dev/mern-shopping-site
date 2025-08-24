import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
			enum: [
				"Electronics",
				"Clothing",
				"Books",
				"Home & Garden",
				"Sports",
				"Beauty",
				"Toys",
				"Automotive",
				"Health",
				"Food & Beverages",
				"Other"
			],
			default: "Other"
		},
		description: {
			type: String,
			default: ""
		}
	},
	{
		timestamps: true, // createdAt, updatedAt
	}
);

const Product = mongoose.model("Product", productSchema);

export default Product;
