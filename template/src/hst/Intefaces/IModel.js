import axios from "axios";
import hst from "hst/index";

export default class IModel {

    #model = "";

    constructor(model) {
        this.#model = model;
    }

    #getURL() {
        return hst.conf.server + "api/general/orm?target=" + hst.conf.serverTarget + "&table=" + this.#model;
    }

    find(criteria) {
        return new Promise((resolve, reject) => {
            if (criteria === undefined) {
                criteria = {};
            }
            axios.post(this.#getURL(), {
                selector: "find",
                criteria: criteria,
                initialValues: null,
                valuesToSet: null
            }).then(res => {
                this.attributes = res.data;
                this.attributes.forEach(element => {
                    element.update = () => {
                        return new Promise((resolve, reject) => {
                            this.update({ id: element.id }).then(res => {
                                resolve(res)
                            }).catch(err => {
                                reject(err);
                            });
                        });
                    }
                    element.destroy = () => {
                        return new Promise((resolve, reject) => {
                            this.destroy({ id: element.id }).then(res => {
                                resolve(res)
                            }).catch(err => {
                                reject(err);
                            });
                        });
                    }
                });
                resolve(this.attributes);
            });
        });
    }

    findOne(criteria) {
        return new Promise((resolve, reject) => {
            if (criteria === undefined) {
                criteria = {};
            }
            axios.post(this.#getURL(), {
                selector: "findOne",
                criteria: criteria,
                initialValues: null,
                valuesToSet: null
            }).then(res => {
                this.attributes = res.data;
                this.attributes.update = () => {
                    return new Promise((resolve, reject) => {
                        this.update({ id: res.data.id }).then(res => {
                            resolve(res)
                        }).catch(err => {
                            reject(err);
                        });
                    });
                }
                res.data.destroy = () => {
                    return new Promise((resolve, reject) => {
                        this.destroy({ id: res.data.id }).then(res => {
                            resolve(res)
                        }).catch(err => {
                            reject(err);
                        });
                    });
                }
                resolve(this.attributes);
            }).catch(err => {
                reject(err);
            });
        })
    }

    addToCollection(criteria) {
        var setFunction = {
            set: (valuesToSet) => {
                return new Promise((resolve, reject) => {
                    if (criteria === undefined && criteria.id === undefined || criteria.model === undefined) {
                        reject("Beklenen değerler sağlanmıyor. örn. {id : 1, model : 'pets'}")
                    }
                    var value = [];
                    if (valuesToSet !== undefined) {
                        if (Array.isArray(valuesToSet)) {
                            if (typeof valuesToSet[0] === "number") {
                                value = valuesToSet;
                            } else {
                                valuesToSet.forEach(element => {
                                    value.push(element.id)
                                });
                            }
                        } else {
                            if (typeof valuesToSet === "number") {
                                value.push(valuesToSet);
                            } else {
                                value.push(valuesToSet.id);
                            }
                        }
                        axios.post(this.#getURL(), {
                            selector: "addToCollection",
                            criteria: criteria,
                            initialValues: null,
                            valuesToSet: value
                        }).then(res => {
                            resolve(res.data);
                        });
                    } else {
                        reject("Set için beklenen değerler sağlanmıyor. örn. {id : 1} , [1 , 5] veya 1")
                    }
                });
            }
        }
        return setFunction;
    }

    archive(criteria) {
        return new Promise((resolve, reject) => {
            if (criteria === undefined) {
                reject("Arşiv kriteriniz yok.")
            } else {
                axios.post(this.#getURL(), {
                    selector: "archive",
                    criteria: criteria,
                    initialValues: null,
                    valuesToSet: null
                }).then(res => {
                    resolve(res.data);
                });
            }
        });
    }

    archiveOne(criteria) {
        return new Promise((resolve, reject) => {
            if (criteria === undefined) {
                reject("Arşiv kriteriniz yok.")
            } else {
                axios.post(this.#getURL(), {
                    selector: "archiveOne",
                    criteria: criteria,
                    initialValues: null,
                    valuesToSet: null
                }).then(res => {
                    resolve(res.data);
                });
            }
        });
    }

    archiveFindOne(criteria) {
        return new Promise((resolve, reject) => {
            if (criteria === undefined) {
                criteria = {};
            }
            criteria.fromModel = this.#model;
            axios.post(this.#getURL(), {
                selector: "archiveFindOne",
                criteria: criteria,
                initialValues: null,
                valuesToSet: null
            }).then(res => {
                resolve(res.data);
            });

        });
    }

    archiveFind(criteria) {
        return new Promise((resolve, reject) => {
            if (criteria === undefined) {
                criteria = {};
            }
            criteria.fromModel = this.#model;
            axios.post(this.#getURL(), {
                selector: "archiveFind",
                criteria: criteria,
                initialValues: null,
                valuesToSet: null
            }).then(res => {
                resolve(res.data);
            });

        });
    }

    avg(attrName, criteria) {
        var whereFunction = {
            where: (whereData) => {
                if (criteria === undefined) {
                    criteria = {};
                }
                if (whereData === undefined) {
                    whereData = {}
                }
                return new Promise((resolve, reject) => {
                    axios.post(this.#getURL(), {
                        selector: "avg",
                        criteria: criteria,
                        numericAttrName: attrName,
                        where: whereData,
                        initialValues: null,
                        valuesToSet: null
                    }).then(res => {
                        resolve(res.data);
                    });
                });
            }
        }
        return whereFunction;
    }

    count(criteria) {
        return new Promise((resolve, reject) => {
            if (criteria === undefined) {
                criteria = {};
            }
            axios.post(this.#getURL(), {
                selector: "count",
                criteria: criteria,
                initialValues: null,
                valuesToSet: null
            }).then(res => {
                resolve(res.data);
            });
        });
    }

    create() {
        var createData = this.#synchronized();
        return new Promise((resolve, reject) => {
            axios.post(this.#getURL(), {
                selector: "create",
                criteria: null,
                initialValues: createData,
                valuesToSet: null
            }).then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err);
            });
        })
    }

    destroy(criteria) {
        return new Promise((resolve, reject) => {
            if (criteria === undefined) {
                criteria = {};
            }
            axios.post(this.#getURL(), {
                selector: "destroy",
                criteria: criteria,
                initialValues: null,
                valuesToSet: null
            }).then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err);
            });
        })
    }

    destroyOne(criteria) {
        return new Promise((resolve, reject) => {
            if (criteria === undefined) {
                criteria = {};
            }
            axios.post(this.#getURL(), {
                selector: "destroy",
                criteria: criteria,
                initialValues: null,
                valuesToSet: null
            }).then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err);
            });
        })
    }

    getDatastore() {
        return new Promise((resolve, reject) => {
            axios.post(this.#getURL(), {
                selector: "getDatastore",
                criteria: null,
                initialValues: null,
                valuesToSet: null
            }).then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err);
            });
        })
    }

    removeFromCollection(criteria) {
        var setFunction = {
            set: (valuesToSet) => {
                return new Promise((resolve, reject) => {
                    if (criteria === undefined && criteria.id === undefined || criteria.model === undefined) {
                        reject("Beklenen değerler sağlanmıyor. örn. {id : 1, model : 'pets'}")
                    }
                    var value = [];
                    if (valuesToSet !== undefined) {
                        if (Array.isArray(valuesToSet)) {
                            if (typeof valuesToSet[0] === "number") {
                                value = valuesToSet;
                            } else {
                                valuesToSet.forEach(element => {
                                    value.push(element.id)
                                });
                            }
                        } else {
                            if (typeof valuesToSet === "number") {
                                value.push(valuesToSet);
                            } else {
                                value.push(valuesToSet.id);
                            }
                        }
                        axios.post(this.#getURL(), {
                            selector: "removeFromCollection",
                            criteria: criteria,
                            initialValues: null,
                            valuesToSet: value
                        }).then(res => {
                            resolve(res.data);
                        });
                    } else {
                        reject("Set için beklenen değerler sağlanmıyor. örn. {id : 1} , [1 , 5] veya 1")
                    }
                });
            }
        }
        return setFunction;
    }

    sum(attrName, criteria) {
        var whereFunction = {
            where: (whereData) => {
                if (criteria === undefined) {
                    criteria = {};
                }
                if (whereData === undefined) {
                    whereData = {}
                }
                return new Promise((resolve, reject) => {
                    axios.post(this.#getURL(), {
                        selector: "sum",
                        criteria: criteria,
                        numericAttrName: attrName,
                        where: whereData,
                        initialValues: null,
                        valuesToSet: null
                    }).then(res => {
                        resolve(res.data);
                    });
                });
            }
        }
        return whereFunction;
    }

    update(criteria) {
        var updateData = this.#synchronized();
        return new Promise((resolve, reject) => {
            if (criteria === undefined) {
                criteria = {};
            }
            axios.post(this.#getURL(), {
                selector: "update",
                criteria: criteria,
                initialValues: null,
                valuesToSet: updateData
            }).then(res => {
                resolve(res.data);
            }).catch(err => {
                console.log(err);
                reject(err);
            });
        });
    }

    validate(attrName, value) {
        return new Promise((resolve, reject) => {
            if (value === undefined) {
                value = {};
            }
            axios.post(this.#getURL(), {
                selector: "validate",
                criteria: value,
                numericAttrName: attrName,
                initialValues: null,
                valuesToSet: null
            }).then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err);
            });
        });
    }

    #synchronized() {
        var data = Object.assign({}, this.attributes);
        var changedData = Object.assign({}, this.attributes);
        delete changedData.destroy;
        delete changedData.update;
        delete changedData.createdAt;
        delete changedData.updatedAt;
        delete changedData.id
        // Senkronize Edilelecek Data Var
        if (Object.keys(data).filter(e => typeof data[e] === "object").length > 0) {
            var count = 0;
            (async => {
                Object.keys(data).filter(e => typeof data[e] === "object").forEach(element => {
                    // Objeler Array mi ?
                    if (Array.isArray(data[element])) {
                        changedData[element] = [];
                        data[element].forEach(arrayData => {
                            if (arrayData.id !== undefined) {
                                // Güncelle
                                changedData[element].push(arrayData.id);
                            } else {
                                // Yeni
                                changedData[element].push(arrayData);
                            }
                        });
                    } else {
                        if (data[element] !== null) {
                            if (data[element].id !== undefined) {
                                // Güncelle
                                changedData[element] = data[element].id;
                            } else {
                                // Yeni
                                changedData[element] = data[element]
                            }
                        }
                    }
                });
            })();
            return changedData;
        }
        return changedData;
    }

}