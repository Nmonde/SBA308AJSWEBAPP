
const btn = document.getElementById("welcomeButton")
console.log(btn)
btn.addEventListener("click", function() {
    const newWindow = window.open("newPg.html", "_blank");
    if (newWindow) {
        newWindow.moveTo((window.screen.width-newWindow.outerWidth)/2,
        (window.screen.height-newWindow.outerHeight)/2);
    }
});

//cursor gif
const gifContainer = document.querySelector('.gif-container');
const gifImage = gifContainer.querySelector('img');

gifContainer.addEventListener('mouseenter', () => {
    gifImage.style.display = 'block';
});

gifContainer.addEventListener('mouseleave', () => {
    gifImage.style.display = 'none';
});
