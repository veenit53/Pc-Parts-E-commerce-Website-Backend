const Order = require("../../models/order.model")
const Cart = require("../../models/cart.model")

exports.createOrder = async (req,res)=>{

  try{

    const userId = req.user.id

    const cart = await Cart
      .findOne({user:userId})
      .populate("items.product")

    if(!cart || cart.items.length === 0){
      return res.status(400).json({
        success:false,
        message:"Cart is empty"
      })
    }

    const orderItems = cart.items.map(item => ({
      product: item.product._id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      image: item.product.image
    }))

    const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

    const tax = Math.round(subtotal * 0.08) // 10% tax
    const shippingFee = subtotal > 1000 ? 0 : 99 // free shipping for orders over 1,000

    const totalAmount = subtotal + tax + shippingFee


    const order = await Order.create({

      user:userId,

      items:orderItems,

      subtotal,
      tax,
      shipping: shippingFee,
      totalAmount,

      shippingAddress:req.body.shippingAddress,

      paymentMethod:req.body.paymentMethod || "COD"

    })

    cart.items = []
    await cart.save()

    res.status(201).json({
      success:true,
      message:"Order placed successfully",
      order
    })

  }
  catch(error){

    res.status(500).json({
      success:false,
      message:"Failed to create order",
      error:error.message
    })

  }

}

exports.getMyOrders = async (req,res)=>{

  try{

    const orders = await Order
      .find({user:req.user.id})
      .sort({createdAt:-1})

    res.status(200).json({
      success:true,
      count:orders.length,
      orders
    })

  }
  catch(error){

    res.status(500).json({
      success:false,
      message:"Failed to fetch orders",
      error:error.message
    })

  }

}

exports.getOrderById = async (req,res)=>{

  try{

    const order = await Order
      .findById(req.params.id)

    if(!order){
      return res.status(404).json({
        success:false,
        message:"Order not found"
      })
    }

    // SECURITY: only owner can access
    if(order.user.toString() !== req.user.id){
      return res.status(403).json({
        success:false,
        message:"Not authorized"
      })
    }

    res.status(200).json({
      success:true,
      order
    })

  }
  catch(error){

    res.status(500).json({
      success:false,
      message:"Failed to fetch order",
      error:error.message
    })

  }

}