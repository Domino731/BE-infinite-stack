import {SERVER_ERROR} from "../../globalConstants";
import {LOGIN_ERRORS, REGISTER_ERRORS} from "./const";

/**
 * get an error message for login action
 * @param error - error message
 * */
export const loginErrorMessage = (error: string): string => {
    let payload: string = SERVER_ERROR;

    if (Object.values(LOGIN_ERRORS).includes(error as LOGIN_ERRORS)) {
        payload = error;
    }

    return payload;
}

/**
 * get an error message for register action
 * @param error - error message
 * */
export const registerErrorMessage = (error: string): string => {
    let payload: string = SERVER_ERROR;

    // check if account with e-mail is already exists or check if error is one of defined (REGISTER_ERRORS)
    if (error.includes('duplicate key error') && error.includes('eMail')) {
        payload = 'This e-mail address was already assigned to other account';
    } else if (Object.values(REGISTER_ERRORS).includes(error as REGISTER_ERRORS)) {
        payload = error;
    }

    return payload;
}


