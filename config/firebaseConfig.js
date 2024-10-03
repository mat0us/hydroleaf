"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.auth = void 0;
var app_1 = require("firebase/app");
var auth_1 = require("firebase/auth");
var database_1 = require("firebase/database");
var firebaseConfig = {
    apiKey: "AIzaSyBcowRCZPE4oTfox2Be5EhT9or2wwvNEeI",
    authDomain: "hydroleaf-1105.firebaseapp.com",
    databaseURL: "https://hydroleaf-1105-default-rtdb.firebaseio.com",
    projectId: "hydroleaf-1105",
    storageBucket: "hydroleaf-1105.appspot.com",
    messagingSenderId: "397504893555",
    appId: "1:397504893555:web:c311fe869dcea8eb7a1006",
    measurementId: "G-LD251K7ZMB"
};
var app = (0, app_1.initializeApp)(firebaseConfig);
exports.auth = (0, auth_1.getAuth)(app);
exports.db = (0, database_1.getDatabase)(app);
