const { Schema,model } = require("mongoose");

const ConocimientoSchema = Schema({
    nombre: {
        type: String,
        require: true
    },
    tipo: {
        type: String,
        require: true
    },
    img: {

        type: String

    }
});

ConocimientoSchema.method('toJSON',function(){
    const{__v,...object} = this.toObject();
    return object;
})

module.exports= model('Conocimiento',ConocimientoSchema);