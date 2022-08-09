const express = require("express")
const mongoose = require("mongoose") // new
const routes = require("./router/routers")
// Connect to MongoDB database
mongoose
	.connect("mongodb://localhost:27017/boundingBox", { useNewUrlParser: true })
	.then(() => {
		const app = express()
		app.use(express.static(__dirname));
		app.use("/api", routes)

		app.listen(5000, () => {
			console.log("Server has started!")
		})
	})