import { Injectable } from "@nestjs/common";
import axios from "axios";
import { DailyPeriod } from "./daily.periods.model";
import { NextHours } from "./next.hours.model";
import { MeteoDaily } from "src/meteo/meteo-daily/meteo-daily.entity";
import { MeteoHourly } from "src/meteo/meteo-hourly/meteo-hourly.entity";

@Injectable()
export class MeteoConceptService {
    private readonly meteoConceptBaseUrl = "http://api.meteo-concept.com/api";
    private readonly authToken = "168c88e5dcc9926c06a6a61424196ca7a4ada0c248401bb8046725bf37e447c9";
    private readonly apiUrl = 'http://localhost:3000'; // URL du serveur JSON

    onApplicationBootstrap() {
        this.getMeteo("17300", false, 0, 7, true).then((data) => {

            console.log("Meteo data:", JSON.stringify({
                meteoDaily: new MeteoDaily(data.meteoDaily),
                meteoHourly: new MeteoHourly(data.meteoHourly),
            }, null, 2));
        }).catch((error) => {
            console.error("Error fetching meteo data:", error);
        }
        );
    }

    async getMeteo(insee: string, world: boolean, start: number, end: number, hourly: boolean): Promise<{ meteoDaily: MeteoDaily; meteoHourly: MeteoHourly }> {
        try {
            const meteoDaily = await this.getDailyPeriods(insee, world, start, end);
            const meteoHourly = await this.getNextHours(insee, world, hourly);
            return { meteoDaily, meteoHourly };
        } catch (error) {
            throw new Error(`Failed to fetch meteo data: ${error.message}`);
        }
    }

    async getDailyPeriods(insee: string, world: boolean, start: number, end: number): Promise<MeteoDaily> {
        const resourceUrl = `${this.meteoConceptBaseUrl}/forecast/daily/periods`;
        try {
            const response = await axios.get<DailyPeriod>(resourceUrl, {
                headers: {
                    "X-AUTH-TOKEN": this.authToken,
                },
                params: {
                    insee,
                    world,
                    start,
                    end,
                },
            });
            const meteoDaily = new MeteoDaily(response.data);
            await axios.put<MeteoDaily>(`${this.apiUrl}/meteo-daily`, meteoDaily);
            return meteoDaily;
        } catch (error) {
            throw new Error(`Failed to fetch daily periods: ${error.message}`);
        }
    } 

    async getNextHours(insee: string, world: boolean, hourly: boolean): Promise<MeteoHourly> {
        const resourceUrl = `${this.meteoConceptBaseUrl}/forecast/nextHours`;
        try {
            const response = await axios.get<NextHours>(resourceUrl, {
                headers: {
                    "X-AUTH-TOKEN": this.authToken,
                },
                params: {
                    insee,
                    hourly,
                    world,
                },
            });
            const meteoHourly = new MeteoHourly(response.data);
            await axios.put<MeteoHourly>(`${this.apiUrl}/meteo-hourly`, meteoHourly);
            return meteoHourly;
        } catch (error) {
            throw new Error(`Failed to fetch next hours: ${error.message}`);
        }
    }
}