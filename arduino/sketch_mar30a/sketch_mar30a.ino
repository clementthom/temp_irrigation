void setup() {
  Serial.begin(9600); // Starts the serial communication
  randomSeed(analogRead(0)); // Initialisation du générateur de nombres aléatoires

}
void loop() {
  // Génération de valeurs aléatoires
  float temperature = random(200, 301) / 10.0; // Température entre 20.0 et 30.0
  int humidity1 = random(60, 91);              // Humidité 1 entre 60 et 90
  int humidity2 = random(60, 91);              // Humidité 2 entre 60 et 90
  int lightIntensity = random(0, 6);           // Intensité lumineuse entre 0 et 5

  // Création de la chaîne JSON
  String json = "{\"temperature\": " + String(temperature, 1) +
                ", \"humidity1\": " + String(humidity1) +
                ", \"humidity2\": " + String(humidity2) +
                ", \"lightIntensity\": " + String(lightIntensity) + "}";

  // Impression de la chaîne JSON sur le moniteur série
  Serial.println(json);
  delay(5000);
}
