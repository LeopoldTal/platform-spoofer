const platform = 'unknown';

function spoofPlatform(platform) {
	const injectedCode = document.createTextNode(`
		console.debug('Real platform:', navigator.platform, 'Spoofing platform:', '${platform}');
		Object.defineProperty(navigator, 'platform', { value: '${platform}', configurable: true });
	`);
	const script = document.createElement('script');
	script.appendChild(injectedCode);
	document.head.appendChild(script);
}

spoofPlatform(platform);
