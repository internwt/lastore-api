const genrateUniqeId = (type) => {
    return type + Math.random().toString(16).slice(2)
}

module.exports = {
    genrateUniqeId
}