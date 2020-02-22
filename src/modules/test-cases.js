import topics from '../topics/topics'

/* 1: { 2: ['test', 'test'] } */
var _testCases = {}

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
        topics.setCurrentQuestion(questionNumber)
    }
    return isQuestionNumber
}

let _getTopicQuestions = (topic) => {
    const topicNumber = topics.getTopicNumber(topic)
    console.log(" test??", _testCases)
    let topicQuestions = _testCases[topicNumber]
    if (!topicQuestions) {
        topicQuestions = {}
    }
    return topicQuestions
}

let _getQuestionTestCases = (questionNumber) => {
    if (!questionNumber) throw new Error('Missing question number in input file')
    
    const currentTopic = topics.getCurrentTopic()
    let topicQuestions = _getTopicQuestions(currentTopic)

    let questionTestCases = topicQuestions[questionNumber]
    if (!questionTestCases) {
        questionTestCases = []
    }
    return questionTestCases
}

let _parseAsTestCase = (line) => {
    const questionNumber = topics.getCurrentQuestion()
    let questionTestCases = _getQuestionTestCases(questionNumber)
    questionTestCases.push(line)
    console.log("pushed line", line)
}

export default {
    parseLine: (line) => {
        if (_checkIfWhitespace(line) === true ||
                _checkIfQuestionNumber(line) === true) {
            return
        }

        _parseAsTestCase(line)
        console.log("test cases" , _testCases)
    }
}