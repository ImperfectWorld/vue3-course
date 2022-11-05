import { httpGet, httpPost } from '../../../libs/http';
import { formatScheduleData } from './utils';

export async function getInitialData() {
    const { schedule, course, duration, teacher } = await httpGet(
        'http://localhost:3000/initial_data'
    );

    return Promise.resolve({
        schedule: formatScheduleData(schedule),
        course,
        duration,
        teacher,
    });
}

export async function updateSchedule(data) {
    // {type, data}
    return await httpPost('http://localhost:3000/update_schedule', data);

    // return Promise.resolve(res);
}

export async function removeSchedule(id) {
    return await httpPost('http://localhost:3000/remove_schedule', { id });
    // return Promise.resolve(res);
}
