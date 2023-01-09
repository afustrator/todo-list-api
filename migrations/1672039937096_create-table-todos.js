exports.up = (pgm) => {
  pgm.createTable('todos', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
      notNull: true,
    },
    title: {
      type: 'VARCHAR(255)',
      notNull: true,
    },
    activity_group_id: {
      type: 'VARCHAR(50)',
    },
    is_active: {
      type: 'BOOLEAN',
      notNull: true,
    },
    priority: {
      type: 'VARCHAR(50)',
    },
    created_at: {
      type: 'TIMESTAMP',
    },
    updated_at: {
      type: 'TIMESTAMP',
    },
  })

  pgm.addConstraint(
    'todos',
    'fk_todos.activity_group_id_activities.id',
    'FOREIGN KEY(activity_group_id) REFERENCES activities(id) ON DELETE CASCADE'
  )
}

exports.down = (pgm) => {
  pgm.dropTable('todos')
}
