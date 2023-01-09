const autoBind = require('auto-bind')

class TodosHandler {
  constructor(service, validator) {
    this._service = service
    this._validator = validator

    autoBind(this)
  }

  async postTodoItemHandler(request, h) {
    this._validator.validatePostTodoPayloadSchema(request.payload)
    const { title, activityGroupId, isActive } = request.payload

    const todo = await this._service.addTodo({
      title,
      activityGroupId,
      isActive,
    })

    const response = h.response({
      status: 'Success',
      message: 'Success',
      data: todo,
    })
    response.code(201)
    return response
  }

  async getTodosHandler(request) {
    const { activity_group_id: activityGroupId } = request.query
    const todos = await this._service.getTodos({ activityGroupId })

    return {
      status: 'Success',
      message: 'Success',
      data: todos,
    }
  }

  async getTodoItemByIdHandler(request) {
    const { id } = request.params

    const todo = await this._service.getTodoById(id)

    return {
      status: 'Success',
      message: 'Success',
      data: todo,
    }
  }

  async patchTodoItemByIdHandler(request) {
    this._validator.validatePutTodoPayloadSchema(request.payload)
    const { id } = request.params
    const { title, isActive, priority } = request.payload

    await this._service.editTodoById(id, { title, isActive, priority })

    return {
      status: 'Success',
      message: 'Success',
    }
  }

  async deleteTodoItemByIdHandler(request) {
    const { id } = request.params

    await this._service.deleteTodoById(id)

    return {
      status: 'Success',
      message: 'Success',
    }
  }
}

module.exports = TodosHandler
