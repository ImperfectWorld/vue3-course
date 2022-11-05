<template>
    <div class="schedule-card">
        <i class="icon" @click.stop="removeCard">&times;</i>
        <p>{{ weekDay }} {{ beginTime }}</p>
        <p>【{{ course }}】</p>
        <p>{{ teacher }}</p>
    </div>
</template>

<script setup>
import './styles/schedule-card.scss';
import MyMessageBox from '../MyMessageBox';
import { computed, h, toRefs } from '@vue/runtime-core';
import { weekdayToChinese, timestampToTime } from './scripts/utils';

const props = defineProps({
    data: Object,
});

const emit = defineEmits(['removeCard']);
const weekDay = computed(() => weekdayToChinese(props.data.weekday));
const beginTime = computed(() => timestampToTime(props.data.begin_time));
const { course, teacher } = toRefs(props.data);

const removeCard = () => {
    // 打开messageBox
    MyMessageBox({
        title: '删除课程安排提示',
        btnCancelText: '取消',
        btnConfirmText: '删除',
        insert: h('p', '确认删除此课程安排吗'),
        confirm() {
            // TODO: something
            emit('removeCard', props.data);
        },
    });
};
</script>

<style lang="scss" scoped></style>
