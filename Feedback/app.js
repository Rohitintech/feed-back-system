document.addEventListener('DOMContentLoaded', () => {
    // Get the form element
    const feedbackForm = document.getElementById('feedbackForm');
    
    // Add event listener for form submission
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent form from refreshing the page

            // Get form values
            const name = document.getElementById('name').value;
            const studentClass = document.getElementById('class').value;
            const subject = document.getElementById('subject').value;
            const teacher = document.getElementById('teacher').value;
            const feedback = document.getElementById('feedback').value;

            // Create feedback object
            const feedbackData = {
                name,
                class: studentClass,
                subject,
                teacher,
                feedback
            };

            // Get feedbacks from localStorage or initialize an empty array
            let feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];

            // Add new feedback to the array
            feedbacks.push(feedbackData);

            // Store the updated feedbacks in localStorage
            localStorage.setItem('feedbacks', JSON.stringify(feedbacks));

            // Clear the form after submission
            feedbackForm.reset();

            alert('Feedback submitted successfully!');
        });
    }

    // Display feedback on feedback.html
    const feedbackDisplay = document.getElementById('feedbackDisplay');
    if (feedbackDisplay) {
        const feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];

        if (feedbacks.length > 0) {
            feedbacks.forEach(feedback => {
                const feedbackBlock = document.createElement('div');
                feedbackBlock.classList.add('feedback-block');
                feedbackBlock.innerHTML = `
                    <p><strong>Name:</strong> ${feedback.name}</p>
                    <p><strong>Class:</strong> ${feedback.class}</p>
                    <p><strong>Subject:</strong> ${feedback.subject}</p>
                    <p><strong>Teacher:</strong> ${feedback.teacher}</p>
                    <p><strong>Feedback:</strong> ${feedback.feedback}</p>
                    <hr>
                `;
                feedbackDisplay.appendChild(feedbackBlock);
            });
        } else {
            feedbackDisplay.innerHTML = '<p>No feedback available yet.</p>';
        }
    }
});
