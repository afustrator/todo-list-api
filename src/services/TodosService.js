const { Pool } = require('pg')
const { customAlphabet } = require('nanoid')
const InvariantError = require('../exceptions/InvariantError')
const { mapTodoDBToModel } = require('../utils')
const NotFoundError = require('../exceptions/NotFoundError')

class TodosService {
  constructor() {
    this._pool = new Pool()
  }

  async addTodo({ title, activityGroupId, isActive }) {
    const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 10)
    const dateNow = Date.now()
    const date = new Date(dateNow)

    const id = `todo-${nanoid()}`
    const priority = 'Very-High'
    const createdAt = date.toLocaleString()

    const query = {
      text: 'INSERT INTO todos VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      values: [
        id,
        title,
        activityGroupId,
        isActive,
        priority,
        createdAt,
        createdAt,
      ],
    }

    const result = await this._pool.query(query)

    if (!result.rows[0].id) {
      throw new InvariantError('Gagal menambahkan todo')
    }

    return result.rows[0]
  }

  async getTodos({ activityGroupId = '' }) {
    const query = {
      text: `
        SELECT todos.id, todos.title, todos.activity_group_id, todos.is_active,
        todos.priority, todos.created_at, todos.updated_at
        FROM todos
        LEFT JOIN activities ON todos.activity_group_id = activities.id
        WHERE LOWER(activity_group_id) LIKE $1`,
      values: [`%${activityGroupId}%`],
    }

    const result = await this._pool.query(query)

    return result.rows.map(mapTodoDBToModel)
  }

  async getTodoById(id) {
    const query = {
      text: `SELECT todos.id, todos.title, todos.activity_group_id, todos.is_active,
      todos.priority, todos.created_at, todos.updated_at
      FROM todos
      WHERE id = $1`,
      values: [id],
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) {
      throw new NotFoundError(`Todo with ID ${id} Not Found`)
    }

    return result.rows.map(mapTodoDBToModel)[0]
  }

  async editTodoById(id, { title, isActive, priority }) {
    const dateNow = Date.now()
    const date = new Date(dateNow)

    const updatedAt = date.toLocaleString()

    const query = {
      text: 'UPDATE todos SET title = $1, is_active = $2, priority = $3, updated_at = $4 WHERE id = $5 RETURNING id',
      values: [title, isActive, priority, updatedAt, id],
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) {
      throw new NotFoundError(`Todo with ID ${id} Not Found`)
    }
  }

  async deleteTodoById(id) {
    const query = {
      text: 'DELETE FROM todos WHERE id = $1 RETURNING id',
      values: [id],
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) {
      throw new NotFoundError(`Todo with ID ${id} Not Found`)
    }
  }
}

module.exports = TodosService
