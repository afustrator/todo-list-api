exports.up = (pgm) => {
  pgm.createTable('activities', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    title: {
      type: 'VARCHAR(255)',
      notNull: true,
    },
    email: {
      type: 'VARCHAR(255)',
    },
    created_at: {
      type: 'TIMESTAMP',
      default: pgm.func('current_timestamp'),
    },
    updated_at: {
      type: 'TIMESTAMP',
      default: pgm.func('current_timestamp'),
    },
  })
}

exports.down = (pgm) => {
  pgm.dropTable('activities')
}
