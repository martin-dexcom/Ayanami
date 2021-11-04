const inquirer = require('inquirer')
const figlet = require('figlet')
const chalk = require('chalk')

const { convertTestResultToJSON } = require('./Utils/XcodeUtils')
const { parseXcodeTest } = require('./Utils/TestParser')

console.log(chalk.blue(figlet.textSync('Ayanami')))
console.log(chalk.cyan('Author: Martin Garcia'))
console.log(chalk.cyan('Copyright: (C) Dexcom 2021'))
console.log("\n")

const main = async () => {
    inquirer.prompt([
        {
            type: 'input',
            name: 'filepath',
            message: 'Test filepath (you can drag the file from Finder)'
        },
        {
            type: 'output',
            name: 'outputfilepath',
            message: "Output path (where you'd like to store the results)",
            default: "./"
        }
    ])
    .then((answers) => {
        convertTestResultToJSON(answers['filepath'])
        .then((json) => {
            const csv = parseXcodeTest(json, answers['outputfilepath'], () => {
                // all good!
            })
        })
    })
    .catch((error) => {
    
    })
}

main()