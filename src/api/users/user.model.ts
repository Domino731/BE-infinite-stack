import * as moongose from 'mongoose';
import {REGISTER_ERRORS} from "./const";

/** mongo schema for users collection */
export const UserSchema = new moongose.Schema({
    eMail: {
        type: String,
        required: [true, REGISTER_ERRORS.EMAIL_REQUIRED],
        unique: true,
    },
    username: {
        type: String,
        required: [true, REGISTER_ERRORS.USERNAME_REQUIRED],
        maxlength: [20, REGISTER_ERRORS.USERNAME_TOO_LONG],
        minLength: [3, REGISTER_ERRORS.USERNAME_TOO_SHORT],
    },
    password: {
        type: String,
        required: [true, REGISTER_ERRORS.PASSWORD_REQUIRED],
        minlength: [8, REGISTER_ERRORS.PASSWORD_TOO_SHORT],
    },
    createdAt: {
        type: Date,
        required: [true, REGISTER_ERRORS.CREATED_AT_REQUIRED],
        unique: true,
    },
    specializationArea: {
        type: String,
        required: [true, REGISTER_ERRORS.SPECIALIZATION_AREA_REQUIRED],
    },
    specialization: {
        type: String,
        required: [true, REGISTER_ERRORS.SPECIALIZATION_REQUIRED],
    },
    uid: {
        type: String,
        required: true,
    },
});
