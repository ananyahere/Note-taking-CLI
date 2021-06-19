const chalk = require('chalk')
const fs = require('fs')
const loadNotes = () => {
  try{
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    const notesArr = JSON.parse(dataJSON)
    return notesArr
  }catch(e){
    return []
  }
}

const addNote = (title,body) => {
  const notesArr = loadNotes()
  const duplicatedNote = notesArr.find(note => note.title === title)
  if (!duplicatedNote){
    notesArr.push({
      title: title,
      body: body
    })
    saveNote(notesArr)
    console.log(chalk.bgGreen(' New note Added! '))
  }else{
    console.log(chalk.bgRed(' Note title taken! '))
  }
}

const saveNote = notesArr => {
    const updatedDataJSON = JSON.stringify(notesArr)
    fs.writeFileSync('notes.json', updatedDataJSON)
}

const removeNote = title => {
  const nodeArr = loadNotes()
  const updatedNodeArr = nodeArr.filter(node => node.title !== title)
  if (updatedNodeArr.length === nodeArr.length){
    saveNote(updatedNodeArr)
    console.log(chalk.bgRed.black(" No note found! "))
  } else if(updatedNodeArr.length < nodeArr.length) {
    saveNote(updatedNodeArr)
    console.log(chalk.bgGreen.black(' Note removed! '))
  }
}


const listNotes = () => {
  const nodeArr = loadNotes()
  console.log(chalk.inverse("Your notes"))
  nodeArr.forEach( note => {
    console.log(chalk.bold(note.title))
  });
}

const readNote = (title) => {
  const nodeArr = loadNotes()
  const nodeToBeRead = nodeArr.find( note => note.title === title)
  if (!nodeToBeRead){
    console.log(chalk.bgRed.black(" No note found! "))
  }else{
    console.log(`${chalk.inverse.bold(nodeToBeRead.title)}: ${nodeToBeRead.body}`)
  }
}

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  readNote: readNote,
  listNotes: listNotes,
}