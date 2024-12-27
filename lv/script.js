const steps = {
    'step-1': {
        title: 'Step 1: Open the Layout Viewer',
        description: 'To open the Layout Viewer, click on the Layout Viewer icon in the toolbar.',
    },
    'step-2': {
        title: 'Step 2: Select the Layout',
        description: 'Select the layout you want to view from the list of layouts.',
    },
    'step-3': {
        title: 'Step 3: View the Layout',
        description: 'The selected layout will be displayed in the Layout Viewer.',
    },
    'step-4': {
        title: 'Step 4: Navigate the Layout',
        description: 'Use the navigation buttons to zoom in/out, move, and rotate the layout.',
    },
    'step-5': {
        title: 'Step 5: Close the Layout Viewer',
        description: 'To close the Layout Viewer, click on the close button.',
    },
    'step-6': {
        title: 'Step 6: Provide Feedback',
        description: 'If you have any feedback or suggestions, click on the feedback button to send us an email.',
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
        instructionDescription.textContent = instruction.description;
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