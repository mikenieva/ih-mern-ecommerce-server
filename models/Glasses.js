// ./server/models/Glasses.js

const mongoose = require("mongoose")

const glassesSchema = mongoose.Schema({
	nombre: {
		type: "String",
		required: true
	},
	color: {
		type: "String"
	},
	descripcion: {
		type: "String"
	},
	precioID: {
		type: String,
		required: true
	},
	productoID: {
		type: String,
		required: true
	},
	img: {
		type: String,
	}
})

const Glasses = mongoose.model("Glasses", glassesSchema)

module.exports = Glasses

