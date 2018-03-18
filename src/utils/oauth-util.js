export function checkOAuthState(state) {
  return atob(state) === process.env.OAUTH_SECRET
}
