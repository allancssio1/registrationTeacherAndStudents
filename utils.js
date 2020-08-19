module.exports= {
  age: function age (timestamp) {
    const today = new Date()
    const birthDate = new Date(timestamp)

    let age = today.getFullYear() - birthDate.getFullYear()
    const month = today.getMonth() - birthDate.getMonth()

    if (month < 0 || month == 0 && today.getDate() < birthDate.getDate()){
      age =- age
    }
    return age
  },
  graduation: function (element) {
    
    if (element == "medio"){
      return "Ensino Médio Completo"
    }else if (element == "superior") {
      return "Ensino Superior Completo"
    }else if (element == "doctor") {
      return "Doutorado"
    }else { return "Mestrado"}
  },
  modalidad: function (element) {
    if (element == "presential") {
      return "Presencial"
    }else {
      return "A Distância"
    }
  },
  date: function (timestamp) {
    const date = new Date(timestamp)
    const year = date.getUTCFullYear()
    const month = `0${date.getUTCMonth() + 1}`.slice(-2)
    const day = `0${date.getUTCDate()}`.slice(-2)

    return `${year}-${month}-${day}`
  }
}