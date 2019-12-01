import {apiRequest} from '../../infrastructure/api/config';

const apiBase = 'http://www.fueleconomy.gov/ws/rest/';

export const getMakeOpts = (year) => {
    // apiRequest(apiBase + `vehicle/menu/make?year=${year}`, {
    //     method: 'GET',
    //     mode: 'cors'
    // }, false)
    return [
        {
            value: 'Toyota',
            label: 'Toyota'
        }
    ]
}