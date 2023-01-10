const routes = (handler) => [
  {
    method: 'POST',
    path: '/activity-groups',
    handler: handler.postActivityGroupHandler,
  },
  {
    method: 'GET',
    path: '/activity-groups',
    handler: handler.getActivitiesGroupsHandler,
  },
  {
    method: 'GET',
    path: '/activity-groups/{id}',
    handler: handler.getActivityGroupByIdHandler,
  },
  {
    method: 'PUT',
    path: '/activity-groups/{id}',
    handler: handler.putActivityGroupByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/activity-groups/{id}',
    handler: handler.deleteActivityGroupByIdHandler,
  },
]

module.exports = routes
