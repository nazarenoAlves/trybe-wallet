export const LOGIN_ACTION = 'LOGIN_ACTION';

export function loginAction(email) {
  return { type: LOGIN_ACTION, email };
}
