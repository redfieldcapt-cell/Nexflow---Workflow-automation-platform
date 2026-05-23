const logger = require('../logger');

module.exports = async (context, params) => {
  const { message, level = 'info' } = params;
  
  logger[level](message);
  
  return {
    logged: true,
    message,
    timestamp: new Date().toISOString()
  };
};
