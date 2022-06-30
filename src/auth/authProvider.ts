const authProvider = {
  isAuthenticated: false,
  signin(callback: () => void) {
    authProvider.isAuthenticated = true;
    setTimeout(callback, 100); // fake async
  },
  signout(callback: () => void) {
    authProvider.isAuthenticated = false;
    setTimeout(callback, 100);
  },
};

export { authProvider };
