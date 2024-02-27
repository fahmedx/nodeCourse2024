const express = require('express')
const router = express.Router()

const ProductController = require('../controller/ProductController')

router.get('/create', ProductController.createProduct)
router.post('/create', ProductController.createProductsPost)
router.get('/', ProductController.showProducts)

module.exports = router