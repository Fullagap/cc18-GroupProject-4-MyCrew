import Joi from 'joi';

const registerSchema = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: false } })   
        .required()
        .messages({
            "string.empty": "Email is required",
            "string.email": "Invalid email format",
        }),
    
    identicalNumber: Joi.string()
        .pattern(/^[0-9]{13}$/)
        .required()
        .messages({
            "string.empty": "Identity Card number is required",
            "string.pattern.base": "Id must contain only numbers and be exactly 13 characters",
        }),
    
    phoneNumber: Joi.string()
        .pattern(/^\+?[0-9]{10,15}$/)
        .required()
        .messages({
            "string.empty": "Phone number is required",
            "string.pattern.base": "Phone number must be 10 to 15 digits and can start with +",
        }),
 
    bookBank: Joi.string()
        .required()
        .messages({
            "string.empty": "BookBank is required",
        }),
 
    salary: Joi.number()
        .positive()
        .required()
        .messages({
            "number.base": "Salary must be a number",
            "number.positive": "Salary must be a positive number",
            "any.required": "Salary is required",
        }),
}).unknown(true);
 

export default registerSchema;
