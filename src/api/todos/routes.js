const routes = (handler) => [
  {
    method: 'POST',
    path: '/todo-items',
    handler: handler.postTodoItemHandler,
  },
  {
    method: 'GET',
    path: '/todo-items',
    handler: handler.getTodosHandler,
  },
  {
    method: 'GET',
    path: '/todo-items/{id}',
    handler: handler.getTodoItemByIdHandler,
  },
  {
    method: 'PATCH',
    path: '/todo-items/{id}',
    handler: handler.patchTodoItemByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/todo-items/{id}',
    handler: handler.deleteTodoItemByIdHandler,
  },
]

module.exports = routes
