const querySchema = {

    "getAllUsers": (data) => {
        return {
            where: {
                role: data.role || 'official'
            }
        };
    },

    "getAllTags": () => {
        return {
            filter: {
                fields: {
                    tagName: 1
                }
            }
        };
    },

    "getMap": () => {
        return {
            filter: {
                include: 'master'
            }
        };
    },

    "getUserAssocMap": (data) => {
        return {
            where: {
                userIds: data.userId
            }
        };
    },

    "getMapByMasterId": (data) => {
        return {
            where: {
                master: data.masterId
            }
        };
    }
};

const prepareQuery = (req, res, next) => {
    const type = req.path.split('/')[1];
    req.query = querySchema[type] ? querySchema[type](req.query) : req.query;
    next();
};

module.exports = {
    prepareQuery
};