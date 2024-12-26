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

document.addEventListener('DOMContentLoaded', function() {
    const feedback = document.getElementById('feedback');
    const feedbackBtn = document.getElementById('feedback-btn');
    feedbackBtn.addEventListener('click', function() {
        submitFeedback(feedback);
    });
});