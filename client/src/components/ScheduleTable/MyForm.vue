<template>
    <div class="my-form">
        <h1>{{ _weekDay }}{{ _beginTime }}</h1>
        <div class="select-group">
            <my-selector
                :data="course"
                text-key="name"
                :default-value="_course"
                @update="courseUpdate"
            ></my-selector>
            <my-selector
                :data="teacher"
                text-key="name"
                :default-value="_teacher"
                @update="teacherUpdate"
            ></my-selector>
        </div>
    </div>
</template>

<script setup>
import './styles/my-form.scss';
import { computed, reactive } from '@vue/runtime-core';
import { weekdayToChinese, timestampToTime } from './scripts/utils';
import MySelector from '../MySelector';
const { weekDay, beginTime, scheduleData, course, teacher } = defineProps({
    weekDay: Number,
    beginTime: Number,
    scheduleData: Object,
    course: Array,
    teacher: Array,
});

const emit = defineEmits(['formUpdate']);
const _weekDay = computed(() => weekdayToChinese(weekDay));
const _beginTime = computed(() => timestampToTime(beginTime));
const _course = scheduleData ? scheduleData.course : course[0].name;
const _teacher = scheduleData ? scheduleData.teacher : teacher[0].name;

const state = reactive({
    course: _course,
    teacher: _teacher,
});

const formEmit = () => {
    emit('formUpdate', {
        begin_time: beginTime,
        weekday: weekDay,
        course: state.course,
        teacher: state.teacher,
    });
};

const courseUpdate = course => {
    state.course = course;
    formEmit();
};
const teacherUpdate = teacher => {
    state.teacher = teacher;
    formEmit();
};
</script>
