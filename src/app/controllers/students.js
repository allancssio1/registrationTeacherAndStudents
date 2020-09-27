const { age, graduation, modalidad, date, grade } = require('../lib/utils')

module.exports = {
  index (req, res) {
    const students = data.students.map((student) => {
      return {
        ...student,
        educationLevel: grade(student.educationLevel)
      } 
    })
  
    return res.render('students/index', { students: students })
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
    
    let { avatar_url, name, birth, email, educationLevel, hourClass } = req.body
    
    return res.redirect(`/students/${id}`)
  },
  show (req, res) {
    return res.render('students/show')
  },
  edit (req,res) {
    return res.render('students/edit')
  },
  put (req, res) {
    const keys = Object.keys(req.body)
    
    for (key of keys) {
      if (req.body[key] == "") {
        return res.send('Preencha todos os campos!')
      }
    }
    
    let { avatar_url, name, birth, email, educationLevel, hourClass } = req.body
    
    return res.redirect(`/students/${id}`)
  },
  delete (req, res) {
    return res.redirect ('/students')
  }
}