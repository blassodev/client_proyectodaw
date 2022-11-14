const authProvider = {
  isAuthenticated: false,
  signin(callback: () => void) {
    authProvider.isAuthenticated = true;
    callback();
  },
  signout(callback: () => void) {
    authProvider.isAuthenticated = false;
    callback();
  },
};

export { authProvider };
