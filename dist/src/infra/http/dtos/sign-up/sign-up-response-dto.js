"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUpResponseDTO = void 0;
/**
 * @openapi
 * components:
 *   schemas:
 *     SignUpResponseDTO:
 *       type: object
 *       properties:
 *         user:
 *           $ref: '#/components/schemas/UserAccountDTO'
 *         session:
 *           $ref: '#/components/schemas/SignInResponseDTO'
 */
class SignUpResponseDTO {
    user;
    session;
    constructor(data) {
        this.user = data.user;
        this.session = data.session;
    }
    static create(data) {
        return new SignUpResponseDTO(data);
    }
}
exports.SignUpResponseDTO = SignUpResponseDTO;
