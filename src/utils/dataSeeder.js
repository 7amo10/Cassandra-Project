const { v4: uuidv4 } = require('uuid');
const { faker } = require('@faker-js/faker');
const { client } = require('../config/database');
const logger = require('./logger');

async function seedData() {
  try {
    // Generate and insert departments
    const departments = Array.from({ length: 5 }, (_, i) => ({
      department_id: i + 1,
      name: faker.commerce.department(),
      location: `${faker.location.buildingNumber()} ${faker.location.street()}`,
      head_professor_id: uuidv4()
    }));

    const departmentQuery = `
      INSERT INTO departments (department_id, name, location, head_professor_id)
      VALUES (?, ?, ?, ?)
    `;

    for (const dept of departments) {
      await client.execute(departmentQuery, Object.values(dept), { prepare: true });
    }

    // Generate and insert courses
    const courses = Array.from({ length: 20 }, () => ({
      course_id: uuidv4(),
      department_id: faker.number.int({ min: 1, max: 5 }),
      code: faker.string.alpha({ length: 3, casing: 'upper' }) + faker.number.int({ min: 100, max: 499 }),
      title: faker.company.catchPhrase(),
      credits: faker.number.int({ min: 1, max: 4 }),
      professor_id: uuidv4(),
      semester: ['Fall', 'Spring', 'Summer'][faker.number.int({ min: 0, max: 2 })],
      year: 2023
    }));

    const courseQuery = `
      INSERT INTO courses (course_id, department_id, code, title, credits, professor_id, semester, year)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    for (const course of courses) {
      await client.execute(courseQuery, Object.values(course), { prepare: true });
    }

    // Generate and insert students
    const students = Array.from({ length: 50 }, () => ({
      student_id: uuidv4(),
      department_id: faker.number.int({ min: 1, max: 5 }),
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      age: faker.number.int({ min: 18, max: 30 }),
      enrollment_date: faker.date.past()
    }));

    const studentQuery = `
      INSERT INTO students (student_id, department_id, first_name, last_name, email, age, enrollment_date)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    for (const student of students) {
      await client.execute(studentQuery, Object.values(student), { prepare: true });
    }

    logger.info('Data seeding completed successfully');
  } catch (err) {
    logger.error('Error seeding data:', err.message);
    throw err;
  }
}

module.exports = { seedData };