import Joi from 'joi';

const updateUserSchema = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            "string.empty": "Email is required",
            "string.email": "Invalid email format",
        }),
    phoneNumber: Joi.string()
        .pattern(/^\+?[0-9]{10,15}$/)
        .required()
        .messages({
            "string.empty": "Phone number is required",
            "string.pattern.base": "Phone number must be 10 to 15 digits and can start with +",
        }),
    positionId: Joi.number()
        .required()
        .messages({
            "number.base": "Please select position",
            "any.required": "Position is required",
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

export default updateUserSchema;
