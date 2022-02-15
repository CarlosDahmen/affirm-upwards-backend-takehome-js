import { afterAll, beforeAll, describe, expect, it, test } from '@jest/globals';
import request from 'supertest';

import app from '../app';
import { closeDb, syncDb } from './_db';


describe("Test Merchant Configuration Routes", () => {

  beforeAll(syncDb)

  afterAll(closeDb)


  test("POST /api/merchant_config returns 200 if merchant configuration was updated successfully", async () => {

    let res = await request(app)
      .post("/api/merchant_config")
      .set('Content-Type', 'application/json')
      .send({ data: {
        merchant_id: 1,
        minimum_loan_amount: 1000,
        maximum_loan_amount: 10000,
        prequal_enabled: true
      }})
    expect(res.status).toEqual(200)
  });

  test("POST /api/merchant_config returns 400 if there is no merchant registered to the merchant ID", async () => {
    let res = await request(app)
    .post("/api/merchant_config")
    .set('Content-Type', 'application/json')
    .send({ data: {
      merchant_id: 200,
      minimum_loan_amount: 1000,
      maximum_loan_amount: 10000,
      prequal_enabled: true
    }})
    .expect('Content-Type', /json/)
    expect(res.status).toEqual(400)
  });

  test("POST /api/merchant_config returns 400 if minimum loan amount is invalid", async () => {
    let res = await request(app)
    .post("/api/merchant_config")
    .set('Content-Type', 'application/json')
    .send({ data: {
      merchant_id: 1,
      minimum_loan_amount: -100,
      maximum_loan_amount: 10000,
      prequal_enabled: true
    }})
    expect(res.status).toEqual(400)
  });

  test("POST /api/merchant_config returns 400 if maximum loan amount is invalid", async () => {
    let res = await request(app)
    .post("/api/merchant_config")
    .set('Content-Type', 'application/json')
    .send({ data: {
      merchant_id: 1,
      minimum_loan_amount: 100,
      maximum_loan_amount: 50,
      prequal_enabled: true
    }})
    expect(res.status).toEqual(400)
  });

  test("POST /api/merchant_config returns 400 if prequal value is invalid", async () => {
    let res = await request(app)
    .post("/api/merchant_config")
    .set('Content-Type', 'application/json')
    .send({ data: {
      merchant_id: 1,
      minimum_loan_amount: 100,
      maximum_loan_amount: 1000,
      prequal_enabled: 10
    }})
    expect(res.status).toEqual(400)
  });
});
