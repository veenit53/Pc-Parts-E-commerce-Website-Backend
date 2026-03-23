const Product = require("../../models/product.model")

exports.createProduct = async (req,res)=>{

  try{

    const {
      name,
      brand,
      category,
      price,
      stock,
      description,
      image
    } = req.body

    const product = await Product.create({
      name,
      brand,
      category,
      price,
      stock,
      description,
      image
    })

    res.status(201).json({
      success:true,
      message:"Product created successfully",
      product
    })

  }
  catch(error){

    res.status(500).json({
      success:false,
      message:"Product creation failed",
      error:error.message
    })

  }

}

exports.getProducts = async (req,res)=>{

  try{

    const products = await Product.find()

    res.json({
      success:true,
      products
    })

  }
  catch(error){

    res.status(500).json({
      success:false,
      message:"Failed to fetch products"
    })

  }

}

exports.getProductById = async (req,res)=>{

  try{

    const product = await Product.findById(req.params.id)

    if(!product){
      return res.status(404).json({
        success:false,
        message:"Product not found"
      })
    }

    res.json({
      success:true,
      product
    })

  }
  catch(error){

    res.status(500).json({
      success:false,
      message:"Failed to fetch product"
    })

  }

}

exports.updateProduct = async (req,res)=>{

  try{

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {new:true}
    )

    res.json({
      success:true,
      message:"Product updated",
      product
    })

  }
  catch(error){

    res.status(500).json({
      success:false,
      message:"Product update failed"
    })

  }

}

exports.deleteProduct = async (req,res)=>{

  try{

    await Product.findByIdAndDelete(req.params.id)

    res.json({
      success:true,
      message:"Product deleted"
    })

  }
  catch(error){

    res.status(500).json({
      success:false,
      message:"Product delete failed"
    })

  }

}

exports.searchProducts = async (req,res)=>{

  try{

    const query = req.query.q

    const products = await Product.find({
      name: { $regex: query, $options: "i" }
    })

    res.json({
      success:true,
      products
    })

  }
  catch(error){

    res.status(500).json({
      success:false,
      message:"Search failed"
    })

  }

}