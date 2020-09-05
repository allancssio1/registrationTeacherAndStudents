const fs = require('fs')
const data = require('../data.json')
const { age, graduation, modalidad, date } = require('../utils')
const Intl = require('intl')

exports.index = function (req, res){
  let teachers = data.teachers.map((teacher) => {
    return {
      ...teacher,
      area: teacher.area.split(',')
    }
  })
  return res.render('teachers/index', { teachers })
}

exports.create = function (req, res) {
  return res.render('teachers/create')
}

exports.post = function (req, res){
  const keys = Object.keys(req.body)
  
  for (key of keys) {
    if (req.body[key] == ""){
      return res.send('Preencha todos os campos!')
    }
  }
  
  let { avatar_url, name, birth, level, area, model } = req.body
  
  birth = Date.parse(birth)
  const create_at = Date.now()
  let id = 1
  for (let i = 0; i< data.teachers.length; i++) {
    data.teachers.map(function (element) {
      if (element.id == id) {
        id = id + 1
        return id
      }else {
        return id
      }
    })
  }
  
  data.teachers.push({
    id,
    avatar_url,
    name,
    birth,
    create_at,
    level,
    area,
    create_at,
    model
  })
  
  fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send ('Erro no documento')
    
    return res.redirect(`/teachers/${id}`)
  })
}

exports.show = function (req, res) {
  const { id } = req.params
  const foundTeacher = data.teachers.find(function (teacher) {
    return id == teacher.id
  })

  if (!foundTeacher) return res.send ('teacher not found')

  const teacher = {
    ...foundTeacher,
    age: age(foundTeacher.birth),
    birth: Intl.DateTimeFormat('pt-BR').format(foundTeacher.birth),
    area: foundTeacher.area.split(","),
    level: graduation(foundTeacher.level),
    model: modalidad(foundTeacher.model),
    created_at: Intl.DateTimeFormat('pt-BR').format(foundTeacher.create_at)
  }
  return res.render('teachers/show', { teacher })
}

exports.edit = function (req,res) {
  const { id } = req.params
  const foundTeacher = data.teachers.find(function (teacher) {
    return id == teacher.id
  })

  if (!foundTeacher) return res.send ('teacher not found')

  const teacher = {
    ...foundTeacher,
    birth: date(foundTeacher.birth).iso,
    area: foundTeacher.area.split(","),
    level: graduation(foundTeacher.level),
  }

  return res.render('teachers/edit', { teacher })
}

exports.put = function (req, res) {

  const {id} = req.body
  let index = 0
  const foundTeacher = data.teachers.find(function(teacher, foundIndex){
    if (teacher.id == id){
      index = foundIndex
      return true
    }
  })
  if (!foundTeacher) return res.send('Teacher not found!')

  const teacher = {
    ...foundTeacher,
    ...req.body,
    id: Number(req.body.id),
    birth: Date.parse(req.body.birth)
  }

  data.teachers[index] = teacher

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
    if(err) return res.send ('Write Error')
    
    return res.redirect(`/teachers/${id}`)
  })
}

exports.delete = function (req, res) {
  const { id } = req.body
  let index =  0
  const filterTeacher = data.teachers.filter(function (teacher, foundIndex){
    index = foundIndex
    return teacher.id != id
  })

  data.teachers = filterTeacher

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
    if (err) {
      return res.send ('Write error')
    }
    return res.redirect ('/teachers')
  })
}