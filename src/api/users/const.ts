/**
 * collection of errors for login action
 * */
export enum LOGIN_ERRORS {
    LOGIN_ERROR = 'Login failed, check password & e-mail',
    MISSING_DATA = 'Missing login data'
}

/**
 * collection of errors for register action
 * */
export enum REGISTER_ERRORS {
    EMAIL_REQUIRED = 'E-mail is required',
    USERNAME_REQUIRED = 'Username is required',
    PASSWORD_REQUIRED = 'Password is required',
    CREATED_AT_REQUIRED = 'CreatedAt key is required',
    USERNAME_TOO_SHORT = 'Username is too short',
    USERNAME_TOO_LONG = 'Username is too long',
    PASSWORD_TOO_SHORT = 'Password is too short',
    INVALID_EMAIL = 'Invalid e-mail address',
    INVALID_PASSWORD = 'Invalid password',
    SPECIALIZATION_AREA_REQUIRED = 'Specialization area is required',
    SPECIALIZATION_REQUIRED = 'Specialization is required',
}

export enum COMMON_USER_ERRORS {
    NOT_FOUND = 'User not found'
}

export const JWT_COOKIE_NAME: string = 'jwt';
