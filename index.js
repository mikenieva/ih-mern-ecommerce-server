// ./server/index.js
const express = require("express")
const app = express()

const connectDB = require("./config/db")

require("dotenv").config()

const cors = require("cors")

connectDB()

app.use(cors())
app.use(express.json())

app.use("/api/checkout", require("./routes/checkout"))
app.use("/api/glasses", require("./routes/glasses"))

app.listen(process.env.PORT, () => {
	console.log(`Servidor trabajando en ${process.env.PORT}`)
})