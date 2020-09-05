const fs = require('fs')
const data = require('../data.json')
const { age, graduation, modalidad, date, grade } = require('../utils')
const Intl = require('intl')

exports.index = function (req, res) {
  const students = data.students.map((student) => {
    return {
      ...student,
      educationLevel: grade(student.educationLevel)
    } 
  })

  return res.render('students/index', { students: students })
}

exports.create = function (req, res) {
  return res.render('students/create')
}

exports.show = function (req, res) {
  const { id } = req.params
  const foundStudent = data.students.find(function (student) {
    return id == student.id
  })

  if (!foundStudent) return res.send ('student not found')

  const student = {
    ...foundStudent,
    age: age(foundStudent.birth),
    birth: date(foundStudent.birth).birthDay,
    educationLevel: grade(foundStudent.educationLevel)
  }
  return res.render('students/show', { student })
}

exports.edit = function (req,res) {
  const { id } = req.params
  const foundStudent = data.students.find(function (student) {
    return id == student.id
  })

  if (!foundStudent) return res.send ('student not found')

  const student = {
    ...foundStudent,
    birth: date(foundStudent.birth).iso,
  }

  return res.render('students/edit', { student })
}

exports.post = function (req, res) {
  const keys = Object.keys(req.body)
  
  for (key of keys) {
    if (req.body[key] == "") {
      return res.send('Preencha todos os campos!')
    }
  }
  
  let { avatar_url, name, birth, email, educationLevel, hourClass } = req.body
  
  birth = Date.parse(birth)
  let id = 1
  for (let i = 0; i< data.students.length; i++) {
    data.students.map(function (element) {
      if (element.id == id) {
        id = id + 1
        return id
      }else {
        return id
      }
    })
  }
  
  data.students.push({ id, avatar_url, name, birth, email, educationLevel, hourClass: Number(req.body.hourClass) })
  
  fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send ('Erro no documento')
    
    return res.redirect(`/students/${id}`)
  })
}

exports.put = function (req, res) {

  const {id} = req.body
  let index = 0
  const foundStudent = data.students.find(function(student, foundIndex) {
    if (student.id == id) {
      index = foundIndex
      return true
    }
  })
  if (!foundStudent) return res.send('Student not found!')

  const student = {
    ...foundStudent,
    ...req.body,
    id: Number(req.body.id),
    birth: Date.parse(req.body.birth),
    hourClass: Number(req.body.hourClass)
  }

  data.students[index] = student

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
    if(err) return res.send ('Write Error')
    
    return res.redirect(`/students/${id}`)
  })
}

exports.delete = function (req, res) {
  const { id } = req.body
  let index =  0
  const filterStudent = data.students.filter(function (student, foundIndex) {
    index = foundIndex
    return student.id != id
  })

  data.students = filterStudent

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
    if (err) {
      return res.send ('Write error')
    }
    return res.redirect ('/students')
  })
}