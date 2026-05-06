const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getApplications, createApplication, updateApplication, deleteApplication } = require('../controllers/applicationsController');

router.get('/', auth, getApplications);
router.post('/', auth, createApplication);
router.patch('/:id', auth, updateApplication);
router.delete('/:id', auth, deleteApplication);

module.exports = router;