const { v4: uuidv4 } = require('uuid');
const { faker } = require('@faker-js/faker');
const { client } = require('../config/database');
const logger = require('./logger');

async function seedData() {
  try {
    // Generate and insert departments
    const departments = Array.from({ length: 5 }, (_, i) => ({
      department_id: i + 1,
      name: `${faker.commerce.department()} Department`,
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
    logger.info('Departments seeded successfully');

    // Generate and insert courses
    const courses = [];
    for (const dept of departments) {
      const deptCourses = Array.from({ length: 4 }, () => ({
        course_id: uuidv4(),
        department_id: dept.department_id,
        code: faker.string.alpha({ length: 3, casing: 'upper' }) + faker.number.int({ min: 100, max: 499 }),
        title: faker.company.catchPhrase(),
        credits: faker.number.int({ min: 1, max: 4 }),
        professor_id: uuidv4(),
        semester: ['Fall', 'Spring', 'Summer'][faker.number.int({ min: 0, max: 2 })],
        year: 2023
      }));
      courses.push(...deptCourses);
    }

    const courseQuery = `
      INSERT INTO courses (course_id, department_id, code, title, credits, professor_id, semester, year)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    for (const course of courses) {
      await client.execute(courseQuery, Object.values(course), { prepare: true });
    }
    logger.info('Courses seeded successfully');

    // Generate and insert students
    const students = [];
    for (const dept of departments) {
      const deptStudents = Array.from({ length: 10 }, () => ({
        student_id: uuidv4(),
        department_id: dept.department_id,
        first_name: faker.person.firstName(),
        last_name: faker.person.lastName(),
        email: faker.internet.email(),
        age: faker.number.int({ min: 18, max: 30 }),
        enrollment_date: faker.date.past()
      }));
      students.push(...deptStudents);
    }

    const studentQuery = `
      INSERT INTO students (student_id, department_id, first_name, last_name, email, age, enrollment_date)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    for (const student of students) {
      await client.execute(studentQuery, Object.values(student), { prepare: true });
    }
    logger.info('Students seeded successfully');

    // Generate and insert enrollments
    const enrollments = [];
    for (const student of students) {
      const studentCourses = courses
        .filter(c => c.department_id === student.department_id)
        .slice(0, faker.number.int({ min: 1, max: 3 }));
      
      for (const course of studentCourses) {
        enrollments.push({
          student_id: student.student_id,
          course_id: course.course_id,
          enrollment_date: faker.date.past(),
          status: ['Enrolled', 'Completed', 'In Progress'][faker.number.int({ min: 0, max: 2 })],
          grade: ['A', 'B', 'C', 'D', 'F'][faker.number.int({ min: 0, max: 4 })]
        });
      }
    }

    const enrollmentQuery = `
      INSERT INTO student_enrollments (student_id, course_id, enrollment_date, status, grade)
      VALUES (?, ?, ?, ?, ?)
    `;

    for (const enrollment of enrollments) {
      await client.execute(enrollmentQuery, Object.values(enrollment), { prepare: true });
    }
    logger.info('Enrollments seeded successfully');

    logger.info('All data seeded successfully');
  } catch (err) {
    logger.error('Error seeding data:', err.message);
    throw err;
  }
}

module.exports = { seedData };