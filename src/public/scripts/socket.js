// This file is for socket events common amongst all games

const socket = io({
  query: {
    // Gets the jwt token from cookies
    token: document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/, "$1"),
    uuid: window.location.pathname.split('/')[2]
  }
});