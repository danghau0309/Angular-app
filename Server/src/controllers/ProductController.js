const productModel = require("../models/ProductModel");
const orderModel = require("../models/OrderModel");
const userModel = require("../models/UserModel");

class ProductController {
  async getAllProducts(req, res) {
    try {
      const products = await productModel.find({});
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
  async createProduct(req, res) {
    const newProduct = new productModel({
      name: req.body.name,
      price: Number(req.body.price),
      category: +req.body.category,
      image: req.body.image,
      description: req.body.description || "",
      title_description_1: req.body.description,
      title_description_2: req.body.description,
      sale: req.body.sale || 0,
    });
    try {
      await newProduct.save();
      res.status(201).json(newProduct);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error.message });
    }
  }
  async deleteProduct(req, res) {
    const { id } = req.params;
    await productModel.findByIdAndDelete(id);
    return res.status(200).json({ message: "Product deleted successfully" });
  }
  async updateProduct(req, res) {
    const { productId } = req.params;

    const updatedProduct = await productModel.findByIdAndUpdate(
      productId,
      req.body,
      {
        new: true,
      }
    );
    return res.status(200).json(updatedProduct);
  }
  async createOrder(req, res) {
    try {
      const { userId } = req.body;
      const user = await userModel.findById(userId);
      if (user) {
        user.orders.push(req.body);
        await user.save();
      }
      const newOrder = await orderModel(req.body).save();
      return res.status(201).json(newOrder);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
  async getProductById(req, res) {
    const { category_id } = req.params;
    const getProducts = await productModel.find({
      category: Number(category_id),
    });
    return res.json(getProducts);
  }
  async getLimitedProducts(req, res) {
    const getProducts = await productModel.find().limit(10);
    return res.json(getProducts);
  }
}
module.exports = new ProductController();
