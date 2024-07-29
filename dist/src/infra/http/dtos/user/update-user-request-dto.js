"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserRequestDTO = void 0;
/**
 * @openapi
 * components:
 *   schemas:
 *     UpdateUserRequestDTO:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           required: false
 *         isPublic:
 *           type: boolean
 *           required: false
 *         receiveEmails:
 *           type: boolean
 *           required: false
 */
class UpdateUserRequestDTO {
    name;
    isPublic;
    receiveEmails;
    constructor(data) {
        this.name = data.name;
        this.isPublic = data.isPublic;
        this.receiveEmails = data.receiveEmails;
    }
    static create(data) {
        return new UpdateUserRequestDTO(data);
    }
}
exports.UpdateUserRequestDTO = UpdateUserRequestDTO;
