const crypto = require("crypto");
const fs = require("fs");

function genKeyPair() {
  const keyPair = crypto.generateKeyPairSync("rsa", {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
    privateKeyEncoding: {
      type: "pkcs1",
      format: "pem",
    },
  });

  const privateKeyEnv = keyPair.privateKey.replace(/\n|\r/g, ""); // Remove newlines for multiline private key
  fs.appendFileSync(
    __dirname + "/.env",
    `\nACCESS_TOKEN_SECRET="${privateKeyEnv}"`
  );
}

genKeyPair();
