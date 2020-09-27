const { age, graduation, modalidad, date, grade } = require('../lib/utils')
const Teacher = require('../models/Teacher')

module.exports = {
  index (req, res) {
    Teacher.all(function (teachers) {
      teachers.map(function (teacher) {
        teacher.subject_taught = teacher.subject_taught.split(',')
        return teacher
      })
      return res.render('teachers/index', { teachers })
    })
  },
  create (req, res) {
    return res.render('teachers/create')
  },
  post (req, res) {
    const keys = Object.keys (req.body)
    for (key of keys) {
      if (req.body[key] == "") {
        return res.send('Preencha todos os campos!')
      }
    }
    Teacher.create(req.body, function (teacher) {
      return res.redirect(`/teachers/${teacher}`)
    })    
  },
  show (req, res) {
    Teacher.find (req.params.id, function (teacher) {
      if (!teacher) res.send ("Teacher not found")
     
      teacher.subject_taught = teacher.subject_taught.split(',')
      teacher.age = age(teacher.birth_date)
      teacher.education_level = graduation(teacher.education_level)
      teacher.class_type = modalidad(teacher.class_type)
      teacher.created_at = date(teacher.created_at).format
      return res.render('teachers/show', { teacher })
    })
  },
  edit (req,res) {
    Teacher.find(req.params.id, function (teacher) {
      if (!teacher) return res.send ('Teacher not found')

      teacher.birth_date = date(teacher.birth_date).iso
      teacher.education_level = graduation(teacher.education_level)
      return res.render ('teachers/edit', { teacher })
    })
  },
  put (req, res) {
    const keys = Object.keys (req.body)
    for (key of keys) {
      if (req.body[key] == "") {
        return res.send('Preencha todos os campos!')
      }
    }
    Teacher.update(req.body, function () {

      return res.redirect(`/teachers/${req.body.id}`)
    })
  },
  delete (req, res) {
    Teacher.delete (req.body.id, function (teacher) {

      return res.redirect (`/teachers`)
    })
  }
}