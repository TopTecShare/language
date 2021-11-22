const mongoose = require('mongoose')

const Schema = mongoose.Schema

const EstateSchema = new Schema({
	id: Schema.Types.ObjectId,
	project_code: String,
	project: String,
	unit_type: String,
	dev_name: String,
	location: String,
	unit_number: String,
	purpose: String,
	type: String,
	area_sq_ft: Number,
	area_sq_m: Number,
	rate_per_sqm: Number,
	annual_rent: Number,
	sell_price: Number,
	serv_charge: String,
	f_out_depos: Number,
	secu_depos: Number,
	chilled_water_depos: Number,
	rent_com_fee_sell_com_fee: Number,
	com_type: String,
	unit_view: String,
	grace_period: Number,
	vat_on_rate: Number,
	vat_on_taf: Number,
	location_map: String
})

const Estate = mongoose.model('estate', EstateSchema)
module.exports = Estate