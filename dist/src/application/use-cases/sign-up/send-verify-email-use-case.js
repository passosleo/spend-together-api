"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendVerifyEmailUseCase = void 0;
const app_config_1 = require("../../../config/app.config");
const exception_1 = require("../../../infra/exception");
const mail_service_types_1 = require("../../services/mail/mail-service.types");
class SendVerifyEmailUseCase {
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
        const { userId, username, emailVerified, email } = user;
        if (emailVerified) {
            throw new exception_1.Exception('BAD_REQUEST', 'Email already verified');
        }
        const verifyEmailToken = this.helpers.encryption.encrypt({
            userId,
            expiresAt: this.helpers.date.calculateExpiration({ minutes: 10 }),
        });
        const link = `${app_config_1.config.app.baseUrl}${app_config_1.config.redirects.verifyEmail}?token=${encodeURIComponent(verifyEmailToken)}`;
        const template = this.mailService.renderTemplate(mail_service_types_1.MailTemplate.VERIFY_EMAIL, {
            username,
            link,
        });
        await this.mailService.sendMail({
            to: email,
            subject: 'Spend Together - Verification',
            body: template,
        });
    }
}
exports.SendVerifyEmailUseCase = SendVerifyEmailUseCase;
