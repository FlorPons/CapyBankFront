import { City } from "../types/City.types"

// Mock para desarrollo sin base de datos
export const getCitiesByCountry = async (country_id: number): Promise<City[]> => {
    if (country_id === 1) {
        return [
            { city_id: 1, name: 'Buenos Aires', country_id: 1 },
            { city_id: 2, name: 'Córdoba', country_id: 1 }
        ];
    } else if (country_id === 2) {
        return [
            { city_id: 3, name: 'São Paulo', country_id: 2 },
            { city_id: 4, name: 'Rio de Janeiro', country_id: 2 }
        ];
    } else if (country_id === 3) {
        return [
            { city_id: 5, name: 'Santiago', country_id: 3 },
            { city_id: 6, name: 'Valparaíso', country_id: 3 }
        ];
    } else {
        return [];
    }
}