const input = document.getElementById('platform');

function initInput() {
	browser.storage.sync.get('platform')
		.then(res => res.hasOwnProperty('platform') ? res.platform : navigator.platform)
		.then(platform => { input.value = platform });
}

input.addEventListener('change', () => {
	browser.storage.sync.set({ platform: input.value });
});

initInput();
