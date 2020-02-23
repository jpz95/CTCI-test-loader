let questionNumber = -1

const _checkIfWhitespace = (line) => { return /^\s+/.test(line) }

const _checkIfQuestionNumber = (line) => {
    const isQuestionNumber = /q\d{1,2}/i.test(line) === true

    if (isQuestionNumber) {
        const parsedLine = Number.parseInt(line.substr(1))
        if (Number.isNaN(parsedLine) === true) {
            throw new TypeError('Parsed question number line does not contain a number', line)
        }

        questionNumber = parsedLine
    }
    return isQuestionNumber
}

const _parseAsTestCase = (line = "") => {
    return line.trim()
}

const parseLine = (line) => {
    if (_checkIfQuestionNumber(line)) {
        return { questionNumber, }
    }

    if (!_checkIfWhitespace(line) && questionNumber > 0) {
        const testCase = _parseAsTestCase(line)
        return { questionNumber, testCase, }
    }
}

export { parseLine }

export default {
    parseLine,
}