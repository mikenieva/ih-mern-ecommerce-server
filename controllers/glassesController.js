const Glasses = require('../models/Glasses');

// ./server/controllers/glassesController.js
const stripe = require('stripe')(process.env.STRIPE_SK);

exports.create = async (req, res) => {

	// CAPTURAR LOS DATOS QUE VENGAN DEL FORMULARIO
	const { nombre, color, descripcion, img, precio } = req.body

	// 1. STRIPE
	// NUEVO PRODUCTO
	const newProductStripe = await stripe.products.create({
		name: nombre,
		description: descripcion,
		images: [img],
		metadata: {
			"color": color
		}
	  })

	  console.log(newProductStripe)

	// NUEVO PRECIO
	const newProductStripeID 			= newProductStripe.id
	const newProductStripeName			= newProductStripe.name
	const newProductStripeDescription	= newProductStripe.description
	const newProductStripeMetadataColor = newProductStripe.metadata.color

	const price = await stripe.prices.create({
		unit_amount: precio,
		currency: 'usd',
		product: newProductStripeID,
		nickname: newProductStripeDescription
	});

	console.log("precio final de stripe:", price)

	const newProductPriceID = price.id

	// 2. MONGODB
	// GUARDAR PRODUCTO EN BASE DE DATOS (YA CON DATOS DE STRIPE)
	
	const newGlasses = await Glasses.create({
		nombre: newProductStripeName,
		color: newProductStripeMetadataColor,
		descripcion: newProductStripeDescription,
		precioID: newProductPriceID,
		productoID: newProductStripeID,
		img: img
	})

	console.log("Lentes creados en MONGODB:", newGlasses)

	res.json({
		msg: "Lentes creados con éxito",
		data: newGlasses
	})
}

exports.getOne = async (req, res) => {

	const { glassesID } = req.params

	try {

		const glasses = await Glasses.findById(glassesID)

		res.json({
			msg: "Lentes obtenidos con éxito.",
			data: glasses
		})

	} catch (error) {

		console.log(error)

		res.status(500).json({
			msg: "Hubo un error obteniendo los datos."
		})
	}
}

exports.getAll = async (req, res) => {

	try {

		const glasses = await Glasses.find({})

		res.json({
			msg: "Lentes obtenidos con éxito.",
			data: glasses
		})


	} catch (error) {

		console.log(error)

		res.status(500).json({
			msg: "Hubo un error obteniendo los datos"
		})

	}

}