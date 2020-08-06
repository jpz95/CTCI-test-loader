import { Observable } from 'rx-lite'

import fileLoader from './file-loader'
import topics from '../topics/topics'
import TestCaseParser from './test-case-parser'

let _started = false

const _filePrompt = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

let _askQuestion = () => {
    _filePrompt.question(
        'Which topic\'s input file would you like to load? ',
        (answer) => {
            if (answer.toLowerCase() === 'exit') {
                // TODO need to kill process as well
                return _filePrompt.close()
            }

            const isTopicNumber = Number.isInteger(parseInt(answer))
            if (topics.isTopic(answer) && isTopicNumber) {
                // User gave topic number, instead of topic name
                answer = topics.toTopicString(answer)

            } else if (!topics.isTopic(answer)) {
                // Let user try again
                // TODO alert mistake to user in CLI
                _filePrompt.write("not a topic " + answer + "\n")
                _askQuestion()
            }

            _handleInputFile(answer)
        }
    )
}

let _handleInputFile = (topic) => {
    const topicTestCases = {}

    let source = Observable.create((observer) => {
        fileLoader.loadInputFile({
            observer: observer,
            topic: topic,
        })
    })
    source.subscribe(
        (nextLine) => {
            const { questionNumber, testCase } = TestCaseParser.parseLine(nextLine) || {}

            if (questionNumber && testCase) {
                _handleNewTestCase({
                    topicTestCases,
                    questionNumber,
                    testCase,
                })
            }
        },
        (error) => {
            console.warn(`Failed to load test cases for ${topic}.
                Try again!`
            )

            console.log()
            _askQuestion()
        },
        () => {
            //_filePrompt.pause()
            console.log("--completed!", JSON.stringify(topicTestCases))
            // run test cases (based on given topic and questions)

            // .. wait for test cases to run and then ask again
            _askQuestion()
        }
    )
}

const _handleNewTestCase = ({ topicTestCases, questionNumber, testCase }) => {
    if (!(questionNumber in topicTestCases)) {
        topicTestCases[questionNumber] = []
    }

    topicTestCases[questionNumber].push(testCase)
}

export default {
    startup: () => {
        if (_started === false) {
            _askQuestion()
        }

        _started = true
    }
}