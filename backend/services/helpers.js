const helpers = {};

helpers.getTotalDocuments = (Model, query) => {
    const { where } = query;
    return Model.find(where);
}

module.exports = helpers;