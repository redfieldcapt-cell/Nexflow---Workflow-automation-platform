const axios = require('axios');

class SlackIntegration {
  constructor(token) {
    this.token = token;
    this.baseUrl = 'https://slack.com/api';
  }

  async sendMessage(channel, message, options = {}) {
    const response = await axios.post(
      `${this.baseUrl}/chat.postMessage`,
      {
        channel,
        text: message,
        ...options
      },
      {
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.data.ok) {
      throw new Error(`Slack API error: ${response.data.error}`);
    }

    return response.data;
  }

  async uploadFile(channel, file, options = {}) {
    const formData = new FormData();
    formData.append('channels', channel);
    formData.append('file', file);
    
    if (options.title) {
      formData.append('title', options.title);
    }

    const response = await axios.post(
      `${this.baseUrl}/files.upload`,
      formData,
      {
        headers: {
          'Authorization': `Bearer ${this.token}`
        }
      }
    );

    if (!response.data.ok) {
      throw new Error(`Slack API error: ${response.data.error}`);
    }

    return response.data;
  }

  async createChannel(name, isPrivate = false) {
    const endpoint = isPrivate ? 'conversations.create' : 'conversations.create';
    
    const response = await axios.post(
      `${this.baseUrl}/${endpoint}`,
      {
        name,
        is_private: isPrivate
      },
      {
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.data.ok) {
      throw new Error(`Slack API error: ${response.data.error}`);
    }

    return response.data.channel;
  }

  async inviteUsers(channel, users) {
    const response = await axios.post(
      `${this.baseUrl}/conversations.invite`,
      {
        channel,
        users: users.join(',')
      },
      {
        headers: {
          'Authorization': `Bearer ${this.token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.data.ok) {
      throw new Error(`Slack API error: ${response.data.error}`);
    }

    return response.data;
  }
}

module.exports = SlackIntegration;
