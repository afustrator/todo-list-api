/* eslint-disable camelcase */
const mapActivityDBToModel = ({
  id,
  title,
  email,
  created_at,
  updated_at,
}) => ({ id, title, email, createdAt: created_at, updatedAt: updated_at })

const mapTodoDBToModel = ({
  id,
  title,
  activity_group_id,
  is_active,
  priority,
  created_at,
  updated_at,
}) => ({
  id,
  title,
  activityGroupId: activity_group_id,
  isActive: is_active,
  priority,
  createdAt: created_at,
  updatedAt: updated_at,
})

module.exports = { mapActivityDBToModel, mapTodoDBToModel }
