const fs = require('fs')
const data = require('./data.json')

exports.post = function (req, res){
  const keys = Object.keys(req.body)

  for (key of keys) {
    if (req.body[key] == ""){
      return res.send('Preencha todos os campos!')
    }
  }
  
  let { avatar_url, name, date, level, area, model } = req.body

  date = Date.parse(req.body.date)
  const create_at = Date.now()
  const id = Number(data.teachers.length + 1)

  data.teachers.push({
    id,
    avatar_url,
    name,
    date,
    level,
    area,
    create_at,
    model
  })

  fs.writeFile('data.json', JSON.stringify(data, null, 2), function (err) {
    if (err) return res.send ('Erro no documento')

    return res.redirect('teachers/register')
  })
}