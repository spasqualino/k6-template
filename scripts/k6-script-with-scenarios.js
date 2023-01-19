import http from 'k6/http';
import { check } from 'k6';
import { sleep } from 'k6';

export const options = {    
    scenarios: {
        my_scenario_01: {
            exec: 'scenario01Function',
            executor: 'constant-vus',
            vus: 5,
            duration: '5s'
        },
        my_scenario_02: {
            exec: 'scenario02Function',
            executor: 'ramping-vus',
            stages: [
                { duration: '10s', target: 20 },
                { duration: '5s', target: 10 },
                { duration: '5s', target: 0 },
            ],
        }
    },
};

export function setup() {
    const res = http.get(`https://${__ENV.MY_HOSTNAME}/get`);
    return { data: res.json() };
}

export function scenario01Function (data) {
    http.get(data.data.url);
    sleep(1);
}

export function scenario02Function (data) {
    const res = http.get('http://test.k6.io');
    sleep(1);
    check(res, {
        'is status 200': (r) => r.status === 200,
        'verify homepage text': (r) => r.body.includes('Collection of simple web-pages suitable for load testing'),
        'body size is 11,105 bytes': (r) => r.body.length == 11105,
    });
}