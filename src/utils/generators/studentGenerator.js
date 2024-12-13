const { faker } = require('@faker-js/faker');

function generateStudentData(count = 100) {
  return Array.from({ length: count }, (_, index) => ({
    student_id: index + 1,
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    age: faker.number.int({ min: 18, max: 30 }),
    enrollment_date: faker.date.past(),
    department: faker.number.int({ min: 1, max: 10 }),
    course: faker.number.int({ min: 1, max: 50 })
  }));
}

module.exports = { generateStudentData };