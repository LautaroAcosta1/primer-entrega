const fs = require("fs")

class ProductManager {

    products = []
    quantyProductId = 0

    constructor() {}

    async addProduct(title, description, code, price, status, stock, category, thumbnails) {
        const productId = ++this.quantyProductId
        this.products.push({id: productId, title, description, code, price, status, stock, category, thumbnails})
        const productsString = JSON.stringify(this.products, null, 4)
        await fs.promises.writeFile("src/products.json", productsString)
    }

    async getProducts() {
        let productsOnFile = await fs.promises.readFile("src/products.json", "utf-8")
        productsOnFile = JSON.parse(productsOnFile)
        return productsOnFile
    }

    async getProductById(id) {
        let productsOnFile = await fs.promises.readFile("src/products.json", "utf-8")
        productsOnFile = JSON.parse(productsOnFile)
        const product = productsOnFile.find(product => product.id === id)
        if (product) {
            return product;
        } else {
            return "Not found";
        }
    }

    async updateProduct(id, updatedProduct) {
        let productsOnFile = await fs.promises.readFile("src/products.json", "utf-8");
        this.products = JSON.parse(productsOnFile);

        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            updatedProduct.id = id;
            this.products[index] = updatedProduct;
            const productsString = JSON.stringify(this.products, null, 4);
            await fs.promises.writeFile("src/products.json", productsString);
            return this.products[index];
        } else {
            return "Not found";
        }
    }

    async deleteProduct(id) {
        let productsOnFile = await fs.promises.readFile("src/products.json", "utf-8")
        productsOnFile = JSON.parse(productsOnFile)

        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            this.products.splice(index, 1);
            const productsString = JSON.stringify(this.products, null, 4);
            await fs.promises.writeFile("src/products.json", productsString);
            return "Product deleted";
        } else {
            return "Not found";
        }
    }
}

module.exports = ProductManager