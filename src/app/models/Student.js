const db = require("../config/db")
const {date} = require('../lib/utils')

module.exports = {
  all (callback) {
    db.query (`
      SELECT * FROM students
      ORDER BY name ASC`,
      function (err, results) {
        if (err) throw `Error Database ${err}`
        callback(results.rows)
      }
    )
  },
  create (data, callback) {
    const query = `
      INSERT INTO students (
        avatar_url,
        name,
        birth,
        email,
        education_level,
        hour_class,
        teacher_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING id`
    const values = [
      data.avatar_url,
      data.name,
      date(data.birth).iso,
      data.email,
      data.education_level,
      data.hour_class,
      data.teacher
    ]
    db.query (query, values,
      function (err, results) {
        if (err) throw `Error Database ${err}`
        callback(results.rows[0].id)
      }
    )
  },
  find (id, callback) {
    db.query (`
      SELECT students.*, teachers.name AS teacher_name
      FROM students
      LEFT JOIN teachers ON (students.teacher_id = teachers.id) 
      WHERE students.id = $1`, [id],
      function (err, results) {
        if (err) throw `Error Database ${err}`
        callback(results.rows[0])
      }
    )
  },
  update (data, callback) {
    const query = `
      UPDATE students 
      SET avatar_url=($1),
        name=($2),
        birth=($3),
        email=($4),
        education_level=($5),
        hour_class=($6),
        teacher_id=($7)
      WHERE id=$8`
    const values = [
      data.avatar_url,
      data.name,
      date(data.birth).iso,
      data.email,
      data.education_level,
      data.hour_class,
      data.teacher,
      data.id
    ]
    db.query (query, values, 
      function (err, results) {
        console.log(data.teacher)
        if (err) throw `Error Database ${err}`
        callback()
      }
    )
  },
  delete (id, callback) {
    db.query (`
      DELETE FROM students
      WHERE id = $1`, [id],
      function (err, results) {
        if (err) throw `Error Database ${err}`
        callback()
      }
    )
  },
  teacherSelectOption (callback) {
    db.query (`
      SELECT name, id
      FROM teachers`,
      function (err, results) {
        if (err) throw `Error Database ${err}`

        callback(results.rows)
      }
    )
  }
}