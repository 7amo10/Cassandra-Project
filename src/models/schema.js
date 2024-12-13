const { client } = require('../config/database');
const logger = require('../utils/logger');

const createSchema = async () => {
  const queries = [
    `CREATE KEYSPACE IF NOT EXISTS student_management 
     WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1}`,
    
    'USE student_management',
    
    // Students table - Primary partition by department_id for efficient department-based queries
    `CREATE TABLE IF NOT EXISTS students (
      student_id uuid,
      department_id int,
      first_name text,
      last_name text,
      email text,
      age int,
      enrollment_date timestamp,
      PRIMARY KEY ((department_id), student_id)
    )`,

    // Departments table
    `CREATE TABLE IF NOT EXISTS departments (
      department_id int,
      name text,
      location text,
      head_professor_id uuid,
      PRIMARY KEY (department_id)
    )`,

    // Courses table
    `CREATE TABLE IF NOT EXISTS courses (
      course_id uuid,
      department_id int,
      code text,
      title text,
      credits int,
      professor_id uuid,
      semester text,
      year int,
      PRIMARY KEY ((department_id), course_id)
    )`,

    // Student enrollments - Track student's course enrollments
    `CREATE TABLE IF NOT EXISTS student_enrollments (
      student_id uuid,
      course_id uuid,
      enrollment_date timestamp,
      status text,
      grade text,
      PRIMARY KEY ((student_id), course_id)
    )`,

    // Secondary index for student email lookups
    `CREATE INDEX IF NOT EXISTS idx_student_email ON students (email)`,

    // Secondary index for course code lookups
    `CREATE INDEX IF NOT EXISTS idx_course_code ON courses (code)`
  ];

  try {
    for (const query of queries) {
      await client.execute(query);
    }
    logger.info('Schema created successfully');
  } catch (err) {
    logger.error('Schema creation failed:', err.message);
    throw err;
  }
};

module.exports = { createSchema };