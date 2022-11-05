<template>
    <schedule-table></schedule-table>
</template>

<script setup>
import { onMounted } from 'vue';
// import axios from 'axios';
import ScheduleTable from './components/ScheduleTable';
onMounted(async () => {
    // const res = await axios('http://localhost:3000/initial_data');
});
</script>
