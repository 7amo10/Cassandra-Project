const express = require('express');
const router = express.Router();
const departmentService = require('../services/departmentService');
const logger = require('../utils/logger');

router.get('/', async (req, res) => {
  try {
    const departments = await departmentService.getDepartmentById(1);
    res.json(departments);
  } catch (err) {
    logger.error('Error fetching departments:', err.message);
    res.status(500).json({ error: 'Failed to fetch departments' });
  }
});

module.exports = router;