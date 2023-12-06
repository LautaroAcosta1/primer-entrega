const fs = require("fs")

path = "src/products.json"

class ProductManager {

    quantyProductId = 0

    constructor() {
        this.path = path
        this.products = [];
    }


    async addProduct(title, description, price, thumbnail, code, stock, status, category) {
        if(title != "" && description!= "" && category!= "" && price != null && code !== null && typeof code === 'string' && stock != null && typeof status === 'boolean'){
            let id = 0;
            for (let i = 0; i < this.products.length; i++) {
                const element = this.products[i];

                if(element.id > id) {
                id = element.id;
                }
            }

            id++
            status = typeof status === 'boolean' ? status : true
            code = code
            const codeAlready = this.products.some((x) => (x.code == code));

            if (codeAlready){
                console.error("Ya existe un producto con este código!");
                return;
            }

            this.products.push({id:id, title, category, description, price, thumbnail, code, stock, status, path})
            const productsString = JSON.stringify(this.products, null, 4);
            await fs.promises.writeFile(this.path, productsString);
        }else {
            console.log("Ingrese datos validos!");
        }
    }


    async getProducts() {
        let productsOnFile = await fs.promises.readFile(this.path, "utf-8")
        productsOnFile = JSON.parse(productsOnFile)
        return productsOnFile
    }


    async getProductById(id) {
        let productsOnFile = await fs.promises.readFile(this.path, "utf-8")
        productsOnFile = JSON.parse(productsOnFile)
        const product = productsOnFile.find(product => product.id === id)
        if (product) {
            return product;
        } else {
            return "Not found";
        }
    }


    async updateProduct(id, updatedProduct) {    
        const index = this.products.findIndex((product) => product.id === id);

        if (index !== -1) {
        // Validar que los campos necesarios estén presentes en updatedProduct antes de actualizar excepto thumbnail agregado en pre entrega
        if (updatedProduct.title && updatedProduct.description && updatedProduct.price && updatedProduct.thumbnail && updatedProduct.code && updatedProduct.stock) {
            this.products[index] = {
            id: id,
            title: updatedProduct.title,
            description: updatedProduct.description,
            price: updatedProduct.price,
            thumbnail: updatedProduct.thumbnail,
            code: updatedProduct.code,
            stock: updatedProduct.stock,
            };

            this.writeToFile();        
            return { success: true, message: `Producto con ID ${id} actualizado con éxito.` };
        } else {
            console.log("Todos los campos son requeridos para la actualización.");
            return { success: false, message: `Todos los campos son requeridos para la actualización.` };      
        }
        } else {
        
        return { success: false, message: `No se encontró un producto con ID ${id}.`};      
        }
    }


    async deleteProduct(id) {
        const index = this.products.findIndex((product) => product.id === id);
    
        if (index !== -1) {
        this.products.splice(index, 1);
        this.writeToFile();      
        return { success: true, message: `Producto con ID ${id} eliminado con éxito.` };
        } else {      
        return { success: false, message: `No se encontró un producto con ID ${id}.` };
        }
    }

}



module.exports = ProductManager