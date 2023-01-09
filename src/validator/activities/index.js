const InvariantError = require('../../exceptions/InvariantError')
const {
  PostActivityPayloadSchema,
  PutActivityPayloadSchema,
} = require('./schema')

const ActivitiesValidator = {
  validatePostActivityPayload: (payload) => {
    const validationResult = PostActivityPayloadSchema.validate(payload)
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message)
    }
  },

  validatePutActivityPayload: (payload) => {
    const validationResult = PutActivityPayloadSchema.validate(payload)
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message)
    }
  },
}

module.exports = ActivitiesValidator
