const { client } = require('../config/database');
const logger = require('../utils/logger');

class CourseService {
  async getAllCourses() {
    const query = 'SELECT * FROM courses';
    try {
      const result = await client.execute(query, [], { prepare: true });
      return result.rows;
    } catch (err) {
      logger.error('Failed to retrieve courses:', err.message);
      throw err;
    }
  }

  async getCoursesByDepartment(departmentId) {
    const query = 'SELECT * FROM courses WHERE department_id = ?';
    try {
      const result = await client.execute(query, [departmentId], { prepare: true });
      return result.rows;
    } catch (err) {
      logger.error('Failed to retrieve courses by department:', err.message);
      throw err;
    }
  }

  async insertCourse(courseData) {
    const query = `
      INSERT INTO courses (
        course_id, department_id, code, title,
        credits, professor_id, semester, year
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    try {
      await client.execute(query, [
        courseData.course_id,
        courseData.department_id,
        courseData.code,
        courseData.title,
        courseData.credits,
        courseData.professor_id,
        courseData.semester,
        courseData.year
      ], { prepare: true });
      return true;
    } catch (err) {
      logger.error('Failed to insert course:', err.message);
      throw err;
    }
  }
}
module.exports = new CourseService();