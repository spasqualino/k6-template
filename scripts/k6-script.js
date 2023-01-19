import http from 'k6/http';
import { sleep } from 'k6';

// 1. init code, runs once per VU
export const options = {
    vus: 5,
    duration: '3s',
};

// 2. setup code, runs once
export function setup() {
    const res = http.get('https://httpbin.test.k6.io/get');
    return { data: res.json() };
}

// 3. VU Code, runs once per iteration
export default function (data) {
    http.get(data.data.url);
    sleep(1);
}

// 4. teardown code, runs once
export function teardown(data) {
    console.log("url: " + data.data.url);
}

// 5. handleSummary, runs onse. Creates a custom summary about the testing results
export function handleSummary(data) {
    const med_latency = data.metrics.iteration_duration.values.med;
    const latency_message = `The median latency was ${med_latency}\n`;

    return {
        stdout: latency_message,
    };
}