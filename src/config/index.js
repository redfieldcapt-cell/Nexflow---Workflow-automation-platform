const fs = require('fs');
const path = require('path');

function loadConfig() {
  const configPath = process.env.CONFIG_PATH || './config.yml';
  
  const defaults = {
    port: 3000,
    database: {
      url: process.env.DATABASE_URL,
      pool: {
        min: 2,
        max: 10
      }
    },
    redis: {
      url: process.env.REDIS_URL
    },
    logging: {
      level: process.env.LOG_LEVEL || 'info'
    },
    execution: {
      max_concurrent: 100,
      default_timeout: 300000
    }
  };
  
  // Load from file if exists
  if (fs.existsSync(configPath)) {
    const yaml = require('js-yaml');
    const fileConfig = yaml.load(fs.readFileSync(configPath, 'utf8'));
    return { ...defaults, ...fileConfig };
  }
  
  return defaults;
}

module.exports = { loadConfig };
