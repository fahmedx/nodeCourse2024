const express = require('express')
const router = express.Router()
const toughtController = require('../controllers/toughtController')


const checkAuth = require('../helpers/auth').checkAuth

router.get('/add', checkAuth, toughtController.createTought)
router.post('/add', checkAuth, toughtController.createToughtSave)
router.get('/edit/:id', checkAuth, toughtController.updateTought)
router.post('/edit', checkAuth, toughtController.updateToughtSave)
router.get('/dashboard', checkAuth, toughtController.dashboard)
router.post('/remove', checkAuth, toughtController.removeTought)
router.get('/', toughtController.showToughts)

module.exports = router
