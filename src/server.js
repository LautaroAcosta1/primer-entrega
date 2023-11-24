const express = require('express')
const app = express()
const port = 8080
const ProductManager = require('./product');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Devuelve todos los productos del json o con una limitacion.
app.get("/", async (req, res) => {
    const product = new ProductManager()
    const productsList = await product.getProducts();

    const limit = req.query.q;
    if (limit) {
        const limitedProducts = productsList.slice(0, parseInt(limit));
        // Muestra solo hasta el limite agregado.
        res.send(limitedProducts)
    } else {
        // Muestra todos los productos:
        res.send(productsList);
    }

    res.status(200).json({ status: "ok", data: productsList })
})

// Devuelve el producto con el id ingresado por los parametros.
app.get("/:pid", async (req, res) => {
    const product = new ProductManager()
    const id = parseInt(req.params.pid)
    const productId = await product.getProductById(id)

    res.status(200).json({ status: "ok", data: productId })
})

// Agrega un nuevo producto al json.
app.post("/", async (req, res) => { 
    const product = new ProductManager()
    const productsList = await product.getProducts();
    const newProduct = req.body
    newProduct.id = Math.random()
    productsList.push(newProduct)
    console.log(newProduct)

    res.status(200).json({ status: "ok", data: [] })
})




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})