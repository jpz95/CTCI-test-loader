import lineReader from 'line-reader'

const _inputFilePath = 'src/topics/'

let _readFileInput = ({ filePath, observer}) => {
    lineReader.eachLine(filePath, (line, last) => {
        observer.onNext(line)

        if (last) {
            observer.onCompleted()
            return false
        }
    })
}

export default {
    loadInputFile: ({ topic, observer }) => {
        try {
            const filePath = _inputFilePath + topic + '/input.txt'
            _readFileInput({ observer, filePath, })

        } catch(err) {
            console.error(err);
        }
    }
}