require('dotenv').config();
const logger = require('./src/utils/logger');
const { connectWithRetry, client } = require('./src/config/database');
const { createSchema } = require('./src/models/schema');
const { generateStudentData } = require('./src/utils/dataGenerator');
const studentService = require('./src/services/studentService');

async function main() {
  try {
    await connectWithRetry();
    logger.info('Connected to Cassandra successfully');
    
    await createSchema();

    const students = generateStudentData(50);
    const insertedCount = await studentService.insertStudents(students);

    const department = 1;
    const course = 1;
    const retrievedStudents = await studentService.getStudentsByDepartmentAndCourse(department, course);
    
    logger.info(`Inserted ${insertedCount} students`);
    logger.info(`Retrieved ${retrievedStudents.length} students from department ${department}, course ${course}`);
  } catch (err) {
    logger.error('Application error:', err.message);
    process.exit(1);
  } finally {
    await client.shutdown();
  }
}

main().catch(err => {
  logger.error('Unhandled error:', err.message);
  process.exit(1);
});