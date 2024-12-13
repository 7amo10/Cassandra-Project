const { faker } = require('@faker-js/faker');

function generateDepartmentData(count = 10) {
  return Array.from({ length: count }, (_, index) => ({
    dept_id: index + 1,
    dept_name: faker.commerce.department(),
    location: faker.location.buildingNumber() + ' ' + faker.location.street(),
    head_professor_id: faker.number.int({ min: 1, max: 50 })
  }));
}

module.exports = { generateDepartmentData };