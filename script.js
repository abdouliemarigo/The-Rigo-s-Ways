// Mobile Menu
const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");

hamburger.addEventListener("click", () => {
    nav.classList.toggle("active");
});

// Scroll Reveal Animation
const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
    reveals.forEach(reveal => {
        const windowHeight = window.innerHeight;
        const elementTop = reveal.getBoundingClientRect().top;
        const revealPoint = 100;

        if(elementTop < windowHeight - revealPoint){
            reveal.classList.add("active");
        }
    });
});

// Dark / Light Mode Toggle
const themeToggle = document.getElementById("themeToggle");

if(localStorage.getItem("theme") === "dark"){
    document.body.classList.add("dark");
    themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if(document.body.classList.contains("dark")){
        themeToggle.textContent = "☀️";
        localStorage.setItem("theme","dark");
    } else {
        themeToggle.textContent = "🌙";
        localStorage.setItem("theme","light");
    }
});

// About section - Read More
const canvas = document.getElementById("about-particles");
const ctx = canvas.getContext("2d");

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

window.addEventListener('resize', () => {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
});

// Particle setup
const particlesArray = [];
const numberOfParticles = 50;

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 4 + 1;
        this.speedX = (Math.random() - 0.5) * 1;
        this.speedY = (Math.random() - 0.5) * 1;
        this.color = "rgba(255, 107, 107, 0.3)";
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if(this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if(this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI*2);
        ctx.fill();
    }
}

function initParticles() {
    for(let i = 0; i < numberOfParticles; i++){
        particlesArray.push(new Particle());
    }
}

function animateParticles() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(let particle of particlesArray){
        particle.update();
        particle.draw();
    }
    requestAnimationFrame(animateParticles);
}

initParticles();
animateParticles();