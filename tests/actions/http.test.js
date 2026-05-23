const http = require('../../src/actions/http');
const nock = require('nock');

describe('HTTP Actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });
  
  test('GET request should return response', async () => {
    nock('https://api.example.com')
      .get('/data')
      .reply(200, { result: 'success' });
    
    const result = await http.get({}, {
      url: 'https://api.example.com/data'
    });
    
    expect(result.status).toBe(200);
    expect(result.data).toEqual({ result: 'success' });
  });
  
  test('POST request should send body', async () => {
    nock('https://api.example.com')
      .post('/data', { name: 'test' })
      .reply(201, { id: 123 });
    
    const result = await http.post({}, {
      url: 'https://api.example.com/data',
      body: { name: 'test' }
    });
    
    expect(result.status).toBe(201);
    expect(result.data.id).toBe(123);
  });
  
  test('should handle request timeout', async () => {
    nock('https://api.example.com')
      .get('/slow')
      .delay(5000)
      .reply(200);
    
    await expect(
      http.get({}, {
        url: 'https://api.example.com/slow',
        timeout: 100
      })
    ).rejects.toThrow();
  });
});
