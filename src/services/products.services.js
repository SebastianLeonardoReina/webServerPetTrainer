const productModel = require('../models/product');
const infoDog= require('../utils/constants/dataDog');
const _ =require('lodash');
const { getProduct } = require('../controllers/petTraining.controller');
 
 exports.createProduct = function (newProduct){
     return new Promise(async(resolve,reject)=>{
        try {
            const foodDiary=calculateDailyFood(newProduct.BirthDay,newProduct.WeightPet);
            const time=timeNow();
            const product = new productModel({
                code:newProduct.code,
                status:false,
                Pet:newProduct.Pet,
                WeightPet:newProduct.WeightPet,
                Configuration:0,
                BirthDay:newProduct.BirthDay,    
                FoodDiary:foodDiary.portion,
                RationsDiary:foodDiary.quantity,
                hour:time.hour,
                minute:time.minute,
                second:time.second,
            });
            await product.save();
            resolve(product);
        } catch (error) {
            reject(error);
        }
     });
 }

exports.getProducts = function (){
    return new Promise(async(resolve,reject)=>{
       try {
           const products= await productModel.find()
           resolve(products);
       } catch (error) {
           reject(error);
       }
    });
}

function getProductByID(id){
    return new Promise(async(resolve,reject)=>{
       try {
           const foundProduct = await productModel.findById(id)
           const time=timeNow();
           foundProduct.hour=time.hour;
           foundProduct.minute=time.minute;
           foundProduct.second=time.second;
           resolve(await productModel.findByIdAndUpdate(id, foundProduct ))
       } catch (error) {
           reject(error);
       }
    });
}

exports.getProduct = getProductByID;

exports.editProduct =function (id,productUpdate){
    return new Promise(async(resolve,reject)=>{
       try {
           if(!_.isNil(productUpdate.BirthDay) && !_.isNil(productUpdate.WeightPet)){
               const foodDiary=calculateDailyFood(productUpdate.BirthDay,productUpdate.WeightPet);
               productUpdate.FoodDiary=foodDiary.portion;
               productUpdate.RationsDiary=foodDiary.quantity;
           }else if((_.isNil(productUpdate.BirthDay) && !_.isNil(productUpdate.WeightPet))
                    || (!_.isNil(productUpdate.BirthDay) && _.isNil(productUpdate.WeightPet))){
                return reject("FATAL ERROR");
           }
           await productModel.findByIdAndUpdate(id,productUpdate);
           resolve(await getProductByID(id));
       } catch (error) {
           reject(error);
       }
    });
}



exports.deleteProducts = function (id){
    return new Promise(async(resolve,reject)=>{
       try {
           const productDelete= await productModel.findByIdAndDelete(id);
           resolve(productDelete);
       } catch (error) {
           reject(error);
       }
    });
}
function calculateAge(BirthDay) {
    const birthDay= new Date(BirthDay);
    const dB=birthDay.getDate();
    const mB=birthDay.getMonth()+1;
    const yB=birthDay.getFullYear();


    const today= new Date();
    let d=today.getDate();
    let m=today.getMonth()+1;
    let y=today.getFullYear();

    var ageMonths=(y-yB)*12;

    if(m<mB){
        m=m+12;
    }

    var months=m-mB;

    var daysMonths=Math.abs(d-dB)/360;

    var edad=ageMonths+months+daysMonths;
 
    return edad; 
}
 function calculateDailyFood(BirthDay,WeightPet) {
     const age = calculateAge(BirthDay);
     const razaEncontrada= _.find(infoDog.dataDog,(raza)=>
        raza.pesoMin<=WeightPet && WeightPet<raza.pesoMax
    );
    console.log(razaEncontrada);
     const foundCategory=_.find(razaEncontrada.edad,(category)=>
        category.edadMin<=age && age<category.edadMax
     );
     console.log(foundCategory);
     return {
         portion:foundCategory.portionDiary,
         quantity:foundCategory.rationDiary
     }
 }

 function timeNow() {
    let timeReal = new Date();
    console.log(timeReal);
    return {
        hour:timeReal.getUTCHours()-5,
        minute:timeReal.getUTCMinutes(),
        second: timeReal.getUTCSeconds()
    }
}