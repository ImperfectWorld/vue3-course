import { reactive } from 'vue';

const data = reactive({
    schedule: [],
    course: [],
    duration: [],
    teacher: [],
    formData: [],
});

export function useInitialData() {
    function setInitialData({ schedule, course, duration, teacher }) {
        data.schedule = schedule;
        data.course = course;
        data.duration = duration;
        data.teacher = teacher;
    }

    function setSchedule({ type, result }) {
        const { course, teacher, begin_time, weekday } = result;
        const mark = `${begin_time}_${weekday}`;
        const target = data.schedule[mark];

        switch (type) {
            case 'EDIT':
                target.course = course;
                target.teacher = teacher;
                break;
            case 'ADD':
                data.schedule[mark] = result;
                break;
            case 'REMOVE':
                delete data.schedule[mark];
                break;

            default:
                break;
        }
    }

    return [data, setInitialData, setSchedule];
}

export function useFormData() {
    function setFormData(item) {
        data.formData = item;
    }

    return [setFormData];
}
