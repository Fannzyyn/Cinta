document.addEventListener('DOMContentLoaded', function() {
    // Create floating hearts
    createFloatingHearts();
    
    // Handle question navigation
    setupQuestionNavigation();
    
    // Handle the "No" button that can't be clicked
    setupNoButtonTrick();
    
    // Setup WhatsApp button
    setupWhatsAppButton();
    
    // Add scroll event listener for section transitions
    window.addEventListener('scroll', revealSections);
    
    // Initial check for visible sections
    revealSections();
});

// Create floating hearts in the background
function createFloatingHearts() {
    const container = document.querySelector('.floating-hearts');
    const heartColors = ['#ff4b6a', '#ff85a1', '#ff9cbc', '#ffb6c1', '#ffc8d6'];
    
    for (let i = 0; i < 30; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '❤️';
        heart.style.position = 'absolute';
        heart.style.fontSize = `${Math.random() * 20 + 10}px`;
        heart.style.color = heartColors[Math.floor(Math.random() * heartColors.length)];
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.top = `${Math.random() * 100}%`;
        heart.style.opacity = Math.random() * 0.5 + 0.3;
        heart.style.animation = `float ${Math.random() * 6 + 4}s ease-in-out infinite`;
        heart.style.animationDelay = `${Math.random() * 5}s`;
        
        container.appendChild(heart);
    }
}

// Setup navigation between questions
function setupQuestionNavigation() {
    const nextButtons = document.querySelectorAll('.next-btn');
    const questions = document.querySelectorAll('.question');
    
    nextButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            // Check if textarea has content
            const textarea = questions[index].querySelector('textarea');
            if (textarea && textarea.value.trim() === '') {
                alert('Please answer the question before proceeding.');
                return;
            }
            
            // Hide current question
            questions[index].classList.add('hidden');
            
            // Show next question
            if (index < questions.length - 1) {
                questions[index + 1].classList.remove('hidden');
            }
        });
    });
    
    // Handle the final yes button
    const yesButton = document.querySelector('.yes-btn');
    yesButton.addEventListener('click', () => {
        document.getElementById('questions').classList.add('hidden');
        document.getElementById('final-message').classList.remove('hidden');
        
        // Scroll to final message
        document.getElementById('final-message').scrollIntoView({ behavior: 'smooth' });
        
        // Add extra hearts animation for the final message
        createExtraHeartsAnimation();
    });
}

// Make the "No" button run away from cursor
function setupNoButtonTrick() {
    const noButton = document.querySelector('.no-btn');
    
    noButton.addEventListener('mouseover', (e) => {
        // Calculate new position
        const x = Math.random() * (window.innerWidth - 100);
        const y = Math.random() * (window.innerHeight - 100);
        
        // Make sure button stays within viewport
        const safeX = Math.min(Math.max(x, 0), window.innerWidth - 100);
        const safeY = Math.min(Math.max(y, 0), window.innerHeight - 100);
        
        // Set new position
        noButton.style.position = 'fixed';
        noButton.style.left = `${safeX}px`;
        noButton.style.top = `${safeY}px`;
    });
}

// Setup WhatsApp button
function setupWhatsAppButton() {
    const whatsappBtn = document.getElementById('whatsapp-btn');
    
    whatsappBtn.addEventListener('click', () => {
        // Replace with your phone number (include country code without +)
        const phoneNumber = '6282296259955'; // Change this to your actual number
        const message = encodeURIComponent('I love you too! ❤️');
        
        // Create WhatsApp URL
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
        
        // Open WhatsApp
        window.open(whatsappUrl, '_blank');
    });
}

// Reveal sections as user scrolls
function revealSections() {
    const sections = document.querySelectorAll('section:not(.hidden)');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
}

// Create extra hearts animation for final message
function createExtraHeartsAnimation() {
    const container = document.querySelector('.message-container');
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.style.position = 'absolute';
            heart.style.fontSize = `${Math.random() * 30 + 10}px`;
            heart.style.left = `${Math.random() * 100}%`;
            heart.style.top = '100%';
            heart.style.opacity = '0';
            heart.style.transition = 'all 3s ease-out';
            
            container.appendChild(heart);
            
            setTimeout(() => {
                heart.style.top = `${Math.random() * 100}%`;
                heart.style.opacity = '0.7';
                
                setTimeout(() => {
                    heart.style.opacity = '0';
                    
                    setTimeout(() => {
                        heart.remove();
                    }, 1000);
                }, 2000);
            }, 100);
        }, i * 200);
    }
}