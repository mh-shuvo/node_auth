import request from 'supertest';
import express from 'express';
import router from './routes/auth';


const app = new express();
app.use('/', router);

describe('Good Home Routes', function () {

    test('responds to /', async () => {
      const res = await request(app).get('/');
      expect(res.header['content-type']).toBe('text/html; charset=utf-8');
      expect(res.statusCode).toBe(200);
      expect(res.text).toEqual('hello world!');
    });
    
  });