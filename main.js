document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Menú Móvil
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Cambiar icono
            const icon = mobileMenuBtn.querySelector('i');
            if(navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // 2. Sistema de Filtrado de Recetas
    const filterBtns = document.querySelectorAll('.filter-btn');
    const recipeCards = document.querySelectorAll('.recipe-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remover clase active de todos los botones
            filterBtns.forEach(b => b.classList.remove('active'));
            // Añadir al botón clickeado
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            recipeCards.forEach(card => {
                // Reiniciar animación
                card.classList.remove('animate');
                void card.offsetWidth; // Trigger reflow para reiniciar CSS animation

                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.classList.remove('hide');
                    card.classList.add('animate');
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });

    // 3. Manejo del Formulario y Notificación Toast
    const form = document.getElementById('newsletterForm');
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Evitar recarga de página
            
            // Simular envío
            const emailInput = form.querySelector('input');
            const email = emailInput.value;
            
            if (toast && toastMsg) {
                showToast(`¡Gracias! ${email} ha sido suscrito.`);
            }
            emailInput.value = ''; // Limpiar campo
        });
    }

    function showToast(message) {
        toastMsg.textContent = message;
        toast.classList.add('show');

        // Ocultar después de 3 segundos
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    // 4. Scroll Suave para enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Cerrar menú móvil si está abierto
            navLinks.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});