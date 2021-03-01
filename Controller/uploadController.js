const path = require('path');
const fs=require('fs');

const {response} = require ('express');
const {v4: uuidv4} = require ('uuid');
const {actualizarImagen} = require('../helpers/actualizar_imagen');
const { fstat } = require('fs');



const fileUpload = (req,res = response) => {

    const tipo= req.params.tipo;
    const id = req.params.id;
    
    //VALIDAR TIPO
    const tipoValidos = ['hospitales','medicos','usuarios'];
    if (!tipoValidos.includes(tipo)){
        return res.status(400).json({
            ok:false,
            msg:'No es un tipo medico,usuario u hospital'
        });
    }

    // npm i express-fileupload: validar que existe un archivo
    if(!req.files || Object.keys(req.files).length === 0){
        return res.status(400).json({
            ok:false,
            msg:'No hay ningun archivo'
        })
    }

    //procesar la imagen
    const file= req.files.imagen
    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length-1];
     
    //validar extension
    const extensionesValidas = ['png','jpg','jpeg','gif'];
    if(!extensionesValidas.includes(extensionArchivo)){
        return res.status(400).json({
            ok:false,
            msg: 'no es una extension permitida'
        });
    }
    
    //npm i uuid: Generar nombre del archivo
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`;

    //Path para guardar la imagen
    const path=`./uploads/${tipo}/${nombreArchivo}`; 

    //mover la imagen
    file.mv(path, (err)=>{
        if (err){
            console.log(err)
            return res.status(500).json({
                ok:false,
                msg:'Error al mover  la imagen'
            });
        }

        //Actualizar base de datos
        actualizarImagen(tipo,id,nombreArchivo);

        res.json({
            ok:true,
            msg: 'Archivo subido',
            nombreArchivo
        })


    });

  
}

const retornarImagen =(req,res = response)=>{
    const tipo = req.params.tipo;
    const foto = req.params.foto;
    
    const pathImg = path.join(__dirname,`../uploads/${tipo}/${foto}`);

    if(fs.existsSync(pathImg)){
        res.sendFile(pathImg);
    }
    else{
        const pathImg = path.join(__dirname,`../uploads/no-img.jpg`);
        res.sendFile(pathImg);

    }
}
 

module.exports = {
    fileUpload,
    retornarImagen
}