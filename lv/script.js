const steps = {
    'step-1': {
        title: 'Step 1: Add Layout Viewer Chrome extension',
        description: 'Add the Layout Viewer Chrome extension to your browser by clicking on the <strong>Add to Chrome</strong> button.',
    },
    'step-2': {
        title: 'Step 2: Layout Viewer Added',
        description: 'Refresh the page, the Layout Viewer extension has been added to your browser. You can now view layouts of your developing website.',
    },
    'step-3': {
        title: 'Step 3: Layout Viewer',
        description: 'Click on the Layout Viewer button in the browser screen to open the Layout Viewer.',
    },
    'step-4': {
        title: 'Step 4: View the Layout',
        description: 'The Layout Viewer will display the layout of the website you are developing. It has a list of devices to view the layout in.',
    },
    'step-5': {
        title: 'Step 5: Full Screen Layout Viewer',
        description: 'To view the layout in full screen, click on the full screen button.',
    },
    'step-6': {
        title: 'Step 6: Add a new tab',
        description: 'Click on <strong>+</strong> button to add a new layout tab.',
    },
    'step-7': {
        title: 'Step 7: Choose Orientation',
        description: 'Choose the orientation of the device.',
    },
}

function submitFeedback(feedback) {
    if (feedback) {
        const feedbackText = feedback.value;
        if (feedbackText && feedbackText.trim().length) {
            const email = 'layoutviewer@gmail.com';
            const subject = 'Layout Viewer Feedback!';
            const feedbackLink = document.createElement('a');
            feedbackLink.href = `mailto:${email}?subject=${subject}&body=${feedbackText}`;
            feedbackLink.click();
        }
    }
}

let slideIndex = 1;
function plusDivs(n) {
    showDivs(slideIndex += n);
}
function showInstructions(step) {
    const instruction = steps[step];
    const instructionStep = document.getElementById('step');
    const instructionDescription = document.getElementById('description');
    if (instruction && instructionStep && instructionDescription) {
        instructionStep.textContent = instruction.title;
        instructionDescription.innerHTML = instruction.description;
    }
}
function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("mySlides");
    if (n > x.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = x.length }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[slideIndex - 1].style.display = "block";
    showInstructions(`step-${slideIndex}`);
}
document.addEventListener('DOMContentLoaded', function () {
    const feedback = document.getElementById('feedback');
    const feedbackBtn = document.getElementById('feedback-btn');
    feedbackBtn.addEventListener('click', function() {
        submitFeedback(feedback);
    });

    showDivs(1);
});