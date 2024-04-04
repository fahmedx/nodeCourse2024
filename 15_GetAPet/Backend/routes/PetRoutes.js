const router = require("express").Router()

const PetController = require('../controllers/PetController')

const { imageUpload } = require('../helpers/image-upload')

const verifyToken = require('../helpers/verify-token')

router.post('/create', verifyToken, imageUpload.array('images'), PetController.create)
router.get('/mypets', verifyToken, PetController.getAllPetsUser)
router.get('/myadoptions', verifyToken, PetController.getAllUserAdoptions)
router.get('/available', PetController.getAvailable)
router.get('/', PetController.getAll)

module.exports = router