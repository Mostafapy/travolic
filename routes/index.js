const router = require('express').Router();

const { searchTravolicController } = require('../controllers');

router.post('/api/search/travolic', searchTravolicController);

module.exports = router;