export const handleCreateUserError = (message: string): string => {
    let payload: string = '';
    // duplicates
    if (message.includes('E11000 duplicate key error collection') && message.includes('eMail')) {
        payload = 'This E-mail is already in use'
    }
    // required keys
    else if (message.includes('user validation failed') && message.includes('eMail')) {
        payload = 'E-mail is required'
    } else if (message.includes('user validation failed') && message.includes('username')) {
        payload = 'Username is required'
    } else if (message.includes('user validation failed') && message.includes('password')) {
        payload = 'Password is required'
    }
    return payload;
}