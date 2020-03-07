import lineReader from 'line-reader'

const _inputFilePath = 'src/topics/'

let _readFileInput = ({ filePath, observer }) => {
    const closeReader = ({ reader, observer }) => {
        reader.close((err) => {
            if (err) {
                return observer.onError(err)
            }

            observer.onCompleted()
        })
    }

    lineReader.open(filePath, (err, reader) => {
        if (err) {
            return observer.onError(err)
        }

        if (!reader.hasNextLine()) {
            closeReader({ reader, observer })
        }

        while (reader.hasNextLine()) {
            reader.nextLine((err, line) => {
                if (err) {
                    return observer.onError(err)
                }

                observer.onNext(line)
            })
        }
        closeReader({ reader, observer })
    })
}

export default {
    loadInputFile: ({ topic, observer }) => {
        const filePath = _inputFilePath + topic + '/input.txt'
        _readFileInput({ observer, filePath, })
    }
}