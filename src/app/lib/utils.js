module.exports= {
  age: function age (timestamp) {
    const today = new Date()
    const birthDate = new Date(timestamp)

    let age = today.getFullYear() - birthDate.getFullYear()
    const month = today.getMonth() - birthDate.getMonth()

    if (month < 0 || month == 0 && today.getDate() < birthDate.getDate()){
      age = age - 1
    }
    return age
  },
  graduation: function (element) {
    switch (element) {
      case 'medio': return 'Ensino Médio Completo';
      case 'superior': return 'Ensino Superior Completo';
      case 'doctor': return 'Doutorado';
      case 'master': return 'Mestrado';
      default: break;
    }
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

    return {
      day,
      month,
      year,
      iso: `${year}-${month}-${day}`,
      birthDay: `${day}/${month}`,
      format: `${day}/${month}/${year}`
    }
  },
  grade: function (element) {
    switch (element) {
      case '5EF': return '5° Ano do Fundamental';
      case '6EF': return '6° Ano do Fundamental';
      case '7EF': return '7° Ano do Fundamental';
      case '8EF': return '8° Ano do Fundamental';
      case '9EF': return '9° Ano do Fundamental';
      case '1EM': return '1° Ano do Médio';
      case '2EM': return '2° Ano do Médio';
      case '3EM': return '3° Ano do Médio';
      default: break;
    }
  }
}