const { date, age, grade, modalidad, graduation } = require('../lib/utils')
const db = require('../config/db')

module.exports = {
  all (callback) {
    db.query(`SELECT * FROM teachers ORDER BY name ASC`, function (err, results) {
      if (err) throw `Error Database ${err}`
      callback(results.rows)
    })
  },
  create (data, callback) {
    const query = `
      INSERT INTO teachers (avatar_url, name, birth_date, education_level, class_type, subject_taught, created_at)
      VALUES ($1,$2,$3,$4,$5,$6, $7)
      RETURNING id`
    const values = [ data.avatar_url, data.name, date(data.birth_date).iso, data.education_level, data.class_type, data.subject_taught, date(Date.now()).iso ]
    db.query (query, values, function (err, results) {
      if (err) throw `Error Database ${err}`
      callback(results.rows[0].id)
    })
  },
  find (id, callback) {
    db.query (`SELECT * FROM teachers WHERE id = $1`,
      [id], function (err, results) {
        if (err) throw `Error Database ${err}`
        callback (results.rows[0])
      })
  },
  update (data, callback) {
    const query = `
      UPDATE teachers SET avatar_url=($1), name=($2), birth_date=($3), education_level=($4), class_type=($5), subject_taught($6)
      WHERE id=$7
    `
    const values = [
      data.avatar_url,
      data.name,
      date(data.birth_date).iso,
      data.education_level,
      data.class_type,
      data.subject_taught,
      data.id
    ]

    db.query (query, values, function (err, results) {
      if (err) throw `Error Database ${err}`
      callback()
    })
  },
  delete (id, callback) {
    db.query (`DELETE FROM teachers WHERE id = $1`, [id], function (err, results) {
        if (err) throw `Error Database ${err}`
        callback ()
      })
  }
}