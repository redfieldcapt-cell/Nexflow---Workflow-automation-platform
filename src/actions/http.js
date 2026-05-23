const axios = require('axios');

async function get(context, params) {
  const { url, headers = {}, timeout = 30000 } = params;
  
  const response = await axios.get(url, {
    headers,
    timeout
  });
  
  return {
    status: response.status,
    headers: response.headers,
    data: response.data
  };
}

async function post(context, params) {
  const { url, headers = {}, body, timeout = 30000 } = params;
  
  const response = await axios.post(url, body, {
    headers,
    timeout
  });
  
  return {
    status: response.status,
    headers: response.headers,
    data: response.data
  };
}

async function put(context, params) {
  const { url, headers = {}, body, timeout = 30000 } = params;
  
  const response = await axios.put(url, body, {
    headers,
    timeout
  });
  
  return {
    status: response.status,
    data: response.data
  };
}

async function del(context, params) {
  const { url, headers = {}, timeout = 30000 } = params;
  
  const response = await axios.delete(url, {
    headers,
    timeout
  });
  
  return {
    status: response.status,
    data: response.data
  };
}

module.exports = { get, post, put, delete: del };
