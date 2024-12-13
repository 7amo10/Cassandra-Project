const { client } = require('../config/database');
const logger = require('../utils/logger');

class CourseService {
  async insertCourses(courses) {
    const query = `
      INSERT INTO courses (
        dept_id, course_id, professor_id, course_code,
        title, credits, semester, year
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    try {
      const batchQueries = courses.map(course => ({
        query,
        params: [
          course.dept_id,
          course.course_id,
          course.professor_id,
          course.course_code,
          course.title,
          course.credits,
          course.semester,
          course.year
        ]
      }));

      await client.batch(batchQueries, { prepare: true });
      logger.info(`Successfully inserted ${courses.length} courses`);
      return courses.length;
    } catch (err) {
      logger.error('Failed to insert courses:', err.message);
      throw err;
    }
  }

  async getCoursesByDepartment(deptId) {
    const query = 'SELECT * FROM courses WHERE dept_id = ?';
    try {
      const result = await client.execute(query, [deptId], { prepare: true });
      return result.rows;
    } catch (err) {
      logger.error('Failed to retrieve courses:', err.message);
      throw err;
    }
  }
}

module.exports = new CourseService();