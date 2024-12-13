const { client } = require('../config/database');
const logger = require('../utils/logger');

const createSchema = async () => {
  const queries = [
    `CREATE KEYSPACE IF NOT EXISTS student_management 
     WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1}`,
    
    'USE student_management',
    
    `CREATE TABLE IF NOT EXISTS students (
      department int,
      course int,
      student_id int,
      first_name text,
      last_name text,
      email text,
      age int,
      enrollment_date timestamp,
      PRIMARY KEY ((department, course), student_id)
    )`,

    `CREATE TABLE IF NOT EXISTS departments (
      dept_id int,
      dept_name text,
      location text,
      head_professor_id int,
      PRIMARY KEY (dept_id)
    )`,

    `CREATE TABLE IF NOT EXISTS courses (
      dept_id int,
      course_id int,
      professor_id int,
      course_code text,
      title text,
      credits int,
      semester text,
      year int,
      PRIMARY KEY ((dept_id, course_id))
    )`,

    `CREATE TABLE IF NOT EXISTS enrollments (
      enrollment_id int,
      student_id int,
      course_id int,
      enrollment_date timestamp,
      status text,
      PRIMARY KEY ((student_id, course_id))
    )`
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