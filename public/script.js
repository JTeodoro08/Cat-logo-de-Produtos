document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        targetElement.scrollIntoView({ behavior: 'smooth' });
    });
});

// Feedback ao enviar formulário
document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Obrigado por entrar em contato! Retornaremos em breve.');
});