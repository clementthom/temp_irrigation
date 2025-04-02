Infrastructure Matérielle / Réseau
1. Matériel
Arduino Uno :
Capteurs connectés : température, humidité, intensité lumineuse.
Connecté au Raspberry Pi via un port USB (communication série).
Raspberry Pi :
Héberge le serveur NestJS et le serveur JSON.
Connecté au réseau local via Ethernet ou Wi-Fi.
Configuration des ports :
Port 80 : Serveur NestJS en production (héberge également la Web App Angular).
Port 3000 : Serveur JSON pour le stockage des données des mesures.
2. Réseau
Production :
Les utilisateurs accèdent à la Web App Angular via l'URL du Raspberry Pi (ex. http://raspberry.local ou son adresse IP).
La Web App Angular interagit avec le serveur NestJS (port 80) pour envoyer des commandes et récupérer les mesures.
Le serveur NestJS communique avec le serveur JSON (port 3000) pour stocker et lire les données.
Développement :
Le serveur NestJS est accessible sur le port 3001.
La Web App Angular est accessible sur le port 4200.
Un proxy Angular est configuré pour rediriger les requêtes API de la Web App (port 4200) vers le serveur NestJS (port 3001).
Configuration du Proxy Angular
Le fichier proxy.conf.json est utilisé pour configurer le proxy en développement. Voici son contenu :

Explications :
/api : Toutes les requêtes commençant par /api (ex. /api/mesures) seront redirigées.
target : L'URL cible est http://localhost:3001, où le serveur NestJS est accessible en développement.
secure : Désactivé pour permettre les connexions non sécurisées (HTTP).
changeOrigin : Permet de modifier l'origine des requêtes pour correspondre à celle du serveur cible.
logLevel : Défini sur debug pour afficher les détails des requêtes proxy dans la console.
Commandes pour le Développement
Démarrer le serveur JSON :

Le serveur JSON sera accessible sur http://localhost:3000.
Démarrer le serveur NestJS :

Le serveur NestJS sera accessible sur http://localhost:3001.
Démarrer la Web App Angular :

La Web App sera accessible sur http://localhost:4200.
Résumé des Ports
Composant	Port (Production)	Port (Développement)
Serveur NestJS	80	3001
Serveur JSON	3000	3000
Web App Angular	Hébergée par NestJS	4200
Conseils pour le Développement
Système d'exploitation : Développez sur Linux ou WSL (Windows Subsystem for Linux) pour une meilleure compatibilité avec les outils comme serialport et les dépendances liées au Raspberry Pi.
Proxy Angular : Assurez-vous que le fichier proxy.conf.json est correctement configuré pour rediriger les requêtes API vers le serveur NestJS en développement.