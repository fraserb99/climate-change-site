import {apiRequest, buildUrl} from '../../infrastructure/api/config';
import { CoverageSummary } from 'istanbul-lib-coverage';

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

export const getJourneys = () => {
    return apiRequest(buildUrl('journey/get.php'), {
        method: 'GET',
        mode: 'cors'
    }, true)
}

export const createJourney = (values) => {
    return apiRequest(buildUrl('journey/create.php'), {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(values)
    }, true)
}

export const deleteJourney = (values) => {
    return apiRequest(buildUrl('journey/delete.php'), {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(values)
    }, true)
}

export const getLeaderboard = () => {
    return apiRequest(buildUrl('journey/get_leaderboard.php'), {
        method: 'GET',
    }, false)
}