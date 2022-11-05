<template>
    <div class="schedule-table">
        <table border="1" cellpadding="0">
            <week-title></week-title>
            <tr v-for="item of duration" :key="item.begin_time">
                <duration-title :title="item.title"></duration-title>
                <td v-for="n in 7" :key="n" @click="handleTDClick(item.begin_time, n)">
                    <schedule-card
                        v-if="schedule[item.begin_time + '_' + n]"
                        :data="schedule[item.begin_time + '_' + n]"
                        @removeCard="removeCard"
                    ></schedule-card>
                </td>
            </tr>
        </table>
    </div>
</template>

<script setup>
import { h, onMounted, toRefs } from '@vue/runtime-core';
import { getInitialData, updateSchedule, removeSchedule } from './scripts/service';
import { useInitialData, useFormData } from './scripts/hooks';
import './styles/index.scss';
import WeekTitle from './WeekTitle';
import DurationTitle from './DurationTitle';
import ScheduleCard from './ScheduleCard';
import MyMessageBox from '../MyMessageBox';
import MyForm from './MyForm';
import { checkHasData } from './scripts/utils';

const [data, setInitialData, setSchedule] = useInitialData();

const [setFormData] = useFormData();

onMounted(async () => {
    setInitialData(await getInitialData());
});

const handleTDClick = (beginTime, weekDay) => {
    const scheduleData = data.schedule[`${beginTime}_${weekDay}`];
    MyMessageBox({
        title: checkHasData(scheduleData),
        btnCancelText: '取消',
        btnConfirmText: '提交',
        insert: h(MyForm, {
            scheduleData,
            weekDay,
            beginTime,
            course: data.course,
            teacher: data.teacher,
            onFormUpdate: setFormData,
        }), // h函数应用
        async confirm() {
            // TODO: something
            if (Object.keys(data.formData).length === 0) {
                setFormData({
                    begin_time: beginTime,
                    weekday: weekDay,
                    course: data.course[0].name,
                    teacher: data.teacher[0].name,
                });
            }

            const res = await updateSchedule({ data: data.formData });
            setSchedule({ ...res });
            setFormData({});
        },
    });
};

const removeCard = async data => {
    const { type } = await removeSchedule(data.id);
    setSchedule({
        type,
        result: data,
    });
};

const { schedule, course, duration, teacher } = toRefs(data);
</script>
