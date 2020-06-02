const helpers = {};

helpers.getTotalDocuments = (Model, query) => {
    const { where } = query;
    return Model.find(where).estimatedDocumentCount();
}

module.exports = helpers;