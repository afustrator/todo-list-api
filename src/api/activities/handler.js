const autoBind = require('auto-bind')

class ActivitiesHandler {
  constructor(service, validator) {
    this._service = service
    this._validator = validator

    autoBind(this)
  }

  async postActivityGroupHandler(request, h) {
    this._validator.validatePostActivityPayload(request.payload)
    const { title, email } = request.payload

    const activity = await this._service.addActivity({ title, email })

    const response = h.response({
      status: 'Success',
      message: 'Success',
      data: activity,
    })
    response.code(201)
    return response
  }

  async getActivitiesGroupsHandler() {
    const activities = await this._service.getActivities()
    return {
      status: 'Success',
      message: 'Success',
      data: activities,
    }
  }

  async getActivityGroupByIdHandler(request) {
    const { id } = request.params

    const activity = await this._service.getActivityById(id)
    return {
      status: 'Success',
      message: 'Success',
      data: {
        activity,
      },
    }
  }

  async putActivityGroupByIdHandler(request) {
    this._validator.validatePutActivityPayload(request.payload)
    const { id } = request.params

    await this._service.editActivityById(id, request.payload)

    return {
      status: 'Success',
      message: 'Success',
    }
  }

  async deleteActivityGroupByIdHandler(request) {
    const { id } = request.params

    await this._service.deleteActivityById(id)

    return {
      status: 'Success',
      message: 'Success',
    }
  }
}

module.exports = ActivitiesHandler
