const fs = require('fs')
const data = require('./data.json')
const { age, graduation, modalidad, date } = require('./utils')
const Intl = require('intl')

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
    birth: date(foundTeacher.birth),
    area: foundTeacher.area.split(","),
    level: graduation(foundTeacher.level),
  }

  return res.render('teachers/edit', { teacher })
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
  const id = Number(data.teachers.length + 1)

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

    return res.redirect('teachers')
  })
}