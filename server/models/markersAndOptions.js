const mongoose = require("mongoose")

const mschema = mongoose.Schema({
	optionName: String,
	file_path: String,
	description: String,
	isMarker : Boolean,
},{
  timestamps: true
})

module.exports = mongoose.model("markersAndOptions", mschema)