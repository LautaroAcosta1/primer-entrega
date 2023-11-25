const express = require('express')
const app = express()
const port = 8080
const productRouter = require("./routes/products.router")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/api/products", productRouter)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})