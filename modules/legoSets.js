const setData = require("../data/setData");
const themeData = require("../data/themeData");

let sets = [];

function initialize() {
    return new Promise((resolve, reject) => {
        try {
            setData.forEach(set => {
                const theme = themeData.find(theme => theme.id === set.theme_id);
                if (theme) {
                    const newSet = { ...set, theme: theme.name };
                    sets.push(newSet);
                }
            });
            resolve();
        } catch (error) {
            reject(error);
        }
    });
}

function getAllSets() {
    return new Promise((resolve, reject) => {
        try {
            resolve(sets);
        } catch (error) {
            reject(error);
        }
    });
}

function getSetByNum(setNum) {
    return new Promise((resolve, reject) => {
        try {
            const foundSet = sets.find(set => set.set_num === setNum);
            if (foundSet) {
                resolve(foundSet);
            } else {
                reject("Unable to find requested set");
            }
        } catch (error) {
            reject(error);
        }
    });
}

function getSetsByTheme(theme) {
    return new Promise((resolve, reject) => {
        try {
            const lowercaseTheme = theme.toLowerCase();
            const foundSets = sets.filter(set => set.theme.toLowerCase() === lowercaseTheme);
            if (foundSets.length > 0) {
                resolve(foundSets);
            } else {
                reject("Unable to find requested sets");
            }
        } catch (error) {
            reject(error);
        }
    });
}


module.exports = {
    initialize,
    getAllSets,
    getSetByNum,
    getSetsByTheme
};
