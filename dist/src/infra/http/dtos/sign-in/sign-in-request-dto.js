"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInRequestDTO = void 0;
/**
 * @openapi
 * components:
 *   schemas:
 *     SignInRequestDTO:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 */
class SignInRequestDTO {
    email;
    password;
    constructor(data) {
        this.email = data.email;
        this.password = data.password;
    }
    static create(data) {
        return new SignInRequestDTO(data);
    }
}
exports.SignInRequestDTO = SignInRequestDTO;
