export const LOADING = (state, showOrHide) => {
	state.loading = showOrHide;
};

export const ALERT = (state, params) => {
	state.alertConfig.show = params.show;
	state.alertConfig.msg = params.msg || '提示信息';
	state.alertConfig.type = params.type || 'info'; // info/warning/success/danger
	state.alertConfig.delay = params.delay || 2500; // info/warning/success/danger
};

export const HIDEALERT = (state, params) => {
	state.alertConfig.show = false;
};

export const CONFIRM = (state, params) => {
	state.confirmConfig.show = params.show;
	state.confirmConfig.title = params.title || '弹窗';
	state.confirmConfig.msg = params.msg || '\b';
	state.confirmConfig.apply = params.apply || function() {};
	state.confirmConfig.cancle = params.cancle || function() {};
};

export const HIDECONFIRM = (state) => {
	state.confirmConfig.show = false;
};
