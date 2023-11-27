let lowerBarAnimationTime = 300;
let lowerBarDelta = 100 / lowerBarAnimationTime;
let verticalBarAnimationTime = 300;
let verticalBarDelta = 100 / verticalBarAnimationTime;
let upperBarAnimationTime = 300;
let upperBarDelta = 100 / upperBarAnimationTime;

let sequenceGray = [
    {
        divLeftId: "lower-bar-left-progress-gray",
        divRightId: "lower-bar-right-progress-gray",
        animationTime: lowerBarAnimationTime,
        delta: lowerBarDelta,
        affectedDimension: "width",
    },
    {
        divLeftId: "vertical-bar-left-progress-gray",
        divRightId: "vertical-bar-right-progress-gray",
        animationTime: verticalBarAnimationTime,
        delta: verticalBarDelta,
        affectedDimension: "height",
    },
    {
        divLeftId: "upper-bar-left-progress-gray",
        divRightId: "upper-bar-right-progress-gray",
        animationTime: upperBarAnimationTime,
        delta: upperBarDelta,
        affectedDimension: "width",
    },
];

let sequenceGreen = [
    {
        divLeftId: "lower-bar-left-progress-green",
        divRightId: "lower-bar-right-progress-green",
        animationTime: lowerBarAnimationTime,
        delta: lowerBarDelta,
        affectedDimension: "width",
    },
    {
        divLeftId: "vertical-bar-left-progress-green",
        divRightId: "vertical-bar-right-progress-green",
        animationTime: verticalBarAnimationTime,
        delta: verticalBarDelta,
        affectedDimension: "height",
    },
    {
        divLeftId: "upper-bar-left-progress-green",
        divRightId: "upper-bar-right-progress-green",
        animationTime: upperBarAnimationTime,
        delta: upperBarDelta,
        affectedDimension: "width",
    },
];

window.onload = function () {
    getDiv(sequenceGray);
    getDiv(sequenceGreen);
    document.getElementById("start-button").onclick = function () {
        reset(sequenceGray);
        reset(sequenceGreen);
        animateBar(sequenceGray, 0, document.timeline.currentTime);
        setTimeout(function(){
            animateBar(sequenceGreen, 0, document.timeline.currentTime);
        }, 200);
    };
}

function getDiv(sequence) {
    for (let i = 0; i < sequence.length; i++) {
        sequence[i].divLeft = document.getElementById(sequence[i].divLeftId);
        sequence[i].divRight = document.getElementById(sequence[i].divRightId);
    }
};

function animateBar(sequence, index, startedTime) {
    if (index >= sequence.length) {
        return;
    }
    let dataObject = sequence[index];
    let elapsed = document.timeline.currentTime - startedTime;
    if (elapsed >= dataObject.animationTime) {
        dataObject.divLeft.style[dataObject.affectedDimension] = "100%";
        dataObject.divRight.style[dataObject.affectedDimension] = "100%";
        index++;
        animateBar(sequence, index, document.timeline.currentTime);
        return;
    }
    let progress = elapsed * dataObject.delta;
    dataObject.divLeft.style[dataObject.affectedDimension] = progress + "%";
    dataObject.divRight.style[dataObject.affectedDimension] = progress + "%";
    requestAnimationFrame(function () {
        animateBar(sequence, index, startedTime);
    });
}

function reset(sequence) {
    for(let i = 0; i < sequence.length; i++) {
        let dataObject = sequence[i];
        dataObject.divLeft.style[dataObject.affectedDimension] = "0%";
        dataObject.divRight.style[dataObject.affectedDimension] = "0%";
    }
};