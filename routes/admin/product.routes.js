const express = require("express")
const router = express.Router()

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  searchProducts
} = require("../../controllers/admin/product.controller")

router.post("/admin/products", createProduct)

router.get("/products", getProducts)

router.get("/products/search", searchProducts)

router.get("/products/:id", getProductById)

router.put("/admin/products/:id", updateProduct)

router.delete("/admin/products/:id", deleteProduct)

module.exports = router