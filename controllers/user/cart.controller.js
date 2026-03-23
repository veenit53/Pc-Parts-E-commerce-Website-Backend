const Cart = require("../../models/cart.model")

// GET USER CART

exports.getCart = async (req,res)=>{

  try{

    const cart = await Cart.findOne({user:req.user._id})
      .populate("items.product")

    if(!cart){
      return res.json({
        success:true,
        items:[]
      })
    }

    res.json({
      success:true,
      items:cart.items
    })

  }catch(error){

    res.status(500).json({
      success:false,
      message:"Failed to fetch cart"
    })

  }

}



// ADD TO CART

exports.addToCart = async (req,res)=>{

  try{

    const {productId} = req.body

    let cart = await Cart.findOne({user:req.user._id})

    if(!cart){

      cart = await Cart.create({
        user:req.user._id,
        items:[{product:productId,quantity:1}]
      })

    }else{

      const existing = cart.items.find(
        i => i.product.toString() === productId
      )

      if(existing){

        existing.quantity += 1

      }else{

        cart.items.push({
          product:productId,
          quantity:1
        })

      }

      await cart.save()

    }

    res.json({
      success:true,
      cart
    })

  }catch(error){

    res.status(500).json({
      success:false,
      message:"Add to cart failed"
    })

  }

}



// UPDATE QUANTITY

exports.updateQuantity = async (req,res)=>{

  try{

    const {productId,quantity} = req.body

    const cart = await Cart.findOne({user:req.user._id})

    const item = cart.items.find(
      i => i.product.toString() === productId
    )

    if(item){
      if(quantity <= 0){
        cart.items = cart.items.filter(
          i => i.product.toString() !== productId
        )
      }else{
        item.quantity = quantity
      }
    }

    await cart.save()

    res.json({
      success:true
    })

  }catch(error){

    res.status(500).json({
      success:false,
      message:"Update failed"
    })

  }

}



// REMOVE ITEM

exports.removeItem = async (req,res)=>{
  try{

    const {productId} = req.params

    let cart = await Cart.findOne({user:req.user._id})

    if(!cart){
      return res.json({
        success:true,
        items:[]
      })
    }

    cart.items = cart.items.filter(
      i => i.product.toString() !== productId
    )

    await cart.save()

    // ✅ RETURN UPDATED CART
    const updatedCart = await Cart.findOne({user:req.user._id})
      .populate("items.product")

    res.json({
      success:true,
      items:updatedCart.items
    })

  }catch(error){
    res.status(500).json({
      success:false
    })
  }
}