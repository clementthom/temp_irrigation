import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ReadlineParser, SerialPort } from 'serialport';
import axios from 'axios';

@Injectable()
export class ArduinoService implements OnApplicationBootstrap {
    onApplicationBootstrap() {
        const serialport = new SerialPort({ path: '/dev/ttyACM0', baudRate: 9600 });
        const parser = new ReadlineParser({ delimiter: '\n' });
        serialport.pipe(parser);

        parser.on('data', async (data: string) => {
            console.log('Data received:', data);
            const trimmedData = data.slice(0, -1); // Enlever les deux derniers caractères correspondant à \n d'arduino
            try {
                // Ajouter un timestamp à l'objet mesure
                const mesure = JSON.parse(trimmedData);
                mesure.timestamp = new Date().toISOString();

                // Envoyer les données au serveur JSON
                const response = await axios.post('http://localhost:3000/mesures', mesure);
                console.log('Data pushed to server:', response.data);
            } catch (error) {
                console.error('Error pushing data to server:', error.message);
            }
        });

        serialport.write('ROBOT PLEASE RESPOND\n');
    }

    getData() {
        // Vous pouvez implémenter une méthode pour récupérer des données si nécessaire
    }
}
