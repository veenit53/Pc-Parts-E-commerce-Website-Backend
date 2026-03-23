const express = require("express")
const router = express.Router()

const { createOrder, getMyOrders, getOrderById  } = require("../../controllers/user/order.controller")
const authMiddleware = require("../../middlewares/auth.middleware")


// CREATE ORDER
router.post("/orders", authMiddleware, createOrder)
// GET MY ORDERS
router.get("/my-orders", authMiddleware, getMyOrders)
// GET ORDER BY ID
router.get("/orders/:id", authMiddleware, getOrderById)

module.exports = router