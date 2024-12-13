const { client } = require('../config/database');
const logger = require('../utils/logger');

class DepartmentService {
  async getAllDepartments() {
    const query = 'SELECT * FROM departments';
    try {
      const result = await client.execute(query, [], { prepare: true });
      return result.rows;
    } catch (err) {
      logger.error('Failed to retrieve departments:', err.message);
      throw err;
    }
  }

  async getDepartmentById(deptId) {
    const query = 'SELECT * FROM departments WHERE department_id = ?';
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