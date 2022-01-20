// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'juegos-pokemon',
    appId: '1:937542495158:web:4f1344c16d86aca604af17',
    storageBucket: 'juegos-pokemon.appspot.com',
    locationId: 'europe-west',
    apiKey: 'AIzaSyAiPGkDuen87YG-KR6kN0TG-yiGNEa-co8',
    authDomain: 'juegos-pokemon.firebaseapp.com',
    messagingSenderId: '937542495158',
  },
  production: false,
   firebaseConfig:  {
    apiKey: "AIzaSyAiPGkDuen87YG-KR6kN0TG-yiGNEa-co8",
    authDomain: "juegos-pokemon.firebaseapp.com",
    projectId: "juegos-pokemon",
    storageBucket: "juegos-pokemon.appspot.com",
    messagingSenderId: "937542495158",
    appId: "1:937542495158:web:4f1344c16d86aca604af17"
  }

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
