const _registeredTopics = {
    'arraysAndStrings': 1, // map to chapter
    'linkedLists': 2,
    'stacksAndQueues': 3,
    'treesAndGraphs': 4
}

let _currentTopic = ''
let _currentQuestion = null

let _isTopic = (topic) => {
    return _registeredTopics[topic] ? true : false
}

export default {
    isTopic: _isTopic,

    getTopicNumber: (topic) => {
        if (!topic) {
            topic = _currentTopic
        }
        if (_isTopic(topic) === false) {
            return -1
        }
        return _registeredTopics[topic]
    },

    getCurrentTopic: () => {
        return _currentTopic
    },
    setCurrentTopic: (topic) => {
        if (_isTopic(topic) === false) {
            throw new Error('Cannot set invalid topic', topic)
        }
        _currentTopic = topic
    },

    getCurrentQuestion: () => {
        return _currentQuestion
    },
    setCurrentQuestion: (questionNumber) => {
        // TODO validate?
        _currentQuestion = questionNumber
    }
}