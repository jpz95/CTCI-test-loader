import lineReader from 'line-reader'

const _inputFilePath = 'src/topics/'

let _readFileInput = (args) => {
    lineReader.eachLine(args.filePath, (line, last) => {
        args.observer.onNext(line)

        if (last) {
            args.observer.onCompleted()
            return false
        }
    })
}

export default {
    loadInputFile: (args) => {
        try {
            const filePath = _inputFilePath + args.topic + '/input.txt'
            _readFileInput({
                observer: args.observer,
                filePath: filePath
            })
        } catch(err) {
            console.error(err);
        }
    }
}