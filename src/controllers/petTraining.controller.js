const petTrainingCtrl={}


const productServices=require('../services/products.services');


petTrainingCtrl.getProducts=(req,res)=>{
    productServices.getProducts()
    .then((products)=>res.send(products))
    .catch((error)=>res.status(500).send('Something broke!',error));
}; 

petTrainingCtrl.createProduct=(req,res)=>{
    productServices.createProduct(req.body)
    .then((product)=>res.send(product))
    .catch((error)=>res.status(500).send('Something broke!',error));    
};

petTrainingCtrl.getProduct=(req,res)=>{
    productServices.getProduct(req.params.id)
    .then((OnePetTranining)=>res.send(OnePetTranining))
    .catch((error)=>res.status(500).send('Something broke!',error)); 
};
petTrainingCtrl.editProduct=(req,res)=>{
    productServices.editProduct(req.params.id,req.body)
    .then((productUp)=>res.send(productUp))
    .catch((error)=>res.status(500).send('Something broke!',error));
    
};
petTrainingCtrl.deleteProduct=(req,res)=>{
    productServices.deleteProducts(req.params.id)
    .then((productDelete)=>res.send(productDelete))
    .catch((error)=>res.status(500).send('Something broke!',error)); 
    
};
 

module.exports= petTrainingCtrl ;  