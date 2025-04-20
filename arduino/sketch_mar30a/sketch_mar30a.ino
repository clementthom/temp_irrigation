#include <ArduinoJson.h> // Inclusion de la bibliothèque ArduinoJson

// Déclaration de la variable globale JsonDocument
StaticJsonDocument<255> measures;
StaticJsonDocument<255> command;

// Variables pour gérer les intervalles
unsigned long previousMillisMeasures = 0;
unsigned long previousMillisReset = 0;
const unsigned long intervalMeasures = 5000; // Intervalle pour sendMeasures (5 secondes)
unsigned long debounceReset = 200;           // Intervalle pour check du bouton reset (200 ms)

const byte DATA_FROM_NEST_MAX_SIZE = 255;
char data[DATA_FROM_NEST_MAX_SIZE];   // an array to store the received data
String readString;

void setup() {
  Serial.begin(9600); // Starts the serial communication
  randomSeed(analogRead(0)); // Initialisation du générateur de nombres aléatoires
  pinMode(6, OUTPUT); // Configuration de la pin 6 comme sortie (vanne 1)
  pinMode(7, OUTPUT); // Configuration de la pin 7 comme sortie (vanne 2)
  pinMode(5, INPUT);  // Configuration de la pin 5 comme entrée (reset) 
  command["reset"] = 0;
  delay(2000); // Attendre 2 secondes pour que tout soit prêt
  receiveCommandFromNest();
}

// Fonction pour sérialiser et envoyer le document JSON
void send(const JsonVariant& jsonVariant) {
  String json;
  serializeJson(jsonVariant, json); // Sérialisation du document JSON en chaîne
  Serial.println(json);             // Impression de la chaîne JSON sur le moniteur série
}

void sendMeasures() { // Envoi les mesures au Nest toutes les intervalMeasures.
  // Génération de valeurs aléatoires
  float temperature = random(200, 301) / 10.0; // Température entre 20.0 et 30.0
  int humidity1 = random(60, 91);              // Humidité 1 entre 60 et 90
  int humidity2 = random(60, 91);              // Humidité 2 entre 60 et 90
  int lightIntensity = random(0, 6);           // Intensité lumineuse entre 0 et 5
  
  // Stockage des mesures dans le document JSON
  measures["mesures"]["temperature"] = temperature;
  measures["mesures"]["humidity1"] = humidity1;
  measures["mesures"]["humidity2"] = humidity2;
  measures["mesures"]["lightIntensity"] = lightIntensity;

  // Appel de la fonction send pour envoyer les données
  send(measures);
}

void reset() { // Envoi une demande de reset des valeurs au Nest si appui de digital(5).
  int previousIntervalReset = debounceReset;
 
 }

void loop() {
  unsigned long currentMillis = millis();
  if (!(digitalRead(5) == LOW) && command["reset"] == 0) {
    command["reset"] = 1;
    previousMillisReset = currentMillis;
    send(command);
  }

  // Vérifie si l'intervalle pour manageRest est écoulé
  if (currentMillis - previousMillisReset >= debounceReset) {
    command["reset"] = 0;
  }

  // Vérifie si l'intervalle pour sendMeasures est écoulé
  if (currentMillis - previousMillisMeasures >= intervalMeasures) {
    previousMillisMeasures = currentMillis;
    sendMeasures();
  }

  receiveCommandFromNest();
}

void receiveCommandFromNest() {
  static char endMarker = '\n'; // Séparateur de message
  char receivedChar;            // Caractère lu depuis le port série
  int ndx = 0;                  // Index actuel du buffer de données

  // Nettoyer le buffer de données
  memset(data, 0, sizeof(data));

  // Lire les données disponibles sur le port série
  while (Serial.available() > 0) {
    receivedChar = Serial.read();

    // Vérifier si le caractère reçu est le séparateur de fin
    if (receivedChar == endMarker) {
      data[ndx] = '\0'; // Terminer le message courant
      Serial.print("{\"Message reçu : ");
      Serial.print(data);
      Serial.println("\"}");
      // Désérialiser les données JSON
      DeserializationError error = deserializeJson(command, data);
      if (error) {
        Serial.print("Erreur de désérialisation : ");
        Serial.println(error.c_str());
      } else {
        manageCommandFromNest(); // Gérer la commande reçue
      }
      return;
    }

    // Ajouter le caractère au buffer si la taille maximale n'est pas atteinte
    if (ndx < DATA_FROM_NEST_MAX_SIZE - 1) {
      data[ndx] = receivedChar;
      ndx++;
      delay(2); // Petit délai pour s'assurer que toutes les données sont reçues
    } else {
      // Si la taille maximale est atteinte, afficher une erreur
      Serial.println("Erreur : message trop long, ignoré.");
      memset(data, 0, sizeof(data)); // Réinitialiser le buffer
      return;
    }
  }
}

void manageCommandFromNest() {
  if (command["vanne"]) {
    JsonObject vanneObject = command["vanne"].as<JsonObject>();
    for (JsonPair kv : vanneObject) {
      const char* vanneNumber = kv.key().c_str();
      const char* action = kv.value().as<const char*>();

      Serial.print("Commande pour la vanne ");
      Serial.print(vanneNumber);
      Serial.print(": ");
      Serial.println(action);

      if (strcmp(action, "open") == 0) {
        if (strcmp(vanneNumber, "1") == 0) {
          flash(6, 1);
        } else if (strcmp(vanneNumber, "2") == 0) {
          flash(6, 2); // Activation de la vanne 2
        } else {
          Serial.println("Vanne non trouvée.");
        }
      } else if (strcmp(action, "close") == 0) {
        if (strcmp(vanneNumber, "1") == 0) {
          flash(6, 3); // Désactivation de la vanne 1
        } else if (strcmp(vanneNumber, "2") == 0) {
          flash(6, 4); // Désactivation de la vanne 2
        } else {
          Serial.println("Vanne non trouvée.");
        }
      } else {
        Serial.println("Action inconnue pour la vanne.");
      }
    }
  } else {
    Serial.println("Aucune commande de vanne reçue.");
  }
}

void flash(int pin, int nb) {
  for (int i = 0; i < nb; i++) {
    digitalWrite(pin, HIGH); // Activation de la vanne 1.
    delay(100);
    digitalWrite(pin, LOW); // Activation de la vanne 1.
    delay(100);
  }
}
