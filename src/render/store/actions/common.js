export const loading = (store, showOrHide) => {
	store.dispatch('LOADING', showOrHide);
};

export const alert = (store, params) => {
	store.dispatch('ALERT', params);
	if (params.delay === false) {
		return;
	} else {
		setTimeout(() => {
			store.dispatch('HIDEALERT');
		}, params.delay || 2500);
	}
};

export const confirm = (store, params) => {
	store.dispatch('CONFIRM', params);
};
