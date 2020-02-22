import { Observable } from 'rx-lite'
import fileLoader from './file-loader'
import topics from '../topics/topics'
import testCases from './test-cases';

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
                return _filePrompt.close()
            }

            if (!topics.isTopic(answer)) {
                // Let user try again
                // TODO alert mistake to user in CLI
                _filePrompt.write("not a topic " + answer + "\n")
                _askQuestion()
            }

            topics.setCurrentTopic(answer)
            _handleInputFile(answer)
        }
    )
}

let _handleInputFile = (topic) => {
    let source = Observable.create((observer) => {
        fileLoader.loadInputFile({
            observer: observer,
            topic: topic
        })
    })
    source.subscribe(
        (line) => {
            testCases.parseLine(line)
        },
        (error) => {
            console.log(error)
        },
        () => {
            //_filePrompt.pause()
            console.log("--completed!")
            _askQuestion()
            // need to resume when test cases are loaded
        }
    )
}

export default {
    startup: () => {
        if (_started === false) {
            _askQuestion()
        }
        return _started
    }
}