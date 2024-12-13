const { faker } = require('@faker-js/faker');

function generateEnrollmentData(count = 200) {
  const statuses = ['Active', 'Dropped', 'Completed', 'Waitlisted'];
  return Array.from({ length: count }, (_, index) => ({
    enrollment_id: index + 1,
    student_id: faker.number.int({ min: 1, max: 1000 }),
    course_id: faker.number.int({ min: 1, max: 50 }),
    enrollment_date: faker.date.past(),
    status: statuses[faker.number.int({ min: 0, max: 3 })]
  }));
}

module.exports = { generateEnrollmentData };