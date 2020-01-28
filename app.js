const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const request = require("request");


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/failure", function(req, res) {
    res.redirect("/");
})

app.post("/", function(req, res) {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;

    var data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]

    }

    var jsonData = JSON.stringify(data);

    var options = {
        url: "https://us4.api.mailchimp.com/3.0/lists/56e5b39cec",
        method: "POST",
        headers: {
            "Authorization": "jatin4363 9565b9e3f8720a9894eba616fdbd0469-us4"
        },
        body: jsonData

    }

    request(options, function(error, response, body) {
        if (error) {
            res.sendFile(__dirname + "/failure.html");
        } else {
            if (response.statusCode === 200) {
                res.sendFile(__dirname + "/success.html");
            } else {
                res.sendFile(__dirname + "/failure.html");
            }
        }
    })
})

app.listen(process.env.PORT || 3000, function() {
    console.log("Server is started on http://localhost:3000");
})