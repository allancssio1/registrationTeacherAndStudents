const { age, graduation, modalidad, date, grade } = require('../lib/utils')
const Student = require('../models/Student')
const teachers = require('./teachers')

module.exports = {
  index (req, res) {
    Student.all(function (students) {
      students.map((student) => {
        student.education_level = grade(student.education_level)
        return student
      })
      return res.render('students/index', { students })
    })
  
  },
  create (req, res) {
    return res.render('students/create')
  },
  post (req, res) {
    const keys = Object.keys(req.body)
    for (key of keys) {
      if (req.body[key] == "") {
        return res.send('Preencha todos os campos!')
      }
    }
    Student.create (req.body, function (student) {
      return res.redirect(`/students/${student}`)
    })
  },
  show (req, res) {
    Student.find (req.params.id, function (student) {
      if (!student) return res.send('student not found')
      student.age = age(student.birth)
      student.birth = date(student.birth).format
      student.education_level = grade(student.education_level)
      return res.render('students/show', { student })
    })
  },
  edit (req,res) {
    Student.find(req.params.id, function (student) {
      if (!student) return res.send ('Studnet not found')
      student.birth = date(student.birth).iso
      return res.render('students/edit', { student })
    })
  },
  put (req, res) {
    const keys = Object.keys(req.body)
    
    for (key of keys) {
      if (req.body[key] == "") {
        return res.send('Preencha todos os campos!')
      }
    }
    Student.update(req.body, function (student) {
      
      return res.redirect(`/students/${req.body.id}`)
    })
  },
  delete (req, res) {
    Student.delete (req.body.id, function (student) {
      return res.redirect (`/students`)
    })
  }
}