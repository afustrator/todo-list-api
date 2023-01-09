const Joi = require('joi')

const PostActivityPayloadSchema = Joi.object({
  title: Joi.string().required(),
  email: Joi.string(),
})

const PutActivityPayloadSchema = Joi.object({
  title: Joi.string().required(),
})

module.exports = { PostActivityPayloadSchema, PutActivityPayloadSchema }
