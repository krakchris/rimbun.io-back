const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');
const {
    promisify
} = require('util');
const jwt = require('jsonwebtoken');
const errMsg = require('../messages/errorMessage');
const { getTotalDocuments } = require('../services/helpers');
exports.deleteOne = Model => async (req, res, next) => {
    try {
        const doc = await Model.findByIdAndDelete(req.params.id);

        if (!doc) {
            return next(new AppError(404, 'error', errMsg['NoDocFound']), req, res, next);
        }

        res.status(204).json({
            status: 'success',
            data: null
        });
    } catch (error) {
        next(error);
    }
};

exports.updateOne = Model => async (req, res, next) => {
    try {
        const mapConfig = { config: req.body };
        const doc = await Model.findByIdAndUpdate(req.params.id, mapConfig, {
          new: true,
          runValidators: true
        });

        if (!doc) {
            return next(new AppError(404, 'error', errMsg['NoDocFound']), req, res, next);
        }

        res.status(200).json({
            status: 'success',
            data: {
                doc
            }
        });

    } catch (error) {
        next(error);
    }
};

exports.createOne = Model => async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const creator = (await promisify(jwt.verify)(token, process.env.JWT_SECRET)).id;
        Object.assign(req.body, {creator});
        const doc = await Model.create(req.body);

        res.status(201).json({
            status: 'success',
            data: {
                doc
            }
        });

    } catch (error) {
        next(error);
    }
};

exports.getOne = Model => async (req, res, next) => {
    try {
        const { filter: {include} = {} } = req.query;
        const doc = await Model.findById(req.params.id)
                    .populate(include);

        if (!doc) {
            return next(new AppError(404, 'error', errMsg['NoDocFound']), req, res, next);
        }

        res.status(200).json({
            status: 'success',
            data: {
                doc
            }
        });
    } catch (error) {
        next(error);
    }
};

exports.getAll = Model => async (req, res, next) => {
    try {
        const { where = {}, filter: {fields} = {} } = req.query;
        const features = new APIFeatures(Model.find(where, fields), req.query)
            .sort()
            .paginate();

        // const doc = await features.query;
        const [doc, { length: totalDoc }] = await Promise.all([features.query, getTotalDocuments(Model, req.query)]);
        res.status(200).json({
            status: 'success',
            results: totalDoc,
            data: {
                data: doc
            }
        });

    } catch (error) {
        next(error);
    }

};