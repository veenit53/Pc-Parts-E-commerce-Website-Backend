const express = require("express")
const router = express.Router()

const authMiddleware = require("../../middlewares/auth.middleware")

const {
  getCart,
  addToCart,
  updateQuantity,
  removeItem
} = require("../../controllers/user/cart.controller")


router.get("/cart",authMiddleware,getCart)

router.post("/cart/add",authMiddleware,addToCart)

router.put("/cart/update",authMiddleware,updateQuantity)

router.delete("/cart/:productId",authMiddleware,removeItem)


module.exports = router