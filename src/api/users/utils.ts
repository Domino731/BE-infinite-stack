import * as EmailValidator from 'email-validator';

export const handleCreateUserError = (message: string): string => {
  let payload = '';
  // TODO could: add code instead of strings, FE should render message based on this code
  if (message.includes('E-mail is required')) {
    payload = 'E-mail is required';
  } else if (message.includes('Username is required')) {
    payload = 'Username is required';
  } else if (message.includes('Password is required')) {
    payload = 'Password is required';
  } else if (message.includes('CreatedAt key is required')) {
    payload = 'CreatedAt key is required';
  } else if (message.includes('Username is too short')) {
    payload = 'Username is too short';
  } else if (message.includes('Username is too long')) {
    payload = 'Username is too long';
  } else if (message.includes('Password is too short')) {
    payload = 'Password is too short';
  } else if (message.includes('duplicate key error') && message.includes('eMail')) {
    payload = 'This e-mail address was already assigned to other account';
  } else if (message.includes('Invalid e-mail address')) {
    payload = 'Invalid e-mail address';
  } else if (message.includes('Invalid password')) {
    payload = 'Invalid password';
  }

  console.log('message', message);
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
