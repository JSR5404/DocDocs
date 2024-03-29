const router = require("express").Router();
const { Medications }= require("../../models");
const { authChecker } = require('../../utils/helpers');

router.post('/', authChecker, async (req, res) => {
    try {
      const newProject = await Medications.create({
        ...req.body
        // user_id: req.session.user_id,
      });
  
      res.status(200).json(newProject);
    } catch (err) {
      res.status(400).json(err);
    }
  });


  
  router.get('/:medicationName', authChecker, async (req, res) => {
    // console.log("condition-search-route");
    try {
      let name = req.params.medicationName;
      console.log(name);
  
      const medicationData = await Medications.findAll({
        where: {
          name:name
        }
      });
        const medication = medicationData.map((data) => data.get({plain:true}));
      // const newProject = await Condition.create({
      //   ...req.body
      //   // user_id: req.session.user_id,
      // });
  
      res.status(200).json(medicationData);
      // res.render("conditions", {condition});
    } catch (err) {
      res.status(400).json(err);
    }
  });



module.exports = router;