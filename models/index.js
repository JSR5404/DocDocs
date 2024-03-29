//how to create foreign key?


const Users = require("./Users");
const Condition = require("./Conditions");
const Patients = require("./Patients");
const Medications = require("./Medications");


Patients.hasMany(Medications, {
  foreignKey: "medication_id",
});

Condition.hasMany(Patients, {
  foreignKey: "condition_id",
});


Medications.belongsTo(Patients, {
  foreignKey: "medication_id",
});

Patients.belongsTo(Condition, {
  foreignKey: "condition_id",
});




module.exports = { Users, Condition, Patients, Medications };
