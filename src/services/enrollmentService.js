const { client } = require('../config/database');
const logger = require('../utils/logger');

class EnrollmentService {
  async insertEnrollments(enrollments) {
    const query = `
      INSERT INTO enrollments (
        enrollment_id, student_id, course_id,
        enrollment_date, status
      ) VALUES (?, ?, ?, ?, ?)
    `;

    try {
      const batchQueries = enrollments.map(enrollment => ({
        query,
        params: [
          enrollment.enrollment_id,
          enrollment.student_id,
          enrollment.course_id,
          enrollment.enrollment_date,
          enrollment.status
        ]
      }));

      await client.batch(batchQueries, { prepare: true });
      logger.info(`Successfully inserted ${enrollments.length} enrollments`);
      return enrollments.length;
    } catch (err) {
      logger.error('Failed to insert enrollments:', err.message);
      throw err;
    }
  }

  async getEnrollmentsByStudent(studentId) {
    const query = 'SELECT * FROM enrollments WHERE student_id = ?';
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