// export GOOGLE_APPLICATION_CREDENTIALS="/Users/anaidu/certs/drivewealth-a7e9a-firebase-adminsdk-s937k-cdbbab4bcc.json"

const admin = require("./functions/node_modules/firebase-admin");

admin.initializeApp({});

// admin.auth()
//   .setCustomUserClaims('baUBV0b4NlNCq3x9fWsnEseSTS93', { dwUserId: '56df9bda-4f6b-4f1e-b499-3c054d917fc5' })
//   .then(() => {
//     console.log('Claims set!')
//   });

(async function () {
  const user = await admin.firestore().collection('users').doc('baUBV0b4NlNCq3x9fWsnEseSTS93').get()
  console.log(user.data())
})();

// admin.auth().getUserByEmail('rachnanaidu@yahoo.com').then(console.log)

// admin.firestore().collection('users').add({
//   id: 'VYjpzebPEyaYC0OyXuEYLoj4waH2',
//   dwUserId: 'd108f9a2-83c5-4561-830c-cc0ea990e74e',
// })

// admin.firestore().collection('users').doc('VYjpzebPEyaYC0OyXuEYLoj4waH2').set({dwUserId: 'd108f9a2-83c5-4561-830c-cc0ea990e74e',})


// admin.firestore().collection('users').doc(uid).get()