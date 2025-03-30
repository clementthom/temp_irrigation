import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { ReadlineParser, SerialPort } from 'serialport';

@Injectable()
export class ArduinoService implements OnApplicationBootstrap {
    onApplicationBootstrap() {
        const serialport = new SerialPort({ path: '/dev/ttyACM0', baudRate: 9600 });
        const parser = new ReadlineParser({ delimiter: '\n' });
        serialport.pipe(parser)
        parser.on('data', console.log)
        serialport.write('ROBOT PLEASE RESPOND\n')
    }

    getData() {

    }
}
