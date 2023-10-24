const mongodb = require("mongodb");
const fs = require("fs");
const { MongoClient } = mongodb;

const credentials = {
  // Mongo Paths + URI
  MONGODB_URI: "<YOUR MONGODB URI>",
  SHARED_LIB_PATH:
    "<PATH TO YOUR CRYPT_SHARED LIB (DL FROM MONGODB WEBSITE)>",
};

// start-kmsproviders
const path = "./master-key.txt";
const localMasterKey = fs.readFileSync(path);
const kmsProviders = {
  local: {
    key: localMasterKey,
  },
};
// end-kmsproviders

const connectionString = credentials.MONGODB_URI;

// start-key-vault
const keyVaultNamespace = "encryption.__keyVault";
// end-key-vault

// start-schema
const schema = {
  bsonType: "object",
  encryptMetadata: {
    keyId: "/key-id",
  },
  properties: {
    insurance: {
      bsonType: "object",
      properties: {
        policyNumber: {
          encrypt: {
            bsonType: "int",
            algorithm: "AEAD_AES_256_CBC_HMAC_SHA_512-Random",
          },
        },
      },
    },
    medicalRecords: {
      encrypt: {
        bsonType: "array",
        algorithm: "AEAD_AES_256_CBC_HMAC_SHA_512-Random",
      },
    },
    bloodType: {
      encrypt: {
        bsonType: "string",
        algorithm: "AEAD_AES_256_CBC_HMAC_SHA_512-Random",
      },
    },
    ssn: {
      encrypt: {
        bsonType: "int",
        algorithm: "AEAD_AES_256_CBC_HMAC_SHA_512-Random",
      },
    },
  },
};


var db = "medicalRecords";
var coll = "patients";
var namespace = `${db}.${coll}`;

var patientSchema = {};
patientSchema[namespace] = schema;
// end-schema

// start-extra-options
const extraOptions = {
  cryptSharedLibPath: credentials["SHARED_LIB_PATH"],
};
// end-extra-options

const regularClient = new MongoClient(connectionString);

// start-client
const secureClient = new MongoClient(connectionString, {
  autoEncryption: {
    keyVaultNamespace,
    kmsProviders,
    schemaMap: patientSchema,
    extraOptions: extraOptions,
  },
});
// end-client



async function main() {
  
  await regularClient.connect();
  await secureClient.connect();
  
  try {

      
      
      let regularPatientCollection = regularClient
        .db("medicalRecords")
        .collection("patients")

      let securePatientCollection = secureClient
        .db("medicalRecords")
        .collection("patients")

      // start-insert
      try {
        await securePatientCollection
          .insertOne({
            name: "Jon Doe",
            ssn: 241014209,
            bloodType: "AB+",
            "key-id": "demo-data-key",
            medicalRecords: [{ weight: 180, bloodPressure: "120/80" }],
            insurance: {
              policyNumber: 123142,
              provider: "MaestCare",
            },
          });
      } catch (writeError) {
        console.error("writeError occurred:", writeError);
      }
      // end-insert


      // start-find
      console.log("Finding a document with regular (non-encrypted) client.");
      console.log(
        await regularPatientCollection.findOne({ name: /Jon/ })
      );

      console.log("Finding a document with encrypted client, searching on an encrypted field");
      console.log(
        await securePatientCollection.findOne({ name: /Jon/ })
      );
      // end-find

    } finally {

      await secureClient.close();
      await regularClient.close();

    }
}
main();