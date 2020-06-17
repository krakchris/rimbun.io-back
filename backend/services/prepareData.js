const querySchema = {

    "getAllUsers": (data) => {
        return {
            where: {
                role: data.role || 'official'
            },
            page: data.page,
            limit: data.limit,
            mapId: data.mapId
        };
    },

    "getAllTags": (data) => {
        return {
            filter: {
                fields: {
                    tagName: 1
                }
            },
            page: data.page,
            limit: data.limit,
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
            filter: {
                fields: {
                    config: 0
                }
            },
            where: {
                userIds: data.userId
            },
            page: data.page,
            limit: data.limit,
            sort: '-createdAt'
        };
    },

    "getMapByMasterId": (data) => {
        return {
            where: {
                master: data.masterId
            }
        };
    },

    "mapAssocUsers": (data) => {
        return {
            where: {
                _id: data.mapId
            },
            filter: {
                fields: {
                    userIds: 1
                }
            }
        }
    }

};

const prepareQuery = (req, res, next) => {
    const type = req.path.split('/')[1];
    req.query = querySchema[type] ? querySchema[type](req.query) : req.query;
    next();
};

module.exports = {
    prepareQuery,
    querySchema
};