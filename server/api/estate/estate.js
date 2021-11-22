const express = require("express");

const router = express.Router();

const estate = require("../../models/estate");

router.get("/", (req, res) => {
  estate
    .find()
    .then((estates) => {
      res.json(estates);
    })
    .catch((err) => res.json({ error: "No estate" }));
});

router.post("/", (req, res) => {
  const newEstate = new estate({
    project_code: req.body.project_code,
    project: req.body.project,
    unit_type: req.body.unit_type,
    dev_name: req.body.dev_name,
    location: req.body.location,
    unit_number: req.body.unit_number,
    purpose: req.body.purpose,
    type: req.body.type,
    area_sq_ft: Number(req.body.area_sq_ft),
    area_sq_m: Number(req.body.area_sq_m),
    rate_per_sqm: Number(req.body.rate_per_sqm),
    annual_rent: Number(req.body.annual_rent),
    sell_price: Number(req.body.sell_price),
    serv_charge: req.body.serv_charge,
    f_out_depos: Number(req.body.f_out_depos),
    secu_depos: Number(req.body.secu_depos),
    chilled_water_depos: req.body.chilled_water_depos,
    rent_com_fee_sell_com_fee: Number(req.body.rent_com_fee_sell_com_fee),
    com_type: req.body.com_type,
    unit_view: req.body.unit_view,
    grace_period: Number(req.body.grace_period),
    vat_on_rate: Number(req.body.vat_on_rate),
    vat_on_taf: req.body.vat_on_taf,
    location_map: req.body.location_map,
  });
  newEstate.save().then((result) => {
    res.json(result);
  });
});

router.delete("/:id", (req, res) => {
  estate.findOneAndDelete({ _id: req.params.id }, (err, result) => {
    res.json({ msg: "Deleted successfully" });
  });
});

router.post("/update/:id", (req, res) => {
  let myquery = { _id: req.params.id };

  let newvalues = {
    $set: {
      project_code: req.body.project_code,
      project: req.body.project,
      unit_type: req.body.unit_type,
      dev_name: req.body.dev_name,
      location: req.body.location,
      unit_number: req.body.unit_number,
      purpose: req.body.purpose,
      type: req.body.type,
      area_sq_ft: Number(req.body.area_sq_ft),
      area_sq_m: Number(req.body.area_sq_m),
      rate_per_sqm: Number(req.body.rate_per_sqm),
      annual_rent: Number(req.body.annual_rent),
      sell_price: Number(req.body.sell_price),
      serv_charge: req.body.serv_charge,
      f_out_depos: Number(req.body.f_out_depos),
      secu_depos: Number(req.body.secu_depos),
      chilled_water_depos: req.body.chilled_water_depos,
      rent_com_fee_sell_com_fee: Number(req.body.rent_com_fee_sell_com_fee),
      com_type: req.body.com_type,
      unit_view: req.body.unit_view,
      grace_period: Number(req.body.grace_period),
      vat_on_rate: Number(req.body.vat_on_rate),
      vat_on_taf: req.body.vat_on_taf,
      location_map: req.body.location_map,
    },
  };
  estate.updateOne(myquery, newvalues, function (err, user) {
    if (err) res.json({ message: err });
    res.json(req.body);
  });
});

router.post("/getbycode", (req, res) => {
  estate
    .find({ project_code: req.body.title })
    .then((units) => res.json(units));
});

module.exports = router;
