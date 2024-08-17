const Joi = require("joi");

const productSchema = Joi.object({
    name: Joi.string()
             .min(3).
             max(100).
             trim().
             required().
             messages({
                'string.base': 'El nombre debe se una cadena de texto',
                'string.empty': 'El nombre es requerido',
                'string.min': 'La cantidad de caracteres mínima es de 3',     
                'string.max': 'La cantidad de caracteres máxima es de {#limit}', 
                'any.required': 'El nombre es un campo requerido'   
    }),
    price: Joi.number(),
    summary: Joi.string(),
    description: Joi.string(),
    location: Joi.string,
    type: Joi.string(),
    createdAt: Joi.number(),
    active: Joi.boolean().optional()



})

module.exports = productSchema;