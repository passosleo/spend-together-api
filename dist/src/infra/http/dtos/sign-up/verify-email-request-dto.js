"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyEmailRequestDTO = void 0;
/**
 * @openapi
 * components:
 *   schemas:
 *    VerifyEmailRequestDTO:
 *      type: object
 *      properties:
 *        token:
 *          type: string
 *          required: true
 */
class VerifyEmailRequestDTO {
    token;
    constructor(data) {
        this.token = data.token;
    }
    static create(data) {
        return new VerifyEmailRequestDTO(data);
    }
}
exports.VerifyEmailRequestDTO = VerifyEmailRequestDTO;
