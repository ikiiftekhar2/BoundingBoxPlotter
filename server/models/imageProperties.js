const mongoose = require("mongoose")

const ischema = mongoose.Schema({
	title: String,
	content: String,
})

module.exports = mongoose.model("", ischema)