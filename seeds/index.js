const sequelize = require('../config/connection');
const { Patients, Project } = require('../models');

const patientsData = require('./patientsData.json');
const conditionData = require('./conditionData.json');
const medicationData = require('./medicationData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const patients = await User.bulkCreate(patientsData, {
    individualHooks: true,
    returning: true,
  });

  for (const project of conditionData) {
    await Project.create({
      ...project,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
