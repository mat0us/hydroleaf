const { ref, set } = require("firebase/database");
const { db } = require("../../../config/firebaseConfig.js");
const SensorData = require("../models/sensorDataModel");

// Funkce pro generaci náhodného pH
const generateRandompH = () => {
  return parseFloat((Math.random() * 14).toFixed(2)); // Generuje náhodné pH mezi 0 a 14
};

// Odeslání dat do Firebase
const sendDataToFirebase = async (data) => {
  try {
    // Vytvoření odkazu na databázi
    const dataRef = ref(db, "sensors/" + data.deviceId); // nebo jiný vhodný název

    // Uložení dat do Firebase
    await set(dataRef, data);
    console.log("Data byla úspěšně odeslána do Firebase:", data);
  } catch (error) {
    console.error("Chyba při odesílání dat do Firebase:", error);
  }
};

// Odesílání dat každou minutu (60000 ms)
const interval = 60000; // 1 minuta

// Odesílání dat každou minutu s náhodně generovaným pH
setInterval(() => {
  // Vytvoření instance SensorData s náhodným pH
  const sensorData = new SensorData(
    "ESP32-1", // deviceId
    1, // led1
    0, // led2
    1, // led3
    0, // waterPump
    generateRandompH(), // Generované náhodné pH
    15.0, // tdc
    20.0, // outsidetemp
    22.0, // watertemp
    303.0, // light
    5.0 // waterLevel
  );

  // Odeslání náhodných dat do Firebase
  sendDataToFirebase(sensorData.toJSON());
}, interval);
