// Import all generators
const { generateStudentData } = require('./generators/studentGenerator');
const { generateDepartmentData } = require('./generators/departmentGenerator');
const { generateCourseData } = require('./generators/courseGenerator');
const { generateEnrollmentData } = require('./generators/enrollmentGenerator');

module.exports = {
  generateStudentData,
  generateDepartmentData,
  generateCourseData,
  generateEnrollmentData
};