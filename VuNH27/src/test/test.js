var chai = require("chai");
var chaiHttp = require("chai-http");
var app = require("../../app");
let should = require("should");
chai.should();
chai.use(chaiHttp);
const User = require("../model/User");
const checkToken = require("../routes/share");
let token = "";
let tokenRefresh = "";
describe("Auth", () => {
  beforeEach((done) => {
    done();
  });
  describe("", () => {
    it("LOGIN DONE", (done) => {
      const body = {
        username: "admin",
        password: "123",
      };
      chai
        .request(app)
        .post(`/auths/login`)
        .send(body)
        .end((err, res) => {
          token = res.body.token;
          tokenRefresh = res.body.tokenRefresh;
          should.exist(res);
          should.equal(res.status, 200);
          res.body.should.be.a("object");
          done();
        });
    });
    it(" GET All ACCOUNT DONE", (done) => {
      chai
        .request(app)
        .get(`/auths`)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          should.exist(res);
          should.equal(res.status, 200);
          res.body.should.be.a("object");
          res.body.should.have.property("users");
          res.body.should.have.property("counts");
          done();
        });
    });
    it(" GET All ACCOUNT DONE WITH FIELD", (done) => {
      chai
        .request(app)
        .get(`/auths?keySearch=admin`)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          should.exist(res);
          should.equal(res.status, 200);
          res.body.should.be.a("object");
          res.body.should.have.property("users");
          res.body.should.have.property("counts");
          done();
        });
    });
    it(" GET All ACCOUNT DONE WITH SORT", (done) => {
      chai
        .request(app)
        .get(`/auths?sortBy=username`)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          should.exist(res);
          should.equal(res.status, 200);
          res.body.should.be.a("object");
          res.body.should.have.property("users");
          res.body.should.have.property("counts");
          done();
        });
    });
    it(" GET All ACCOUNT DONE WITH SORT AND KEYSEARCH", (done) => {
      chai
        .request(app)
        .get(`/auths?sortBy=username&keySearch=admin`)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          should.exist(res);
          should.equal(res.status, 200);
          res.body.should.have.property("users");
          res.body.should.have.property("counts");
          res.body.should.be.a("object");
          done();
        });
    });
    it(" GET All ACCOUNT DONE WITH SORT AND FEILD", (done) => {
      chai
        .request(app)
        .get(`/auths?sortBy=username&sortBy=fullname&orderBy=ASC`)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          should.exist(res);
          should.equal(res.status, 200);
          res.body.should.have.property("users");
          res.body.should.have.property("counts");
          res.body.should.be.a("object");
          done();
        });
    });
    it(" GET All ACCOUNT FAIL", (done) => {
      chai
        .request(app)
        .get(`/auths/ad`)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          should.exist(res);
          should.equal(res.status, 404);
          res.body.should.be.a("object");
          res.body.should.have.property("message").eql("Not found");
          done();
        });
    });
    it(" ADD ACCOUNT DONE", (done) => {
      const user = {
        username: (Math.random() + 1).toString(36).substring(7),
        password: "123",
        email: "testtest@gmail.com",
        fullname: "testFull",
        address: "Bac Ninh",
      };
      chai
        .request(app)
        .post(`/auths`)
        .send(user)
        .end((err, res) => {
          should.exist(res);
          should.equal(res.status, 200);
          res.body.should.be.a("object");
          done();
        });
    });
    it(" ADD ACCOUNT ERROR SCHEMA", (done) => {
      const user = {
        username: (Math.random() + 1).toString(36).substring(7),
        password: "123",
        email: "testtest@gmail.com",
        fullname: "testFull",
        fullname2: "testFull",
        address: "Bac",
      };
      chai
        .request(app)
        .post(`/auths`)
        .send(user)
        .end((err, res) => {
          should.exist(res);
          should.equal(res.status, 400);
          res.body.should.be.a("object");
          res.body.should.have
            .property("message")
            .eql("Error form schema validation");
          done();
        });
    });
    it(" ADD ACCOUNT ERROR SCHEMA", (done) => {
      const user = {
        username: "admin",
        password: "123",
        email: "testtest@gmail.com",
        fullname: "testFull",
        address: "Bac Ninh",
      };
      chai
        .request(app)
        .post(`/auths`)
        .send(user)
        .end((err, res) => {
          should.exist(res);
          should.equal(res.status, 409);
          res.body.should.be.a("object");
          res.body.should.have.property("message").eql("Name duplicate");
          done();
        });
    });
    it(" GET ACCOUNT BY ID", (done) => {
      const id = "1635736308117";
      chai
        .request(app)
        .get(`/auths/${id}`)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          should.exist(res);
          should.equal(res.status, 200);
          res.body.should.be.a("object");
          done();
        });
    });
    it(" GET ACCOUNT BY ID FAIL", (done) => {
      const id = "16357363081171";
      chai
        .request(app)
        .get(`/auths/${id}`)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          should.exist(res);
          should.equal(res.status, 404);
          res.body.should.be.a("object");
          res.body.should.have.property("message").eql("Not found");
          done();
        });
    });
    it("LOGIN FAIL", (done) => {
      const body = {
        username: "adminz",
        password: "123",
      };
      chai
        .request(app)
        .post(`/auths/login`)
        .send(body)
        .end((err, res) => {
          should.exist(res);
          should.equal(res.status, 400);
          res.body.should.have.property("message").eql("User Not found.");
          res.body.should.be.a("object");
          done();
        });
    });
    it("LOGIN FAIL FROM ", (done) => {
      const body = {
        username: "adminz",
        password: "123",
      };
      chai
        .request(app)
        .post(`/auths/login`)
        .send(body)
        .end((err, res) => {
          should.exist(res);
          should.equal(res.status, 400);
          res.body.should.have.property("message").eql("User Not found.");
          res.body.should.be.a("object");
          done();
        });
    });
    it("LOGIN FAIL ISVALID PASSWORD ", (done) => {
      const body = {
        username: "admin",
        password: "1235",
      };
      chai
        .request(app)
        .post(`/auths/login`)
        .send(body)
        .end((err, res) => {
          should.exist(res);
          should.equal(res.status, 400);
          res.body.should.have.property("message").eql("Invalid Password!");
          res.body.should.be.a("object");
          done();
        });
    });
    it("EDIT ACCOUNT DONE ", (done) => {
      const user = {
        username: (Math.random() + 1).toString(36).substring(7),
        password: "123",
        email: "admin1@gmail.com",
        fullname: "testFull",
        address: "Bac Ninh",
      };
      chai
        .request(app)
        .put(`/auths/1635862238796`)
        .set("Authorization", `Bearer ${token}`)
        .send(user)
        .end((err, res) => {
          should.exist(res);
          should.equal(res.status, 200);
          res.body.should.have.property("message").eql("Successful");
          res.body.should.be.a("object");
          done();
        });
    });
    it("EDIT ACCOUNT ERROR FORM SCHEMA ", (done) => {
      const user = {
        username: (Math.random() + 1).toString(36).substring(7),
        password: "123",
        email: "admin1@gmail.com",
        fullname: "testFull",
        address: "Ba",
      };
      chai
        .request(app)
        .put(`/auths/1635862238796`)
        .set("Authorization", `Bearer ${token}`)
        .send(user)
        .end((err, res) => {
          should.exist(res);
          should.equal(res.status, 400);
          res.body.should.have
            .property("message")
            .eql("Error form schema validation");
          res.body.should.be.a("object");
          done();
        });
    });
    it("EDIT ACCOUNT ERROR Name DUPLICATE ", (done) => {
      const user = {
        username: "admin",
        password: "123",
        email: "admin1@gmail.com",
        fullname: "testFull",
        address: "Bac Ninh",
      };
      chai
        .request(app)
        .put(`/auths/1635862238796`)
        .set("Authorization", `Bearer ${token}`)
        .send(user)
        .end((err, res) => {
          should.exist(res);
          should.equal(res.status, 409);
          res.body.should.have.property("message").eql("Name duplicate");
          res.body.should.be.a("object");
          done();
        });
    });
    it("REFRESH TOKEN DONE ", (done) => {
      chai
        .request(app)
        .post(`/auths/renew`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          refreshToken: tokenRefresh,
        })
        .end((err, res) => {
          should.exist(res);
          should.equal(res.status, 200);
          res.body.should.have.property("token");
          res.body.should.have.property("tokenRefresh");
          res.body.should.have.property("username");
          res.body.should.be.a("object");
          done();
        });
    });
    it("REFRESH TOKEN REFRESH  ISVALID ", (done) => {
      chai
        .request(app)
        .post(`/auths/renew`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          refreshToken: "abc",
        })
        .end((err, res) => {
          should.exist(res);
          should.equal(res.status, 403);
          res.body.should.have
            .property("message")
            .eql("Refresher token is not valid");
          res.body.should.be.a("object");
          done();
        });
    });
    it("REFRESH TOKEN REFRESH  NOT AUTHENTICATE ", (done) => {
      chai
        .request(app)
        .post(`/auths/renew`)
        .set("Authorization", `Bearer ${token}`)
        .send({
          refreshToken: "",
        })
        .end((err, res) => {
          should.exist(res);
          should.equal(res.status, 401);
          res.body.should.have
            .property("message")
            .eql("You are not authenticated");
          res.body.should.be.a("object");
          done();
        });
    });
  });
});
