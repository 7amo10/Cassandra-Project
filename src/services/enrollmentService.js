const { client } = require('../config/database');
const logger = require('../utils/logger');

class EnrollmentService {
  async enrollStudentInCourse(studentId, courseId) {
    const query = `
      INSERT INTO student_enrollments (
        student_id, course_id, enrollment_date, status
      ) VALUES (?, ?, ?, ?)
    `;

    try {
      await client.execute(query, [
        studentId,
        courseId,
        new Date(),
        'ENROLLED'
      ], { prepare: true });
      
      return true;
    } catch (err) {
      logger.error('Failed to enroll student:', err.message);
      throw err;
    }
  }

  async getStudentEnrollments(studentId) {
    const query = `
      SELECT e.*, c.code, c.title
      FROM student_enrollments e
      JOIN courses c ON c.course_id = e.course_id
      WHERE e.student_id = ?
      ALLOW FILTERING
    `;
    
    try {
      const result = await client.execute(query, [studentId], { prepare: true });
      return result.rows;
    } catch (err) {
      logger.error('Failed to retrieve enrollments:', err.message);
      throw err;
    }
  }
}

module.exports = new EnrollmentService();