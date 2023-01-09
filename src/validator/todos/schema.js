const Joi = require('joi')

const PostTodoPayloadSchema = Joi.object({
  title: Joi.string().required(),
  activityGroupId: Joi.string(),
  isActive: Joi.boolean(),
})

const PutTodoPayloadSchema = Joi.object({
  title: Joi.string().required(),
  isActive: Joi.boolean(),
  priority: Joi.string(),
})

module.exports = { PostTodoPayloadSchema, PutTodoPayloadSchema }
