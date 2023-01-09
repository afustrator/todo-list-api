const { Pool } = require('pg')
const { customAlphabet } = require('nanoid')
const InvariantError = require('../exceptions/InvariantError')
const NotFoundError = require('../exceptions/NotFoundError')
const { mapActivityDBToModel } = require('../utils')

class ActivitiesService {
  constructor() {
    this._pool = new Pool()
  }

  async addActivity({ title, email }) {
    const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 10)
    const dateNow = Date.now()
    const date = new Date(dateNow)

    const id = `activity-${nanoid()}`
    const createdAt = date.toLocaleString()

    const query = {
      text: 'INSERT INTO activities VALUES($1, $2, $3, $4, $5) RETURNING *',
      values: [id, title, email, createdAt, createdAt],
    }

    const result = await this._pool.query(query)

    if (!result.rows[0].id) {
      throw new InvariantError('Gagal menambahkan activity')
    }

    return result.rows[0]
  }

  async getActivities() {
    const result = await this._pool.query('SELECT * FROM activities')
    return result.rows
  }

  async getActivityById(id) {
    const query = {
      text: 'SELECT * FROM activities WHERE id = $1',
      values: [id],
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) {
      throw new NotFoundError(`Todo with ID ${id} Not Found`)
    }

    return result.rows.map(mapActivityDBToModel)[0]
  }

  async editActivityById(id, { title }) {
    const dateNow = Date.now()
    const date = new Date(dateNow)

    const updatedAt = date.toLocaleString()

    const query = {
      text: 'UPDATE activities SET title = $1, updated_at = $2 WHERE id = $3 RETURNING id',
      values: [title, updatedAt, id],
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) {
      throw new NotFoundError(`Todo with ID ${id} Not Found`)
    }
  }

  async deleteActivityById(id) {
    const query = {
      text: 'DELETE FROM activities WHERE id = $1 RETURNING id',
      values: [id],
    }

    const result = await this._pool.query(query)

    if (!result.rows.length) {
      throw new NotFoundError(`Todo with ID ${id} Not Found`)
    }
  }
}

module.exports = ActivitiesService
