const createCsvWriter = require('csv-writer').createObjectCsvWriter

/**
 * Calculates the code coverage based on Xcode's Test Results
 * @param {Number} coveredLines 
 * @param {Number} executableLines 
 * @returns Normalized code coverage
 */
const getCodeCoverage = (coveredLines, executableLines) => {
    return (coveredLines / executableLines)
}

/**
 * Parses an Xcode Test from JSON to CSV
 * @param {JSON} file JSON formatted test file
 * @param {String} filepath System path to store the text results
 */
const parseXcodeTest = (file, filepath) => {
    let targets = file['targets']

    for(const target of targets) {
        let targetName = target['name']
        let testedFileRows = []
        for(const testedFile of target['files']) {
            testedFileRows.push({
                path: testedFile['path'],
                name: testedFile['name'],
                coverage: getCodeCoverage(testedFile['coveredLines'], testedFile['executableLines'])
            })
        }

        const csvWriter = createCsvWriter({
            path: filepath + targetName.replace(".appex","").replace(" ","_") + '.csv',
            header: [
                {id: 'path', title: 'File Path'},
                {id: 'name', title: 'Name'},
                {id: 'coverage', title: 'Code Coverage'}
            ]
        })

        csvWriter
        .writeRecords(testedFileRows)
        .then(() => {
            console.log('CSV file for %s was written successfully.',targetName)
        })
    }
}

module.exports = {
    parseXcodeTest
}