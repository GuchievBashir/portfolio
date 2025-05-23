

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
    });

    const form = document.getElementById('contact-form');
    const fields = ['name', 'email', 'message'];

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        let isValid = true;

        fields.forEach(id => {
            const input = document.getElementById(id);
            const errorSpan = input.nextElementSibling;

            errorSpan.textContent = '';

            if (!input.checkValidity()) {
                isValid = false;
                if (input.validity.valueMissing) {
                    errorSpan.textContent = 'This field is required';
                } else if (input.validity.typeMismatch) {
                    errorSpan.textContent = 'Please enter a valid email';
                } else {
                    errorSpan.textContent = 'Invalid input';
                }
            }
        });

        if (isValid) {
            form.reset();
            alert('Thank you! Your message has been sent.');
        }
    });

    fields.forEach(id => {
        const input = document.getElementById(id);
        const errorSpan = input.nextElementSibling;
        input.addEventListener('input', () => {
            if (input.checkValidity()) {
                errorSpan.textContent = '';
            }
        });
    });
});
