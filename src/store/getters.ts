import State from '@/store/stateModule';

const getters = {
    formItems: (state: State) => state.formItems,
    controlItems: (state: State) => state.controlItems,
};

export default getters;
