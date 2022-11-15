import * as EmailValidator from 'email-validator';

export const handleCreateUserError = (message: string): string => {
  let payload = '';
  // duplicates
  if (
    message.includes('E11000 duplicate key error collection') &&
    message.includes('eMail')
  ) {
    payload = 'This E-mail is already in use';
  }
  // required keys
  else if (
    message.includes('user validation failed') &&
    message.includes('eMail')
  ) {
    payload = 'E-mail is required';
  } else if (
    message.includes('user validation failed') &&
    message.includes('username')
  ) {
    payload = 'Username is required';
  } else if (
    message.includes('user validation failed') &&
    message.includes('password')
  ) {
    payload = 'Password is required';
  } else if (
    message === 'Invalid e-mail address' ||
    'Invalid password, check requirements'
  ) {
    payload = message;
  } else if (message === 'Username is too long') {
    payload = 'Username is too long';
  } else if (message === 'Username is too short') {
    payload = 'Username is too short';
  }
  console.log('payload', payload);
  return payload;
};

export const validateCreateUserDate = (
  bodyData: Record<string, any>,
): string | null => {
  let payload: string | null = null;
  if (!EmailValidator.validate(bodyData.eMail)) {
    payload = 'Invalid e-mail address';
  } else if (!bodyData.username) {
    payload = 'Username is required';
  } else if (bodyData.username.length < 3) {
    payload = 'Username is too short, min 3 characters';
  } else if (bodyData.username.length > 15) {
    payload = 'Username is too long, max 15 characters';
  }
  return payload;
};
