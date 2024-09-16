document.addEventListener('DOMContentLoaded', () => {
    // Function to get a random image from the /images/sample folder
    function getRandomImage() {
        const images = [
            'sample1.webp',
            'sample2.webp',
            'sample3.webp' // Add more image filenames as needed
        ];

        const randomImage = images[Math.floor(Math.random() * images.length)];
        return randomImage;
    }

    // Display the random image
    const randomImage = getRandomImage();
    const imgElement = document.getElementById('random-image');
    imgElement.src = `images/sample/${randomImage}`;

    // Fetch and display the caption associated with the random image
    fetch(`captions/${randomImage.replace('.webp', '.html')}`)
        .then(response => response.text())
        .then(data => {
            const captionContainer = document.getElementById('caption');
            captionContainer.innerHTML = data;

            // Ensure class-based styles are applied
            const dots = captionContainer.querySelectorAll('span.highlight');
            dots.forEach(dot => {
                dot.style.color = 'orange'; // Apply styles in case CSS is not working
            });
        })
        .catch(error => {
            console.error('Error fetching the caption:', error);
        });
});

