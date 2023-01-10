# Todo List RESTful API

## The tool i use

- NodeJS with HapiJS Framework.
- PostgreSQL.

### How to use

First step:

Install package `npm install`, before running the table migration create an .env file with the contents as below, and adjust the contents of the postgre node configuration according to the PostgreSQL configuration you are using on your local device.

.env

```
# Server Configuration
HOST=localhost
PORT=3030

# Node Postgre Configuration
PGHOST=
PGPORT=
PGUSER=
PGPASSWORD=
PGDATABASE=
```

Next, migrate table `npm run migrate up`.

To run the service:

`npm run start-dev`

## Endpoint for this RESTful API

| Activity Group                                    | Description                           |
| ------------------------------------------------- | ------------------------------------- |
| POST `http://localhost:3030/activity-group`       | Add activity data                     |
| GET `http://localhost:3030/activity-group`        | Displays all activity data            |
| GET `http://localhost:3030/activity-group/:id`    | Displays detailed activity data by id |
| PUT `http://localhost:3030/activity-group/:id`    | Update activity data by id            |
| DELETE `http://localhost:3030/activity-group/:id` | Delete activity data by id            |

| Todo Items                                                          | Description                          |
| ------------------------------------------------------------------- | ------------------------------------ |
| POST `http://localhost:3030/todo-items`                             | Add todo data                        |
| GET `http://localhost:3030/todo-items`                              | Displays all todo data               |
| GET `http://localhost:3030/todo-items?activity_group_id=activityId` | Displays all todo data by activityId |
| GET `http://localhost:3030/todo-items/:id`                          | Displays detailed todo data by id    |
| PUT `http://localhost:3030/todo-items/:id`                          | Update todo data by id               |
| DELETE `http://localhost:3030/todo-items/:id`                       | Delete todo data by id               |
