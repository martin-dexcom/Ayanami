const inquirer = require('inquirer')
const figlet = require('figlet')
const chalk = require('chalk')

const { convertTestResultToJSON, getDerivedDataPath } = require('./Utils/XcodeUtils')
const { parseXcodeTest } = require('./Utils/TestParser')

console.log(chalk.blue(figlet.textSync('Ayanami')))
console.log(chalk.cyan('Author: Martin Garcia'))
console.log(chalk.cyan('Copyright: (C) Dexcom 2021'))
console.log("")

const main = async () => {
    var derivedDataPath = await getDerivedDataPath()
    derivedDataPath += '/[Your Project]/Logs/Test'
    inquirer.prompt([
        {
            type: 'input',
            name: 'filepath',
            message: 'Test filepath (you can drag the file from Finder)\n? This file should be under: ' + derivedDataPath
        },
        {
            type: 'output',
            name: 'outputfilepath',
            message: "Output path (where you'd like to store the results)",
            default: "./"
        }
    ])
    .then( async (answers) => {
        let json = await convertTestResultToJSON(answers['filepath'])
        let targets = await parseXcodeTest(json, answers['outputfilepath'])
        console.log("Successfully wrote %i number of files", targets)
    })
    .catch((error) => {
    
    })
}

main()