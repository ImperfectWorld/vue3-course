<template>
    <tr>
        <th></th>
        <th v-for="item of weekDay" :key="item.id" class="week-title">
            {{ item.title }}
        </th>
    </tr>
</template>

<script setup>
import './styles/week-title.scss';
import weekDay from '../../data/week';
</script>

<style lang="scss" scoped></style>
