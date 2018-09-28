import * as Types from './types';
import State from '@/store/stateModule';
import FormItem from '@/components/Item';

const mutations = {
    [Types.ADD_CONTROL_ITEM](state: State) {
        const curItem = {
            id: '',
            cover: '',
            title: '',
            author: '',
            reading: '',
            art_url: '',
            createTime: new Date().getTime(),
        };
        state.controlItems.push(curItem);
    },
    [Types.DEL_CONTROL_ITEM](state: State, item: FormItem) {
        const index = state.controlItems.findIndex(
            (dataItem) => dataItem.createTime === item.createTime,
        );
        if (index >= 0) {
            state.controlItems.splice(index, 1);
            const arr = state.controlItems;
            state.controlItems = [];
            setTimeout(() => {
                state.controlItems = arr;
            }, 0);
        }
    },
    [Types.CLEAR_CONTROL_ITEM](state: State) {
        state.controlItems = [];
    },
    [Types.ADD_REPORT_ITEM](state: State, item: FormItem) {
        const index = state.formItems.findIndex(
            (dataItem) => dataItem.createTime === item.createTime,
        );
        if (index >= 0) {
            state.formItems[index] = { ...item };
            state.formItems = [...state.formItems];
        } else {
            const curItem = { ...item };
            state.formItems.unshift(curItem);
        }
    },
    [Types.DEL_REPORT_ITEM](state: State, item: FormItem) {
        const index = state.formItems.findIndex(
            (dataItem) => dataItem.createTime === item.createTime,
        );
        if (index >= 0) {
            state.formItems.splice(index, 1);
        }
    },
    [Types.CLEAR_REPORT_ITEMS](state: State) {
        state.formItems = [];
    },
};

export default mutations;
