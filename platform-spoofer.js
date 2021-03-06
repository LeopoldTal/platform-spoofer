function getTargetPlatform() {
	return browser.storage.sync.get('platform')
		.then(res => res.hasOwnProperty('platform') ? res.platform : null);
}

function spoofPlatform(platform) {
	if (platform === null) {
		console.debug('Not spoofing platform because none is set.');
		return;
	}

	const injectedCode = document.createTextNode(`
		console.debug(
			'Previous platform:', navigator.platform,
			'Spoofing platform:', '${platform}'
		);
		Object.defineProperty(navigator, 'platform', {
			value: '${platform}',
			configurable: true
		});
	`);
	const script = document.createElement('script');
	script.appendChild(injectedCode);
	document.head.appendChild(script);
	document.head.removeChild(script);
}

function main() {
	getTargetPlatform().then(spoofPlatform);

	browser.storage.onChanged.addListener(({ platform }) => {
		if (platform && platform.hasOwnProperty('newValue')) {
			spoofPlatform(platform.newValue);
		}
	});
}

main();
