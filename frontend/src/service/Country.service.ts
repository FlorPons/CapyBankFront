import { Country } from "../types/Country.types";


// Mock para desarrollo sin base de datos
export const getAllCountries = async (): Promise<Country[]> => {
    return [
        { country_id: 1, name: 'Argentina' },
        { country_id: 2, name: 'Brasil' },
        { country_id: 3, name: 'Chile' }
    ];
}
