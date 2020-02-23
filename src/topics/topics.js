const _registeredTopics = {
    'arraysAndStrings': 1, // map to chapter
    'linkedLists': 2,
    'stacksAndQueues': 3,
    'treesAndGraphs': 4
}

const isTopic = (topic) => {
    return _registeredTopics[topic] ? true : false
}

export default {
    isTopic,
}