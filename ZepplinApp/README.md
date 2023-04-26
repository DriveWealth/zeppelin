<!-- Build -->
eas build --platform ios
npx expo export:web

<!-- Submit App -->
eas submit -p ios


<!-- Platform Preview -->
eas build --profile preview --platform ios
