"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendRecoverPasswordUseCase = void 0;
const app_config_1 = require("../../../config/app.config");
const exception_1 = require("../../../infra/exception");
const mail_service_types_1 = require("../../services/mail/mail-service.types");
class SendRecoverPasswordUseCase {
    userRepository;
    mailService;
    helpers;
    constructor(userRepository, mailService, helpers) {
        this.userRepository = userRepository;
        this.mailService = mailService;
        this.helpers = helpers;
    }
    async execute(data) {
        const user = await this.userRepository.findByUniqueKey({ email: data.email });
        if (!user) {
            throw new exception_1.Exception('NOT_FOUND', 'User not found');
        }
        const { userId, username, email } = user;
        const recoverPasswordToken = this.helpers.encryption.encrypt({
            userId,
            expiresAt: this.helpers.date.calculateExpiration({ minutes: 10 }),
        });
        const link = `${app_config_1.config.app.baseUrl}${app_config_1.config.redirects.recoverPassword}?token=${encodeURIComponent(recoverPasswordToken)}`;
        const template = this.mailService.renderTemplate(mail_service_types_1.MailTemplate.RECOVER_PASSWORD, {
            username,
            link,
        });
        await this.mailService.sendMail({
            to: email,
            subject: 'Spend Together - Recover password',
            body: template,
        });
    }
}
exports.SendRecoverPasswordUseCase = SendRecoverPasswordUseCase;
