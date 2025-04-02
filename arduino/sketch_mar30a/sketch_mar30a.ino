#include <ArduinoJson.h> // Inclusion de la bibliothèque ArduinoJson

// Déclaration de la variable globale JsonDocument
StaticJsonDocument<200> doc;

// Variables pour gérer les intervalles
unsigned long previousMillisMeasures = 0;
unsigned long previousMillisReset = 0;
const unsigned long intervalMeasures = 5000; // Intervalle pour sendMeasures (5 secondes)
unsigned long intervalReset = 200;           // Intervalle pour manageValves (200 ms)

void setup() {
  Serial.begin(9600); // Starts the serial communication
  randomSeed(analogRead(0)); // Initialisation du générateur de nombres aléatoires
  pinMode(6, OUTPUT); // Configuration de la pin 6 comme sortie (vanne 1)
  pinMode(7, OUTPUT); // Configuration de la pin 7 comme sortie (vanne 2)
  pinMode(5, INPUT);  // Configuration de la pin 5 comme entrée (reset)
  doc["reset"] = 0;
}

// Fonction pour sérialiser et envoyer le document JSON
void send(const JsonVariant& jsonVariant) {
  String json;
  serializeJson(jsonVariant, json); // Sérialisation du document JSON en chaîne
  Serial.println(json);             // Impression de la chaîne JSON sur le moniteur série
}

void sendMeasures() {
  // Génération de valeurs aléatoires
  float temperature = random(200, 301) / 10.0; // Température entre 20.0 et 30.0
  int humidity1 = random(60, 91);              // Humidité 1 entre 60 et 90
  int humidity2 = random(60, 91);              // Humidité 2 entre 60 et 90
  int lightIntensity = random(0, 6);           // Intensité lumineuse entre 0 et 5
  
  // Stockage des mesures dans le document JSON
  doc["mesures"]["temperature"] = temperature;
  doc["mesures"]["humidity1"] = humidity1;
  doc["mesures"]["humidity2"] = humidity2;
  doc["mesures"]["lightIntensity"] = lightIntensity;

  // Appel de la fonction send pour envoyer les données
  send(doc["mesures"]);
}

void manageValves() {
  digitalWrite(6, LOW); // Désactivation de la vanne 1
  digitalWrite(7, LOW); // Désactivation de la vanne 2
}

void reset() {
  int previousIntervalReset = intervalReset;
  if (digitalRead(5) == HIGH) {
    if (doc["reset"] == 0) {
      // Appel de la fonction send pour envoyer les données
      send(doc["reset"]);
    }
    intervalReset = 10000;
  } else {
    doc["reset"] = 1;
    intervalReset = previousIntervalReset;
  }
}

void loop() {
  unsigned long currentMillis = millis();

  // Vérifie si l'intervalle pour manageValves est écoulé
  if (currentMillis - previousMillisReset >= intervalReset) {
    previousMillisReset = currentMillis;
    reset();
  }

  // Vérifie si l'intervalle pour sendMeasures est écoulé
  if (currentMillis - previousMillisMeasures >= intervalMeasures) {
    previousMillisMeasures = currentMillis;
    sendMeasures();
  }
}
