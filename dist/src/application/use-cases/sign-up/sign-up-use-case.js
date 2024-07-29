"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpUseCase = void 0;
const app_config_1 = require("../../../config/app.config");
const user_1 = require("../../../domain/entities/user");
const user_mapper_1 = require("../../../infra/data/mappers/user-mapper");
const exception_1 = require("../../../infra/exception");
const sign_in_response_dto_1 = require("../../../infra/http/dtos/sign-in/sign-in-response-dto");
const sign_up_response_dto_1 = require("../../../infra/http/dtos/sign-up/sign-up-response-dto");
const mail_service_types_1 = require("../../services/mail/mail-service.types");
class SignUpUseCase {
    userRepository;
    mailService;
    tokenService;
    helpers;
    constructor(userRepository, mailService, tokenService, helpers) {
        this.userRepository = userRepository;
        this.mailService = mailService;
        this.tokenService = tokenService;
        this.helpers = helpers;
    }
    async execute(data) {
        const [emailExists, usernameExists] = await Promise.all([
            this.userRepository.findByUniqueKey({ email: data.email }),
            this.userRepository.findByUniqueKey({ username: data.username }),
        ]);
        if (emailExists) {
            throw new exception_1.Exception('CONFLICT', 'Email already exists');
        }
        if (usernameExists) {
            throw new exception_1.Exception('FORBIDDEN', 'Username already exists');
        }
        const hashedPassword = await this.helpers.password.hashPassword(data.password);
        const newUser = await this.userRepository.create(user_1.User.create({ ...data, password: hashedPassword }));
        const verifyEmailToken = await this.helpers.encryption.encrypt({
            userId: newUser.userId,
            expiresAt: this.helpers.date.calculateExpiration({ minutes: 10 }),
        });
        const link = `${app_config_1.config.app.baseUrl}${app_config_1.config.redirects.verifyEmail}?token=${encodeURIComponent(verifyEmailToken)}`;
        const mailTemplate = this.mailService.renderTemplate(mail_service_types_1.MailTemplate.VERIFY_EMAIL, {
            username: newUser.username,
            link,
        });
        const userAccount = user_mapper_1.UserMapper.toAccount(newUser);
        const accessToken = this.tokenService.createToken(userAccount);
        await this.mailService.sendMail({
            to: newUser.email,
            subject: 'Spend Together - Verification',
            body: mailTemplate,
        });
        return sign_up_response_dto_1.SignUpResponseDTO.create({
            user: userAccount,
            session: sign_in_response_dto_1.SignInResponseDTO.create({ type: 'Bearer', token: accessToken }),
        });
    }
}
exports.SignUpUseCase = SignUpUseCase;
