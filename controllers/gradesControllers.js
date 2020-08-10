import { promises } from 'fs';

const { writeFile, readFile } = promises;

//POST
async function insertGrade(grade) {
  try {

    if (!grade.student || !grade.subject || !grade.type || !grade.value) {
      throw new Error("All fields are mandatory!");
    }

    const data = JSON.parse(await readFile(global.fileName));

    grade = {
      id: data.nextId++,
      student: grade.student,
      subject: grade.subject,
      type: grade.type,
      value: grade.value,
      timestamp: new Date
    };

    data.grades.push(grade);

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    return grade;

  } catch (err) {
    console.log(err);
  }
}

//GET
async function getGrade() {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    delete data.nextId;
    return data

  } catch (err) {
    console.log(err);
  }
}

//GET:id
async function getIdGrade(req, res) {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    const grade = data.grades.find(grade =>
      grade.id === parseInt(req.params.id));
    await writeFile(global.fileName, JSON.stringify(data, null, 2));
    res.send(grade);

  } catch (err) {
    console.log(err)
  }
}

//PUT
async function putGrade(grade) {
  try {

    if (!grade.student || !grade.subject || !grade.type || !grade.value) {
      throw new Error("All fields are mandatory!");
    }

    const data = JSON.parse(await readFile(global.fileName));
    const index = data.grades.findIndex(user => user.id === grade.id);

    if (index === -1) {
      throw new Error("Register not Found!")
    }

    data.grades[index].student = grade.student;
    data.grades[index].subject = grade.subject;
    data.grades[index].type = grade.type,
      data.grades[index].value = grade.value,
      data.grades[index].timestamp = new Date

    await writeFile(global.fileName, JSON.stringify(data, null, 2));

    return grade;

  } catch (err) {
    console.log(err);
  }
}

//DELETE
async function deleteGrade(req, res) {
  try {
    const data = JSON.parse(await readFile(global.fileName));
    data.grades = data.grades.filter(grade =>
      grade.id !== parseInt(req.params.id));
    await writeFile(global.fileName, JSON.stringify(data, null, 2));
    res.end();

  } catch (err) {
    console.log(err)
  }
}

//Soma das notas por matéria
async function totalGrade(req, res) {
  try {
    const { student, subject } = req.params;

    const data = JSON.parse(await readFile(global.fileName));
    const filter = data.grades.filter(grade => {
      return grade.student === student && grade.subject === subject;
    });

    const totalGrade = filter.reduce((sum, current) => {
      return sum + current.value
    }, 0);

    res.send({ SUMMATION: totalGrade })

  } catch (error) {
    console.log(error);
  }
}

// Média das notas por matéria e tipo
async function averageGrade(req, res) {
  try {
    const { subject, type } = req.params;

    const data = JSON.parse(await readFile(global.fileName));
    const filter = data.grades.filter(grade => {
      return grade.subject === subject && grade.type === type;
    });

    const totalGrade = filter.reduce((sum, current) => {
      return sum + current.value
    }, 0);

    const averageGrade = totalGrade / filter.length;

    res.send({ AVERAGE: averageGrade })

  } catch (err) {
    console.log(err);
  }
}

// As 3 melhores notas por matéria e tipo
async function threeBestGrade(req, res) {
  try {
    const { subject, type } = req.params;

    const data = JSON.parse(await readFile(global.fileName));
    const filter = data.grades.filter(grade => {
      return grade.subject === subject && grade.type === type;
    });

    const sort = filter.sort((a, b) => b.value - a.value);
    const betterThree = sort.slice(0, 3);

    res.send(betterThree);

  } catch (err) {
    console.log(err)
  }
}

export { 
        insertGrade, getGrade, getIdGrade, 
        putGrade, deleteGrade, totalGrade, 
        averageGrade, threeBestGrade 
      }