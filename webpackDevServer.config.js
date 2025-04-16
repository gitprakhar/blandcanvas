module.exports = {
  allowedHosts: 'all',
  host: 'localhost',
  port: 3001,
  hot: true,
  client: {
    webSocketURL: {
      hostname: 'localhost',
      pathname: '/ws',
      port: 3001,
    },
  },
}; 