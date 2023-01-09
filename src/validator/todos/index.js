const InvariantError = require('../../exceptions/InvariantError')
const { PostTodoPayloadSchema, PutTodoPayloadSchema } = require('./schema')

const TodosValidator = {
  validatePostTodoPayloadSchema: (payload) => {
    const validationResult = PostTodoPayloadSchema.validate(payload)
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message)
    }
  },

  validatePutTodoPayloadSchema: (payload) => {
    const validationResult = PutTodoPayloadSchema.validate(payload)
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message)
    }
  },
}

module.exports = TodosValidator
