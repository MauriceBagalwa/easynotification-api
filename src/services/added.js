class Added {
    constructor(name) {
        console.log(`:) welcome to my world ${name}`)
    }
    //

    // Adding for all data
    async add(model, body, next) {

        const value = new model(body);
        console.log(value)

        await value.save(function (err, docs) {
            if (err) return next(err);
            return docs
        })
    }

    //Loadings data
    loadingData(model, filter) {
        const data = model.find(filter, function () {

        })
    }
}

module.exports = { Added }