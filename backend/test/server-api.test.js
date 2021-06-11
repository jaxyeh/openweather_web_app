const nock = require('nock');
const request = require("supertest");
const app = require('../index');

// Mock Console Log
global.console = {log: jest.fn()}

const mockData = { "message": "This is a mocked response" };

afterEach(() => {
  nock.cleanAll()
});

describe("Test basic server instance", () => {
  it("should return generic data", (done) => {
    request(app)
      .get("/")
      .expect(200)
      .then((response) => {
        expect(response.text).toBe('OpenWeather API Server');
        done();
      })
      .catch(err => done(err));
  });
});

describe("Test /forecast API", () => {
  it("should receive data", (done) => {
    nock("https://api.openweathermap.org")
      .get(/data/)
      .reply(200, mockData);

    request(app)
      .get("/forecast?zipcode=95630")
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toStrictEqual(mockData);
        done();
      })
      .catch(err => done(err));
  });

  it("should receive data from cache", (done) => {
    nock("https://api.openweathermap.org")
      .get(/data/)
      .reply(200, {"different":"data"});

    request(app)
      .get("/forecast?zipcode=95630")
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toStrictEqual(mockData);
        done();
      })
      .catch(err => done(err));
  });

  it("should receive error", (done) => {
    nock("https://api.openweathermap.org")
      .get(/data/)
      .reply(500, mockData);

    request(app)
      .get("/forecast?zipcode=95603")
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500)
      .then(() => {
        return done();
      })
      .catch(err => done(err));
  });

  it("should receive error", (done) => {
    request(app)
      .get("/forecast?zipcode=123456789")
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500)
      .then((_response) => {
        done();
      })
      .catch(err => done(err));
  });
});

describe("Test /current API", () => {
  it("should receive data", (done) => {
    nock("https://api.openweathermap.org")
      .get(/data/)
      .reply(200, mockData);

    request(app)
      .get("/current?zipcode=95630")
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toStrictEqual(mockData);
        done();
      })
      .catch(err => done(err));
  });

  it("should receive data from cache", (done) => {
    nock("https://api.openweathermap.org")
      .get(/data/)
      .reply(200, {"different":"data"});

    request(app)
      .get("/current?zipcode=95630")
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toStrictEqual(mockData);
        done();
      })
      .catch(err => done(err));
  });

  it("should receive error", (done) => {
    nock("https://api.openweathermap.org")
      .get(/data/)
      .reply(500, mockData);

    request(app)
      .get("/current?zipcode=95603")
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500)
      .then(() => {
        return done();
      })
      .catch(err => done(err));
  });

  it("should receive error", (done) => {
    request(app)
      .get("/current?zipcode=123456789")
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500)
      .then(() => {
        return done();
      })
      .catch(err => done(err));
  });
});

describe("Test /full-report API", () => {
  it("should receive data", (done) => {
    nock("https://api.openweathermap.org")
      .get(/data/)
      .reply(200, mockData);

    request(app)
      .get("/full-report?zipcode=95630")
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .then((response) => {
        expect(response.body).toStrictEqual({
          current: mockData,
          forecast: mockData
        });
        done();
      })
      .catch(err => done(err));
  });

  it("should receive error", (done) => {
    request(app)
      .get("/full-report?zipcode=123456789")
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(500)
      .then(() => {
        return done();
      })
      .catch(err => done(err));
  });
});
