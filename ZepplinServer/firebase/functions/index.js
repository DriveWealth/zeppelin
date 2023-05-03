// Firebase Imports
const functions = require("firebase-functions");
const admin = require("firebase-admin");
// const { defineSecret } = require("firebase-functions/params");
const { getAuth } = require("firebase-admin/auth");
const { applicationDefault } = require("firebase-admin/app");

// Other libraries
const cors = require("cors");
const axios = require("axios");

// DW Libraries
const Drivewealth = require("./drivewealth");

// Load app properties
const dwClientID = process.env.DW_CLIENT_ID;
const boAPIUrl = process.env.DW_API_URL;

// Optionally use Firebase Secret Manager (paid service)

// Define the secrets so that they get populated at runtime
// const dwClientSecret = defineSecret("DW_CLIENT_SECRET");
// const dwAppKey = defineSecret("DW_APP_KEY");

// For Local just get it from env
const dwClientSecret = process.env.DW_CLIENT_SECRET;
const dwAppKey = process.env.DW_APP_KEY;

admin.initializeApp({
  credential: applicationDefault(),
});

// A handler for the CORS Middleware
const corsHandler = cors({ origin: true });

// A middleware that does the following
// Will add uid to the request if the user is a valid app user.
// Will add DW userID to the request if the user exists in DW.
const userMiddleware = async (request) => {
  if (!request.headers["id-token"]) throw new Error("No id token in request.");

  // const { accessToken } = await client.getToken();
  const decodedToken = await getAuth().verifyIdToken(
    request.headers["id-token"]
  );

  const { uid } = decodedToken;
  request.uid = uid;
  const user = await admin.firestore().collection("users").doc(uid).get();
  if (user.exists) {
    request.dwUserId = user.data().dwUserId;
  }
};

/**
 * In the case of creating a user in DH we have to associate
 * that user to an app user.
 **/

const associateUser = async (uid, data) => {
  functions.logger.info("Associating user to dwuser", uid, data.id);
  await admin.firestore().collection("users").doc(uid).set({ dwUserId: data.id });
};

const associateAccount = async (uid, dwUserId, data) => {
  functions.logger.info(
    "Associating dwuser to dwaccount",
    uid,
    dwUserId,
    data.id
  );

  await admin
    .firestore()
    .collection("users")
    .doc(uid)
    .collection("accounts")
    .doc(data.id)
    .set({ dwUserId });
};

const proxyHandler = ({dwConfig, request, response}) => async () => {
  // DW Client
  const client = Drivewealth(dwConfig);

  try {
    // The user middleware looks up the user and adds DWUserID if needed
    // If not authenticated, it will reject
    await userMiddleware(request);

    // Get the access token for this call.
    const { accessToken } = await client.getToken();

    functions.logger.info(`Authorized! ${request.uid}`, { structuredData: true });

    const newPath = request.path.replace("USER_ID", request.dwUserId);

    functions.logger.info(newPath)

    // console.log(dwConfig)
    const newUrl = `${dwConfig.boAPIUrl}${newPath}`;

    // The config for axios. This is going to call DW APIs for us and
    // act as a proxy
    const config = {
      method: request.method,
      url: newUrl,
      data: request.method === "GET" ? undefined : request.body,
      params: request.query,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        "dw-client-app-key": dwAppKey,
        "dw-customer-user-id": request.dwUserId,
      },
    };
    
    functions.logger.debug(newUrl, "<<<< Proxy URL");
    // Fire off the request
    const resp = await axios(config);

    // Special case when a user got created in DH (POST /users)
    // We have to associate that user to to the app user.
    // DW UserID -> App UID
    if (
      request.path.startsWith("/back-office/users") &&
      request.method.toLowerCase() === "post"
    ) {
      await associateUser(request.uid, resp.data);
    }
    if (
      request.path.startsWith("/back-office/accounts") &&
      request.method.toLowerCase() === "post"
    ) {
      await associateAccount(request.uid, request.dwUserId, resp.data);
    }

    // Respond with the data returned by DW
    response.status(resp.status).json(resp.data);
  } catch (e) {
    if (e.response && e.response.status) {
      return response.status(e.response.status).send({...e.response.data, source: 'Drivewealth API'});
    }
    response.status(401).send("Unauthrorized");
  }
};

// The primary function that proxies all requests from the App to DW
exports.proxy = functions
  // .runWith({ secrets: [dwClientSecret, dwAppKey], timeoutSeconds: 300 })
  .https.onRequest(async (request, response) => {
    const dwConfig = {
      boAPIUrl,
      dwClientID,
      // dwSecret: dwClientSecret.value(),
      // dwAppKey: dwAppKey.value(),
      dwSecret: dwClientSecret,
      dwAppKey: dwAppKey,
      logger: functions.logger,
    }

    corsHandler(request, response, proxyHandler({
      dwConfig,
      request,
      response
    }));
  });
