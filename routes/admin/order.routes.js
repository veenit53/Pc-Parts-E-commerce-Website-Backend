const express = require("express")
const router = express.Router()

const {
  getAllOrders,
  updateOrderStatus
} = require("../../controllers/admin/order.controller")

router.get("/admin/orders",getAllOrders)
router.put("/admin/orders/:id/status",updateOrderStatus)

module.exports = router