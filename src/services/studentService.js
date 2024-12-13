const { v4: uuidv4 } = require('uuid');
const { client } = require('../config/database');
const logger = require('../utils/logger');

class StudentService {
  async insertStudents(students) {
    const query = `
      INSERT INTO students (
        department, course, student_id, first_name, 
        last_name, email, age, enrollment_date
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    try {
      const batchQueries = students.map(student => ({
        query,
        params: [
          student.department,
          student.course,
          student.student_id,
          student.first_name,
          student.last_name,
          student.email,
          student.age,
          student.enrollment_date
        ]
      }));

      await client.batch(batchQueries, { prepare: true });
      logger.info(`Successfully inserted ${students.length} students`);
      return students.length;
    } catch (err) {
      logger.error('Failed to insert students:', err.message);
      throw err;
    }
  }

  async getStudentsByDepartmentAndCourse(department, course) {
    const query = 'SELECT * FROM students WHERE department = ? AND course = ?';
    
    try {
      const result = await client.execute(query, [department, course], { prepare: true });
      return result.rows;
    } catch (err) {
      logger.error('Failed to retrieve students:', err.message);
      throw err;
    }
  }
}

module.exports = new StudentService();