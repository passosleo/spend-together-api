"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignInResponseDTO = void 0;
/**
 * @openapi
 * components:
 *   schemas:
 *     SignInResponseDTO:
 *       type: object
 *       properties:
 *         type:
 *           type: string
 *         token:
 *           type: string
 */
class SignInResponseDTO {
    type;
    token;
    constructor(data) {
        this.type = data.type;
        this.token = data.token;
    }
    static create(data) {
        return new SignInResponseDTO(data);
    }
}
exports.SignInResponseDTO = SignInResponseDTO;
