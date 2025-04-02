import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ReadlineParser, SerialPort } from 'serialport';
import axios from 'axios';

@Injectable()
export class ArduinoService implements OnApplicationBootstrap {
    serialport: SerialPort;
    parser: ReadlineParser;
    onApplicationBootstrap() {
        this.serialport = new SerialPort({ path: '/dev/ttyACM0', baudRate: 9600 });
        this.parser = new ReadlineParser({ delimiter: '\n' });
        this.serialport.pipe(this.parser);

        this.parser.on('data', async (data: string) => {
            console.log('Data received:', data);
            const trimmedData = data.slice(0, -1); // Enlever les deux derniers caractères correspondant à \n d'arduino
            try {
                // Ajouter un timestamp à l'objet mesure
                const data = JSON.parse(trimmedData);
                if (data.mesures) {
                    data.mesures.timestamp = new Date().valueOf();
            }
                
                // Envoyer les données au serveur JSON
                const response = await axios.post('http://localhost:3000/mesures', data.mesures);
                console.log('Data pushed to server:', response.data);
            } catch (error) {
                console.error('Error pushing data to server:', error.message);
            }
        });

        this.serialport.write('ROBOT PLEASE RESPOND\n');
    }

    getData() {
        // Vous pouvez implémenter une méthode pour récupérer des données si nécessaire
    }

    sendData(data: string) {
        // Vous pouvez implémenter une méthode pour envoyer des données à l'Arduino si nécessaire
        if (!this.serialport) {
            console.error('Serial port is not initialized');
            return;
        }
        this.serialport.write(data, (err) => {
            // Gérer les erreurs d'écriture
            if (err) {
              return console.log('Error on write: ', err.message);
            }
            console.log('message written');
        });
    }
}
