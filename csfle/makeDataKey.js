const mongodb = require("mongodb");
const { MongoClient, ClientEncryption } = mongodb;

const credentials = {
  // Mongo Paths + URI
  MONGODB_URI: "<YOUR MONGODBURI>",
  SHARED_LIB_PATH:
    "<PATH TO YOUR CRYPT_SHARED LIB (DL FROM MONGODB WEBSITE)>",
};

// start-local-cmk
const fs = require("fs");
const crypto = require("crypto");
try {
  fs.writeFileSync("master-key.txt", crypto.randomBytes(96));
} catch (err) {
  console.error(err);
}
// end-local-cmk

// start-kmsproviders
const provider = "local";
const path = "./master-key.txt";
const localMasterKey = fs.readFileSync(path);
const kmsProviders = {
  local: {
    key: localMasterKey,
  },
};
// end-kmsproviders

// start-datakeyopts
// end-datakeyopts

async function main() {
  // start-create-index
  const uri = credentials.MONGODB_URI;
  const client = new MongoClient(uri);
  await client.connect();

  const keyVaultDatabase = "encryption";
  const keyVaultCollection = "__keyVault";
  const keyVaultNamespace = `${keyVaultDatabase}.${keyVaultCollection}`;

  const keyVaultDB = client.db(keyVaultDatabase);

  // Drop the Key Vault Collection in case you created this collection
  // in a previous run of this application.
  await keyVaultDB.dropDatabase();
  // Drop the database storing your encrypted fields as all
  // the DEKs encrypting those fields were deleted in the preceding line.
  await client.db("medicalRecords").dropDatabase();

  const keyVaultColl = keyVaultDB.collection(keyVaultCollection);
  await keyVaultColl.createIndex(
    { keyAltNames: 1 },
    {
      unique: true,
      partialFilterExpression: { keyAltNames: { $exists: true } },
    }
  );
  // end-create-index

  // start-create-dek
  const encryption = new ClientEncryption(client, {
    keyVaultNamespace,
    kmsProviders,
  });

  const key = await encryption.createDataKey(provider, {
    keyAltNames: ["demo-data-key"],
  });

  console.log("DataKeyId [base64]: ", key.toString("base64"));
  await keyVaultClient.close();
  await client.close();
  // end-create-dek
}
main();