"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderPage = void 0;
const fs_1 = __importDefault(require("fs"));
function renderPage(page) {
    return (req, res, next) => {
        const pagePath = `${req.app.get('views')}/pages/${page}/index.ejs`;
        fs_1.default.readFile(pagePath, 'utf8', (err, data) => {
            if (err) {
                return next(err);
            }
            res.render('pages/layout', { body: data, page });
        });
    };
}
exports.renderPage = renderPage;
