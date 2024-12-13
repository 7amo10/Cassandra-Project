const { client } = require('../config/database');
const logger = require('../utils/logger');

class DepartmentService {
  async insertDepartments(departments) {
    const query = `
      INSERT INTO departments (
        dept_id, dept_name, location, head_professor_id
      ) VALUES (?, ?, ?, ?)
    `;

    try {
      const batchQueries = departments.map(dept => ({
        query,
        params: [
          dept.dept_id,
          dept.dept_name,
          dept.location,
          dept.head_professor_id
        ]
      }));

      await client.batch(batchQueries, { prepare: true });
      logger.info(`Successfully inserted ${departments.length} departments`);
      return departments.length;
    } catch (err) {
      logger.error('Failed to insert departments:', err.message);
      throw err;
    }
  }

  async getDepartmentById(deptId) {
    const query = 'SELECT * FROM departments WHERE dept_id = ?';
    try {
      const result = await client.execute(query, [deptId], { prepare: true });
      return result.rows[0];
    } catch (err) {
      logger.error('Failed to retrieve department:', err.message);
      throw err;
    }
  }
}

module.exports = new DepartmentService();