const { Router } = require("express")
const router = Router()
const ProductManager = require('../managers/productManager');

// Devuelve todos los productos del json o con una limitacion.
router.get("/", async (req, res) => {
    const product = new ProductManager()
    const productsList = await product.getProducts();

    const limit = req.query.q;
    if (limit) {
        const limitedProducts = productsList.slice(0, parseInt(limit));
        // Muestra solo hasta el limite agregado.
        res.status(200).json({ status: "ok", data: limitedProducts })
    } else {
        // Muestra todos los productos:
        res.status(200).json({ status: "ok", data: productsList })
    }
})

// Devuelve el producto con el id ingresado por los parametros.
router.get("/:pid", async (req, res) => {
    const product = new ProductManager()
    const id = parseInt(req.params.pid)
    const productId = await product.getProductById(id)

    res.status(200).json({ status: "ok", data: productId })
})

// Agrega un nuevo producto al json.
router.post("/", async (req, res) => { 
    const product = new ProductManager()
    const productsList = await product.getProducts();
    const newProduct = req.body
    newProduct.id = Math.random()
    productsList.push(newProduct)
    console.log(productsList)

    res.status(200).json({ status: "ok", data: [] })
})


module.exports = router