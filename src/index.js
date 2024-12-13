require('dotenv').config();
const logger = require('./utils/logger');
const { connectWithRetry } = require('./config/database');
const { createSchema } = require('./models/schema');
const { 
  generateStudentData,
  generateDepartmentData,
  generateCourseData,
  generateEnrollmentData
} = require('./utils/dataGenerator');
const studentService = require('./services/studentService');
const departmentService = require('./services/departmentService');
const courseService = require('./services/courseService');
const enrollmentService = require('./services/enrollmentService');

async function main() {
  try {
    // Connect to Cassandra
    await connectWithRetry();
    logger.info('Connected to Cassandra successfully');
    
    // Create schema
    await createSchema();

    // Generate and insert sample data
    const departments = generateDepartmentData(10);
    const courses = generateCourseData(50);
    const students = generateStudentData(1000);
    const enrollments = generateEnrollmentData(200);

    await departmentService.insertDepartments(departments);
    await courseService.insertCourses(courses);
    await studentService.insertStudents(students);
    await enrollmentService.insertEnrollments(enrollments);

    // Verify data
    const deptId = 1;
    const coursesInDept = await courseService.getCoursesByDepartment(deptId);
    logger.info(`Retrieved ${coursesInDept.length} courses from department ${deptId}`);

  } catch (err) {
    logger.error('Application error:', err.message);
    process.exit(1);
  }
}

main().catch(err => {
  logger.error('Unhandled error:', err.message);
  process.exit(1);
});