const { v4: uuidv4 } = require('uuid');
const { client } = require('../config/database');
const logger = require('../utils/logger');

class StudentService {
  async insertStudent(studentData) {
    const studentId = uuidv4();
    const query = `
      INSERT INTO students (
        student_id, department_id, first_name, last_name,
        email, age, enrollment_date
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    try {
      await client.execute(query, [
        studentId,
        studentData.department_id,
        studentData.first_name,
        studentData.last_name,
        studentData.email,
        studentData.age,
        new Date()
      ], { prepare: true });
      
      return studentId;
    } catch (err) {
      logger.error('Failed to insert student:', err.message);
      throw err;
    }
  }

  async getStudentsByDepartment(departmentId) {
    const query = 'SELECT * FROM students WHERE department_id = ?';
    try {
      const result = await client.execute(query, [departmentId], { prepare: true });
      return result.rows;
    } catch (err) {
      logger.error('Failed to retrieve students:', err.message);
      throw err;
    }
  }

  async getStudentById(studentId) {
    const query = 'SELECT * FROM students WHERE student_id = ? ALLOW FILTERING';
    try {
      const result = await client.execute(query, [studentId], { prepare: true });
      return result.rows[0];
    } catch (err) {
      logger.error('Failed to retrieve student:', err.message);
      throw err;
    }
  }
}

module.exports = new StudentService();