import joi from 'joi';

const user = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(5).required()
});

export = { user };