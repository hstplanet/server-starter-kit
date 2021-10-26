module.exports = {

    functionSelect(model, data) {
        return new Promise((resolve, reject) => {
            if (data.selector === 'find') {
                this.find(model, data.criteria).then(res => {
                    resolve(res);
                });
            } else if (data.selector === 'findOne') {
                this.findOne(model, data.criteria).then(res => {
                    resolve(res);
                });
            } else if (data.selector === 'create') {
                this.create(model, data.initialValues).then(res => {
                    resolve(res);
                });
            } else if (data.selector === 'destroy') {
                this.destroy(model, data.criteria).then(res => {
                    resolve(res);
                });
            } else if (data.selector === 'destroyOne') {
                this.destroyOne(model, data.criteria).then(res => {
                    resolve(res);
                });
            } else if (data.selector === 'update') {
                this.update(model, data.criteria, data.valuesToSet).then(res => {
                    resolve(res);
                });
            } else if (data.selector === 'count') {
                this.count(model, data.criteria).then(res => {
                    resolve(res);
                });
            } else if (data.selector === 'addToCollection') {
                this.addToCollection(model, data.criteria, data.valuesToSet).then(res => {
                    resolve(res);
                });
            } else if (data.selector === 'archive') {
                this.archive(model, data.criteria).then(res => {
                    resolve(res);
                });
            } else if (data.selector === 'archiveOne') {
                this.archiveOne(model, data.criteria).then(res => {
                    resolve(res);
                });
            } else if (data.selector === 'archiveFind') {
                this.archiveFind(model, data.criteria).then(res => {
                    resolve(res);
                });
            } else if (data.selector === 'archiveFindOne') {
                this.archiveFindOne(model, data.criteria).then(res => {
                    resolve(res);
                });
            } else if (data.selector === 'avg') {
                this.avg(model, data.numericAttrName, data.criteria, data.where).then(res => {
                    resolve(res);
                });
            } else if (data.selector === 'count') {
                this.count(model, data.criteria).then(res => {
                    resolve(res);
                });
            } else if (data.selector === 'getDatastore') {
                this.getDatastore(model).then(res => {
                    resolve(res.config);
                });
            } else if (data.selector === 'removeFromCollection') {
                this.removeFromCollection(model).then(res => {
                    resolve(res);
                });
            } else if (data.selector === 'sum') {
                this.sum(model, data.numericAttrName, data.criteria, data.where).then(res => {
                    resolve(res);
                });
            } else if (data.selector === 'validate') {
                this.validate(model, data.numericAttrName, data.criteria).then(res => {
                    resolve(res);
                });
            }
        })
    },

    validate(model, numericAttrName, value) {
        return new Promise(async (resolve, reject) => {
            var validate = await model.validate(numericAttrName, value);
            resolve(validate);
        });
    },

    sum(model, numericAttrName, criteria, where) {
        return new Promise(async (resolve, reject) => {
            var sum = await model.sum(numericAttrName, criteria).where(where);
            resolve(sum);
        });
    },

    removeFromCollection(model, criteria, valuesToSet) {
        return new Promise(async (resolve, reject) => {
            var Record = await model.removeFromCollection(criteria.id, criteria.model).members(valuesToSet);
            resolve(Record);
        });
    },

    getDatastore(model) {
        return new Promise(async (resolve, reject) => {
            var getDatastore = model.getDatastore();
            resolve(getDatastore);
        });
    },

    count(model, criteria) {
        return new Promise(async (resolve, reject) => {
            var count = await model.count(criteria);
            resolve(count);
        });
    },

    avg(model, numericAttrName, criteria, where) {
        return new Promise(async (resolve, reject) => {
            var avg = await model.avg(numericAttrName, criteria).where(where);
            resolve(avg);
        });
    },

    archiveOne(model, criteria) {
        return new Promise(async (resolve, reject) => {
            var ArchiveOne = await model.archiveOne(criteria).fetch();
            resolve(ArchiveOne);
        });
    },

    archive(model, criteria) {
        return new Promise(async (resolve, reject) => {
            var Archive = await model.archive(criteria).fetch();
            resolve(Archive);
        });
    },

    archiveFind(model, criteria) {
        return new Promise(async (resolve, reject) => {
            var ArchiveFind = await Archive.find(criteria);
            resolve(ArchiveFind);
        });
    },

    archiveFindOne(model, criteria) {
        return new Promise(async (resolve, reject) => {
            var ArchiveFind = await Archive.findOne(criteria);
            resolve(ArchiveFind);
        });
    },

    addToCollection(model, criteria, valuesToSet) {
        return new Promise(async (resolve, reject) => {
            var Record = await model.addToCollection(criteria.id, criteria.model).members(valuesToSet);
            resolve(Record);
        });
    },

    find(model, criteria) {
        return new Promise(async (resolve, reject) => {
            var Record = await model.find(criteria).populateAll();
            resolve(Record);
        });
    },

    findOne(model, criteria) {
        return new Promise(async (resolve, reject) => {
            var Record = await model.findOne(criteria).populateAll();
            if (Record) {
                resolve(Record);
            }
            resolve({});
        });
    },

    create(model, initialValues) {
        return new Promise(async (resolve) => {
            var Record = await model.create(initialValues).fetch();
            if (Record) {
                resolve(Record);
            }
            resolve({});
        });
    },

    destroy(model, criteria) {
        return new Promise(async (resolve, reject) => {
            var Record = await model.destroy(criteria).fetch();
            if (Record) {
                resolve(Record);
            }
            resolve({});
        });
    },

    destroyOne(model, criteria) {
        return new Promise(async (resolve, reject) => {
            var Record = await model.destroyOne(criteria).fetch();
            if (Record) {
                resolve(Record);
            }
            resolve({});
        });
    },

    update(model, criteria, valuesToSet) {
        return new Promise(async (resolve) => {
            var Record = await model.update(criteria).set(valuesToSet).fetch();
            if (Record) {
                resolve(Record);
            }
            resolve({});
        });
    },

    count(model, criteria) {
        return new Promise(async (resolve, reject) => {
            var Record = await model.count(criteria);
            if (Record) {
                resolve(Record);
            }
            resolve({});
        });
    },

    objectAndArray(value) {
        return new Promise((resolve, reject) => {
            Object.keys(value).forEach(element => {
                var type = typeof value[element];
                if (type === 'object') {
                    if (Array.isArray(value[element])) {
                        var array = [];
                        value[element].forEach(async (arr) => {
                            if (arr.id !== undefined) {
                                var model = require("../../models/" + element);
                                this.update(model, { id: arr.id }, arr).then(res => {
                                    array.push(res.id);
                                });
                            } else {
                                console.log("../../models/" + element);
                                var model = require("../../models/" + element);
                                var Record = await model.create(arr).fetch();
                                if (Record) {
                                    array.push(Record.id);
                                }
                            }
                        });
                        //value[element] = array;
                        resolve();
                    } else {
                        if (value[element] !== null) {
                            if (value[element].id !== undefined) {
                                var model = require("../../models/" + element);
                                console.log(element, model.attributes);
                                console.log(value[element]);

                                /*this.update(model, { id: value[element].id }, value[element]).then(res => {
                                    value[element] = res.id;
                                });*/
                            } else {
                                var model = require("../../models/" + element);
                                console.log(element, model.attributes);
                                console.log(value[element]);
                                /*this.create(model, value[element]).then(res => {
                                    value[element] = res.id;
                                });*/
                            }
                            resolve();
                        }
                    }
                } else {
                    resolve();
                }
            });
        });
    }

}