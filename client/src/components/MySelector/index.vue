<template>
    <div class="my-selector">
        <div class="selected-value" @click="showOptionList">{{ selectedValue }}</div>
        <div class="option-list" v-if="visible">
            <a
                class="list-item"
                href="javascript:;"
                v-for="item of data"
                :key="item.id"
                @click="selectValue(item)"
            >
                {{ item[textKey] }}
            </a>
        </div>
    </div>
</template>

<script setup>
/**
:data="teacher"
text-key="name"
:default-value="_teacher"
@update="teacherUpdate"

 */
import { reactive, toRefs } from '@vue/reactivity';
import './index.scss';
const { data, textKey, defaultValue } = defineProps({
    data: Object,
    textKey: String,
    defaultValue: String,
});

const state = reactive({
    selectedValue: defaultValue || data[0][textKey],
    visible: false,
});

const emit = defineEmits(['update']);

const setVisible = isVisible => {
    state.visible = isVisible;
};

const showOptionList = () => {
    setVisible(!state.visible);
};

const selectValue = item => {
    state.selectedValue = item[textKey];
    setVisible(false);
    emit('update', state.selectedValue);
};

const { selectedValue, visible } = toRefs(state);
</script>
