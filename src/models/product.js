const {Schema, model} = require('mongoose')

const petTrainingSchema= new Schema({
    code:{type:Number, required: true},
    status:{type:Boolean, required: true},
    Pet:{type:String, required: true},
    WeightPet:{type:Number, required: true},
    Configuration:{type:Number, required: true},
    BirthDay:{type:String, required: true},    
    FoodDiary:{type:Number, required: true},
    RationsDiary:{type:Number, required: true},
},{
    timestamps: true,
    versionKey: false
}
)

module.exports= model("Product",petTrainingSchema); 