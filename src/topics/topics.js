const _registeredTopics = {
    'arraysAndStrings': 1, // map to chapter
    1: 'arraysAndStrings',
    'linkedLists': 2,
    2: 'linkedLists',
    'stacksAndQueues': 3,
    3: 'stacksAndQueues',
    'treesAndGraphs': 4,
    4: 'treesAndGraphs',
}

const isTopic = (topic) => {
    return _registeredTopics[topic] ? true : false
}

const toTopicString = (topicNumber) => {
    return _registeredTopics[topicNumber] || -1;
}

export default {
    isTopic,
    toTopicString,
}