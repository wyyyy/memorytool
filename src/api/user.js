/**
 * 登陆
 */

export const login = data => fetch('/users/login', data, 'POST')
