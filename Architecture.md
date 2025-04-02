Architecture Logicielle de la Solution
1. Arduino
Rôle : Collecte des données environnementales (température, humidité, intensité lumineuse) et contrôle des vannes.
Fonctionnalités :
Envoie périodiquement des mesures au serveur via le port série.
Reçoit des commandes du serveur pour ouvrir/fermer les vannes.
Technologies : Arduino avec la bibliothèque ArduinoJson pour sérialiser les données en JSON.
2. Serveur NestJS
Rôle : Intermédiaire entre l'Arduino et la Web App Angular. Il gère la communication série avec l'Arduino et expose une API REST pour la gestion des mesures.
Fonctionnalités :
Communication avec l'Arduino :
Utilise la bibliothèque serialport pour lire les données envoyées par l'Arduino.
Envoie les données reçues au serveur JSON via des requêtes HTTP (axios).
Envoie des commandes à l'Arduino via le port série.
API REST :
Expose des endpoints pour gérer les mesures (création, lecture, suppression).
Permet à la Web App Angular d'interagir avec les données.
Stockage des données :
Les mesures sont stockées dans un fichier JSON via json-server.
Endpoints REST :
POST /api/mesures : Ajouter une nouvelle mesure.
GET /api/mesures : Récupérer toutes les mesures.
DELETE /api/mesures/:id : Supprimer une mesure.
POST /api/mesures/clear : Supprimer toutes les mesures.
Technologies : NestJS, serialport, axios, json-server.
3. Serveur JSON
Rôle : Stockage des données des mesures.
Fonctionnalités :
Sert de base de données légère pour stocker les mesures collectées par l'Arduino.
Accessible via une API REST exposée par json-server.
Technologies : json-server, fichier db.json.
4. Web App Angular
Rôle : Interface utilisateur pour visualiser les mesures et envoyer des commandes au serveur.
Fonctionnalités :
Visualisation des données :
Affiche les mesures collectées (température, humidité, intensité lumineuse) dans un tableau.
Rafraîchit automatiquement les données toutes les 5 secondes.
Gestion des mesures :
Permet d'ajouter, modifier ou supprimer des mesures via des appels à l'API REST.
Fournit un bouton pour supprimer toutes les mesures.
Envoi de commandes :
Envoie des commandes au serveur NestJS pour contrôler les vannes de l'Arduino.
Technologies : Angular, HttpClient pour les appels API, FormsModule pour les formulaires.
Diagramme de Flux des Données
Arduino → Serveur NestJS :

L'Arduino envoie des mesures (JSON) via le port série.
Le serveur NestJS reçoit les données, les enrichit avec un timestamp, et les stocke dans le serveur JSON.
Web App Angular → Serveur NestJS :

La Web App Angular envoie des commandes (ex. suppression de mesures, contrôle des vannes) au serveur NestJS via des appels API REST.
Serveur NestJS → Arduino :

Le serveur NestJS envoie des commandes à l'Arduino via le port série (ex. ouvrir/fermer les vannes).
Serveur JSON → Web App Angular :

La Web App Angular récupère les mesures stockées dans le serveur JSON via des appels API REST.
Technologies Utilisées
Arduino : Collecte des données et contrôle des vannes.
NestJS : Serveur principal pour la communication série et l'exposition des API REST.
json-server : Stockage des données des mesures.
Angular : Interface utilisateur pour la gestion et la visualisation des mesures.