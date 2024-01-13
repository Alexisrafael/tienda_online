const Conjuntos = require("../model/Conjuntos")
import {v2 as cloudinary} from 'cloudinary';
import { path, request, response } from '../app';

cloudinary.config({ 
    cloud_name: 'dgo96kikm', 
    api_key: '294814495585286', 
    api_secret: 'SLZMgK2bIADsTE3-rLomyNqynLo' 
});

const getConjuntos = (req,res) =>{
    res.send(toppings)
}

const postConjuntos = async (req,res) =>{
    const { name, activo, price} = req.body
    try {
        const buscar = await Conjuntos.find({name, activo, price})
        if(buscar[0]){
            res.status(404).send(buscar[0])
        }else{
            const data_image = await request.formData();
            const image = data.get("image");
            const bytes = await image.arrayBuffer();
            const buffer = Buffer.from(bytes);
            // Solo se usa cuando se quiere almacenar la imagen en el proyecto 
            //const filePath = path.join(process.cwd(), "image", image.name)
            //await writeFile(filePath, buffer)
            //const cloudinary = await cloudinary.uploader.upload(filePath)

            const cloudinary = await new Promise( (resolve, reject) => {
                cloudinary.uploader.upload_stream({}, (err, result) => {
                    if (err){
                        reject(err)
                    }
                    resolve(result)
                }).end(buffer)
            })

            const crear = await Conjuntos.create({name,image: cloudinary.secure_url, activo, price})
            res.send(crear)
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {getConjuntos, postConjuntos}