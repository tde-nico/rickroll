const DELAY_IN_MS = 30;
const VIDEO_LENGTH_IN_MS = 8000;
const MAX_Z_INDEX = 2147483647;

//const SHOULD_PLAY = Math.floor(Math.random() * 100) <= 1;
const SHOULD_PLAY = 0;

const VIDEO_NAME = "rick.mp4"; 

let isFinished = false;
let timeoutId = null;

function loadVideo() {
	const video = document.createElement("video");
	video.src = chrome.runtime.getURL(VIDEO_NAME);
	Object.assign(video.style, {
		position: "fixed",
		background: "black",
		zIndex: MAX_Z_INDEX,
		height: "100vh",
		width: "100vw",
		inset: 0,
	});
	return (video);
}

function play() {
	if (isFinished)
		return ;

	if (timeoutId != null)
		clearTimeout(timeoutId);

	timeoutId = setTimeout(() => {
		if (document.hidden)
			return ;

		const body = document.body;
		const previuosEvent = body.style.pointerEvents;
		const previousColor = body.style.backgroundColor;
		body.style.pointerEvents = "none";
		body.style.backgroundColor = "black";
		
		const video = loadVideo();
		body.appendChild(video);
		
		window.removeEventListener("mouseup", play);
		
		video.addEventListener("ended", () => {
			body.style.backgroundColor = previousColor;
			body.style.pointerEvents = previuosEvent;
			body.removeChild(video);
			isFinished = true;
		});

		video.play();
	}, DELAY_IN_MS);
}

if (SHOULD_PLAY)
	window.addEventListener("mouseup", play);
