"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailService = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const app_config_1 = require("../../../config/app.config");
const logger_1 = require("../../utils/logger");
class MailService {
    transporter;
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            host: app_config_1.config.mail.host,
            port: Number(app_config_1.config.mail.port),
            auth: {
                user: app_config_1.config.mail.user,
                pass: app_config_1.config.mail.password,
            },
            from: app_config_1.config.mail.user,
        });
    }
    async sendMail({ to, subject, body }) {
        try {
            await this.transporter.sendMail({
                to,
                subject: subject,
                html: body,
            });
        }
        catch (error) {
            logger_1.Logger.error('Error while sending email', JSON.stringify(error, null, 2));
        }
    }
    renderTemplate(template, data) {
        const content = fs_1.default.readFileSync(path_1.default.join(__dirname, `../../views/templates/${template}.html`), 'utf8');
        return content.replace(/{{([^{}]*)}}/g, (_, key) => {
            return data[key];
        });
    }
}
exports.MailService = MailService;
