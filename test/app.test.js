const chai = require('chai');
const chaiHttp = require('chai-http');
const app  = require ("../src/app.js");
const expect = chai.expect;

chai.use(chaiHttp);

describe("App", () => {
    it("should return the home page", (done) => {
        chai
        .request(app)
        .get("/")
        .end((err, res) => {
            expect(res).to.have.status(200);
            done();
        });
    });
    
    it("should return the about page", (done) => {
        chai
        .request(app)
        .get("/about")
        .end((err, res) => {
            expect(res).to.have.status(200);
            done();
        });
    });
    
    it("should return the help page", (done) => {
        chai
        .request(app)
        .get("/help")
        .end((err, res) => {
            expect(res).to.have.status(200);
            done();
        });
    });
    
 
    
    it("should return the weather page", (done) => {
        chai
        .request(app)
        .get("/weather")
        .end((err, res) => {
            expect(res).to.have.status(200);
            done();
        });
    });

    it("should return the error page", (done) => {
        chai
        .request(app)
        .get("/*")
        .end((err, res) => {
            expect(res).to.have.status(404);
            done();
        });
    });
});