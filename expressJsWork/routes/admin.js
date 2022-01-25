const path = require('path');
const express = require('express')
const router = express.Router();
const adminControllers = require('../controllers/admin')

//   /admin/add-products => GET request 


router.get('/add-products', adminControllers.getAddProduct

);


// /admin/add-products ==>POST request 


router.post('/add-products', adminControllers.postProduct)
router.get('/edit-product/:productId', adminControllers.getEditProducts)

router.get('/products', adminControllers.getAdminProducts)
module.exports = router;