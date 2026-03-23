const Order = require("../../models/order.model")

// GET ALL ORDERS FOR ADMIN
exports.getAllOrders = async (req,res)=>{

  try{

    const orders = await Order
      .find()
      .populate("user","name email")
      .sort({createdAt:-1})

    res.status(200).json({
      success:true,
      count: orders.length,
      orders
    })

  }
  catch(error){

    res.status(500).json({
      success:false,
      message:"Failed to fetch orders",
      error: error.message
    })

  }

}



// UPDATE ORDER STATUS
exports.updateOrderStatus = async (req,res)=>{

  try{

    const {status} = req.body

    const allowedStatus = [
      "Pending",
      "Processing",
      "Shipped",
      "Delivered",
      "Cancelled"
    ]

    if(!allowedStatus.includes(status)){
      return res.status(400).json({
        success:false,
        message:"Invalid order status"
      })
    }

    const order = await Order.findById(req.params.id)

    if(!order){
      return res.status(404).json({
        success:false,
        message:"Order not found"
      })
    }

    order.status = status
    await order.save()

    res.status(200).json({
      success:true,
      message:"Order status updated",
      order
    })

  }
  catch(error){

    res.status(500).json({
      success:false,
      message:"Unable to update order",
      error: error.message
    })

  }

}