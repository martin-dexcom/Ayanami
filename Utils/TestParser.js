const createCsvWriter = require('csv-writer').createObjectCsvWriter

const getCodeCoverage = (coveredLines, executableLines) => {
    return (coveredLines / executableLines) * 100
}

const parseXcodeTest = (file) => {
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
            path: 'out.csv',
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


module.exports = {}