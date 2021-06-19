
const { notEqual } = require('assert')
const chalk = require('chalk')
const { command, describe, demandOption } = require('yargs')
const yargs = require('yargs')
const { addNote, removeNote, readNote, listNotes } = require('./app.js')
const app = require('./app.js')

//create add command
yargs.command({
  command: 'add',
  describe: 'adds note',
  builder:{
    title: {
      describe: 'Note title',
      demandOption: true,
      type:'string'
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string'
    }
  }, 
  handler (argv){
    console.log('Adding the note...')
    addNote(argv.title,argv.body)
  }
})

//create remove command
yargs.command({
  command: 'remove',
  describe: 'removes note',
  builder: {
    title: {
      describe: 'title of note to be removed',
      demandOption: true,
      type:'string'
    }
  },
  handler (argv){
    console.log('Removing the note...')
    removeNote(argv.title)
  }
})

//create list command
yargs.command({
  command: 'list',
  describe: 'lists note',
  handler (){
    console.log('Listing the note...')
    listNotes()
  }
})

//create read command
yargs.command({
  command: 'read',
  describe: 'reads note',
  builder: {
    title: {
      describe: 'title of note to be read',
      demandOption: true,
      type:'string'
    }
  },
  handler (argv){
    console.log('Reading the note...')
    readNote(argv.title)
  }
})

yargs.parse()
