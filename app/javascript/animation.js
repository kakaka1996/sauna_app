const items = document.querySelectorAll('.fade-in-item');


const observer = new IntersectionObserver((entries, currentObserver) =>{
    entries.forEach((entry) => {
        if (!entry.isIntersecting) {
            return;
    }

    entry.target.classList.add('is-visible');
    currentObserver.unobserve(entry.target);
    });
}, {
    threshold: 0.2,
});

items.forEach((item) => {
    observer.observe(item);
});