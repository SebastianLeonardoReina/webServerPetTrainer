const { Router }=require('express')
const router=Router() 

const petTrainingCtrl = require('../controllers/petTraining.controller.js')

router.get('/',petTrainingCtrl.getProducts);

router.post('/',petTrainingCtrl.createProduct);

router.get('/:id',petTrainingCtrl.getProduct);

router.put('/:id',petTrainingCtrl.editProduct);

router.delete('/:id',petTrainingCtrl.deleteProduct);

module.exports =router