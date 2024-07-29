"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInUseCase = void 0;
const sign_in_response_dto_1 = require("../../../infra/http/dtos/sign-in/sign-in-response-dto");
class SignInUseCase {
    authService;
    tokenService;
    constructor(authService, tokenService) {
        this.authService = authService;
        this.tokenService = tokenService;
    }
    async execute(data) {
        const userAccount = await this.authService.authenticate(data.email, data.password);
        const accessToken = this.tokenService.createToken(userAccount);
        return sign_in_response_dto_1.SignInResponseDTO.create({ type: 'Bearer', token: accessToken });
    }
}
exports.SignInUseCase = SignInUseCase;
