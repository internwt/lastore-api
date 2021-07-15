let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");

//Assertion Style
chai.should();

chai.use(chaiHttp);

describe('La Store API', () => {

    /**
     * Test the GET route
     */
    describe("GET /api/product/get", () => {
        it("It should GET all the tasks", (done) => {
            chai.request(server)
                .get("/api/products/get")
                .end((err, response) => {
                    console.log(err); // outputs null
                    // console.log(response); // outputs normal-looking response
                    // console.log(response.body) // { name: 'asad', class: 'paewe' }

                    response.should.have.status(200);
                    response.body.data.should.be.a('array');
                    response.body.data.length.should.be.eq(5);
                done();
                });
        });

        // it("It should NOT GET all the tasks", (done) => {
        //     chai.request(server)
        //         .get("/api/task")
        //         .end((err, response) => {
        //             response.should.have.status(404);
        //         done();
        //         });
        // });

    });


  



});
