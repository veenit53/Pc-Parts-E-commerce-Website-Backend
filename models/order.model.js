const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      },
      name: String,
      price: Number,
      quantity: Number,
      image: String
    }
  ],

  subtotal: {
    type: Number,
    required: true
  },

  tax: Number,
  shipping: Number,

  totalAmount: {
    type: Number,
    required: true
  },

  shippingAddress: {
    address: String,
    city: String,
    country: String,
    postalCode: String
  },

  paymentMethod: {
    type: String,
    default: "COD"
  },

  status: {
    type: String,
    enum: ["Pending","Processing","Shipped","Delivered","Cancelled"],
    default: "Pending"
  }

},{
  timestamps:true
})

module.exports = mongoose.model("Order",orderSchema)