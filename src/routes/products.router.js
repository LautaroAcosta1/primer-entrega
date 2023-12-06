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
    let newProduct = req.body;
    await product.addProduct(newProduct.title,newProduct.category,newProduct.description,newProduct.price,newProduct.thumbnail,newProduct.code,newProduct.stock,newProduct.status)
    res.status(200).send("Producto agregado con exito!")
})

// ActuaLiza el producto por los campos enviados desde el body.
.put('/:id', async (req, res) => {
    const product = new ProductManager()
    const productId = parseInt(req.params.id);

    if (isNaN(productId)) {
        return res.status(400).json({ error: 'ID no válido.' });
    }
    const updatedProductData = req.body;
    await product.updateProduct(productId, updatedProductData);
    res.json({ message: `Producto con ID ${productId} actualizado con éxito.` });
})

// Elimina el producto ingresado por el id.
.delete('/:id', async (req, res) => {
    const product = new ProductManager()
    const productId = parseInt(req.params.id);
    if (isNaN(productId)) {
        return res.status(400).json({ error: 'ID no válido.' });
    }
    //devolvemos respuesta  desde el metodo del deletePorduct ProductManager 
    res.json(await product.deleteProduct(productId));

})

module.exports = router