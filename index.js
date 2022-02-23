const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const app = express();
const port = 8000;
const {
  PassbaseClient,
  PassbaseConfiguration,
  ResponseFormats,
} = require("@passbase/node");

app.use(bodyParser.json());
app.use(cors());

const apiKey = "SECRET_API_KEY";

// Passbase Server Side SDK Configuration
const config = new PassbaseConfiguration({
  apiKey,
  format: ResponseFormats.Json,
});

const retrieveIdentityDetails = async (identityAccessKey) => {
  const client = new PassbaseClient(config);
  const identity = await client.getIdentityById(identityAccessKey);
  console.log("IDENTITY INFO: ", identity);
  checkIfUserIsUnderaged(identity);
};

// Helper function to calculate age from a string
const calculateAge = (dateString) => {
  var birthday = +new Date(dateString);
  return ~~((Date.now() - birthday) / 31557600000);
};

const checkIfUserIsUnderaged = (identity) => {
  // These document types have a date_of_birth field
  const documentsWithAgeProof = ["DRIVERS_LICENSE", "PASSPORT", "NATIONAL_ID"];

  // Iterate over all resources that are attached to an identity
  identity.resources.forEach((res) => {
    const validDocumentWithAge = documentsWithAgeProof.includes(res.type);

    // CHeck if the document has a date_of_birth field
    if (validDocumentWithAge) {
      const dob = calculateAge(res.datapoints.date_of_birth);
      console.log(`Birthdate ${res.datapoints.date_of_birth}`);
      console.log(`User age is ${dob}`);

      if (dob >= 18) {
        console.log("User is over 18");
        // Provision access
      } else {
        console.log("User is under 18");
        // Deny access
      }
    }
  });
};

// Receive Passbase webhook events
app.post("/passbase-webhooks", async (req, res) => {
  const webhook = req.body;
  switch (webhook.event) {
    case "VERIFICATION_REVIEWED":
      console.log("VERIFICATION_REVIEWED");
      retrieveIdentityDetails(webhook.key);
      break;
    case "VERIFICATION_COMPLETED":
      console.log("VERIFICATION_COMPLETED");
      break;
    default:
      console.log("Couldn't process webhook event");
  }
  res.status(200).send("Success");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
