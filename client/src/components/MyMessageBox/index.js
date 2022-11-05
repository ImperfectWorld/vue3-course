// 动态创建应用

import { createApp, watch } from 'vue';
import MyMessageBoxComponent from './MyMessageBox';

function MyMessageBox(options) {
    const messageBoxApp = createApp(MyMessageBoxComponent, options);

    showMyMessageBox(messageBoxApp, {
        confirm: options.confirm,
        cancel: options.cancel,
    });
}

function showMyMessageBox(app, options) {
    const { confirm, cancel } = options;
    const oFragment = document.createDocumentFragment();
    const vm = app.mount(oFragment);
    document.body.appendChild(oFragment);
    vm.setVisible(true);

    watch(vm.state, state => {
        if (!state.visible) {
            switch (state.type) {
                case 'CONFIRM':
                    typeof confirm === 'function' && confirm();
                    break;
                case 'CANCEL':
                    typeof cancel === 'function' && cancel();
                    break;

                default:
                    break;
            }
        }

        hideMessageBox(app);
    });
}

function hideMessageBox(app) {
    app.unmount();
}

export default MyMessageBox;
