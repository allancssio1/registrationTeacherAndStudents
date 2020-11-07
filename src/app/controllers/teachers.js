const { age, graduation, modalidad, date, grade } = require('../lib/utils')
const Teacher = require('../models/Teacher')

module.exports = {
  index (req, res) {
    let {filter, page, limit} = req.query
    page = page || 1
    limit = limit || 3
    offset = limit * (page - 1)

    const params ={
      filter,
      limit,
      page,
      offset,
      callback (teachers) {
        const pagination = {
          page,
          total: Math.ceil(teachers[0].total / limit)
        }
        teachers.map(teacher => {
          return teacher.subject_taught = teacher.subject_taught.split(',')
        })
        return res.render('teachers/index', { teachers, filter, pagination })
      }
    }
    Teacher.paginate(params)
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