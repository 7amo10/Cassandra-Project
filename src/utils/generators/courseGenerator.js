const { faker } = require('@faker-js/faker');

function generateCourseData(count = 50) {
  const semesters = ['Fall', 'Spring', 'Summer'];
  return Array.from({ length: count }, (_, index) => ({
    dept_id: faker.number.int({ min: 1, max: 10 }),
    course_id: index + 1,
    professor_id: faker.number.int({ min: 1, max: 50 }),
    course_code: faker.string.alpha({ length: 3, casing: 'upper' }) + 
                 faker.number.int({ min: 100, max: 499 }),
    title: faker.company.catchPhrase(),
    credits: faker.number.int({ min: 1, max: 4 }),
    semester: semesters[faker.number.int({ min: 0, max: 2 })],
    year: faker.number.int({ min: 2023, max: 2024 })
  }));
}

module.exports = { generateCourseData };