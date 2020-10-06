const db = require("../config/db")
const {date} = require('../lib/utils')

module.exports = {
  all (callback) {
    db.query (`SELECT * FROM students ORDER BY name ASC`,
      function (err, results) {
        if (err) throw `Error Database ${err}`
        callback(results.rows)
      })
  },
  create (data, callback) {
    const query = `
      INSERT INTO students (avatar_url, name, birth, email, education_level, hour_class)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id`
    const values = [data.avatar_url, data.name, date(data.birth).iso, data.email, data.education_level, data.hour_class]
    db.query (query, values, function (err, results) {
      if (err) throw `Error Database ${err}`
      callback(results.rows[0].id)
    })
  },
  find (id, callback) {
    db.query (`SELECT * FROM students WHERE id = $1`, [id], function (err, results) {
      if (err) throw `Error Database ${err}`
      callback(results.rows[0])
    })
  },
  update (data, callback) {
    const query = `UPDATE students SET avatar_url=($1), name=($2), birth=($3), email=($4), education_level=($5), hour_class=($6) WHERE id=$7`
    const values = [data.avatar_url, data.name, date(data.birth).iso, data.email, data.education_level, data.hour_class, data.id]
    db.query (query, values, function (err, results) {
      if (err) throw `Error Database ${err}`
      callback()
    })
  },
  delete (id, callback) {
    db.query (`DELETE FROM students WHERE id = $1`, [id], function (err, results) {
      if (err) throw `Error Database ${err}`
      callback()
    })
  }
  
}