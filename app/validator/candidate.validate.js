const Joi = require('joi');

const createCandidateRequestSchema = Joi.object({
    name: Joi.string().required(),
    emailId: Joi.string().email().required(),
});

const getCandidateByIdRequestSchema = Joi.object({
    id: Joi.any().required(),
});


const validationSchema = { createCandidateRequestSchema, getCandidateByIdRequestSchema }

module.exports = validationSchema;