const util = require('util')
const exec = util.promisify(require('child_process').exec)

/**
 * Gets the derived data path
 * @returns Derived Data path for the user
 */
const getDerivedDataPath = async () => {
    let stdout = await exec("defaults read com.apple.dt.Xcode.plist IDECustomDerivedDataLocation")
    .catch((error) => {
        return "~/Library/Developer/Xcode/DerivedData"
    })
    return stdout
}

/**
 * Converts Xcode's raw test results to JSON
 * @param {String} filepath File path to the Test Result
 * @returns JSON Object containing raw test results
 */
const convertTestResultToJSON = async (filepath) => {
    let stdout = await exec("xcrun xccov view --report --json " + filepath)
    .catch((error) => {
        console.error("Unable to convert Test Result to JSON.")
        console.log(error)
        process.exit()
    })
    
    return JSON.parse(stdout['stdout'])
}

module.exports = {
    getDerivedDataPath,
    convertTestResultToJSON
}