//const readline = require('readline')

const registeredTopics = {
    'arraysAndStrings': 1, // map to chapter
    'linkedLists': 2,
    'stacksAndQueues': 3,
    'treesAndGraphs': 4
}

const inputFilePath = 'src/topics/'

let currentTopic = ''
let currentQuestion = null

// maps topicNumber -> array of test cases (strings)
let testCases = {}

let _checkIfWhitespace = (line) => { return /^\s+/.test(line) }

let _checkIfQuestionNumber = (line) => {
    const isQuestionNumber = /q\d{1,2}/i.test(line) === true
    if (isQuestionNumber) {
        console.log("got question number", line)
        // parse and get question number
        let questionNumber = Number.parseInt(line.substr(1))
        if (Number.isNaN(questionNumber) === true) {
            throw new TypeError('Parsed question number is not a number', line)
        }
        currentQuestion = questionNumber
    }
    return isQuestionNumber
}

let _getTopicQuestions = () => {
    const topicNumber = registeredTopics[currentTopic]

    let topicQuestions = testCases[topicNumber]
    if (!topicQuestions) {
        topicQuestions = {}
    }
    return topicQuestions
}

let _getQuestionTestCases = () => {
    if (!currentQuestion) throw new Error('Missing question number in input file')

    let topicQuestions = _getTopicQuestions()
    return topicQuestions[currentQuestion]
}

let _handleTestCase = (line) => {
    let questionTestCases = _getQuestionTestCases()
    if (!questionTestCases) {
        questionTestCases = []
    } else {
        questionTestCases.push(line)
    }
}

let handleInputLine = (line) => {
    console.log("checking line", line)
    if (_checkIfWhitespace(line) === false) return

    if (_checkIfQuestionNumber(line) === true) return

    _handleTestCase(line)
}

export default {
    getTestCases: (topic) => {
        if (!topic) {
            return testCases
        }
    },

    loadInputFile: (topic) => {
        if (typeof topic !== 'string') {
            throw new TypeError('Expected a string', topic)
        }

        const topicNumber = registeredTopics[topic]
        if (!topicNumber) {
            throw new Error('Invalid topic', topic)
        }
        // Update state
        currentTopic = topic

        const testInput = inputFilePath + topic + '/input.txt'

        const rl = require('readline').createInterface({
            input: require('fs').createReadStream(testInput),
            crlfDelay: Infinity
        })

        rl.on('line', handleInputLine)
        /* rl.close() */
        const { once } = require('events')
        await once(rl, 'close')
        console.log(testCases)
    }
}