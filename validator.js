const joi = require('joi')

//Para poder establecer las diferentes validaciones, desarrollaremos una función de validación la cual
//recibirá tres parámetros

//req (datos que nos envían nuestras acciones).
// res (respuesta que se enviará en caso de que alguna validación no cumpla con los parámetros
//de validación).
// next (será llamada en el casode que todos las validaciones sean correctas).
const validator = (req, res, next) => {
    //console.log("req.body es")
    //console.log(req.body)

 //Luego definiremos una estructura de validación mediante el método de joi object(), el cual contendrá
//en su interior cada uno de los valores a verificar.   
//A cada uno de los valores a verificar le aplicaremos sus propios criterios de validación
    const schema = joi.object({
        fullName: joi.string() //que sea un string
            .min(3) //: cantidad de caracteres mínimos
            .max(20)//: cantidad de caracteres máximos
            .trim()
            .pattern(new RegExp('[a-zA-Z]')) //podemos establecer expresiones regulares para validar/(?=.*[A-Z])(?=.*[a-z])/
            .required()//en el caso que sea estrictamente requerido
            .messages({ // un objeto con la respuesta de mensajes para cada validación, en caso de no
                //establecer este devolverá los mensajes por defecto
                
                'string.min': 'name: min 3 characters',
                'string.max': 'name: max 20 characters'}),
     
        avatar: joi.string()
            .min(4)
            .trim()
            .required(),
        email: joi.string()
            .email({minDomainSegments:2})
            .required()
            .messages({
                'string.email': '"mail": incorrect format'}),
        password: joi.string()
            .min(8) 
            .max(50)
            .pattern(new RegExp('[a-zA-Z0-9]'))
            .required()
            .messages({
                'string.min': '"password": min 8 characters',
                'string.max': '"password": max 30 characters'}),
        country: joi.string()
            .required(),
        from: joi.string() 
            
    })
    const validation = schema.validate(req.body.userData, {abortEarly:false})
    //Una vez ya con los datos validados y mediante un condicional definiremos que si la validación da
//como resultado un error nos devolverá el error encontrado con el mensaje que le establecimos y en
//caso contrario llamará a next(), dando lugar al controlador
    if (validation.error) {
        return res.json({success: false, from: 'validator', message: validation.error.details, test: validation})
    }
    next()
} //Los datos sólo son enviados al validador en el caso que la validación de estos sea OK
//En caso contrario la respuesta a nuestra llamada de axios será suministrada por el propio validador.

module.exports = validator