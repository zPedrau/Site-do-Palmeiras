// script.js - JavaScript para interatividade do site

// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', function() {
    
    // Configurar logo da Uniube
    setupUniubeLogo();
    
    // Destacar link ativo na navegação
    highlightActiveNavLink();
    
    // Configurar menu mobile
    setupMobileMenu();
    
    // Configurar formulário de contato
    setupContactForm();
    
    // Configurar galeria de imagens
    setupImageGallery();
    
    // Adicionar animações suaves ao scroll
    setupScrollAnimations();
    
    // Adicionar efeito de hover nas imagens
    setupImageHover();
});

// Configurar logo da Uniube com fallback
function setupUniubeLogo() {
    const logoImg = document.querySelector('.logo-uniube');
    const logoText = document.querySelector('.logo-uniube-text');
    
    if (logoImg && logoText) {
        logoImg.addEventListener('error', function() {
            this.style.display = 'none';
            logoText.style.display = 'flex';
        });
        
        logoImg.addEventListener('load', function() {
            logoText.style.display = 'none';
        });
        
        // Verificar se a imagem já falhou ao carregar
        if (!logoImg.complete || logoImg.naturalHeight === 0) {
            logoImg.style.display = 'none';
            logoText.style.display = 'flex';
        }
    }
}

// Destacar o link ativo na navegação
function highlightActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        const linkFileName = linkHref.split('/').pop();
        if (linkFileName === currentPage || (currentPage === '' && linkFileName === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Configurar menu hambúrguer
function setupMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Fechar menu ao clicar em um link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Fechar menu ao clicar fora
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target) || navToggle.contains(event.target);
            if (!isClickInsideNav && navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Configurar formulário de contato
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const mensagem = document.getElementById('mensagem').value;
        const messageDiv = document.getElementById('formMessage');
        
        // Validação básica
        if (!nome || !email || !mensagem) {
            showFormMessage('Por favor, preencha todos os campos.', 'error');
            return;
        }
        
        // Validação de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showFormMessage('Por favor, insira um email válido.', 'error');
            return;
        }
        
        // Simulação de envio
        showFormMessage('Mensagem enviada com sucesso! (Simulação)', 'success');
        contactForm.reset();
        
        // Limpar mensagem após 5 segundos
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 5000);
    });
}

// Mostrar mensagem do formulário
function showFormMessage(message, type) {
    const messageDiv = document.getElementById('formMessage');
    if (!messageDiv) return;
    
    messageDiv.textContent = message;
    messageDiv.className = 'form-message ' + type;
    messageDiv.style.display = 'block';
}

// Configurar galeria de imagens
function setupImageGallery() {
    const galleryImages = document.querySelectorAll('.gallery-img');
    
    galleryImages.forEach(img => {
        img.addEventListener('click', function() {
            // Criar modal para visualização ampliada
            createImageModal(this.src, this.alt);
        });
        
        // Adicionar cursor pointer
        img.style.cursor = 'pointer';
    });
}

// Criar modal para visualização de imagem
function createImageModal(imageSrc, imageAlt) {
    // Remover modal existente se houver
    const existingModal = document.getElementById('imageModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Criar overlay
    const overlay = document.createElement('div');
    overlay.id = 'imageModal';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        cursor: pointer;
    `;
    
    // Criar imagem ampliada
    const img = document.createElement('img');
    img.src = imageSrc;
    img.alt = imageAlt;
    img.style.cssText = `
        max-width: 90%;
        max-height: 90%;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
    `;
    
    // Fechar ao clicar no overlay
    overlay.addEventListener('click', function() {
        overlay.remove();
    });
    
    // Fechar com ESC
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            overlay.remove();
            document.removeEventListener('keydown', escHandler);
        }
    });
    
    overlay.appendChild(img);
    document.body.appendChild(overlay);
}

// Configurar animações de scroll
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observar cards
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Configurar efeito de hover nas imagens
function setupImageHover() {
    const images = document.querySelectorAll('img.content-img, .gallery-img');
    
    images.forEach(img => {
        img.addEventListener('mouseenter', function() {
            this.style.transition = 'transform 0.3s ease';
        });
    });
}

// Adicionar efeito de smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Adicionar data de última atualização no footer (opcional)
function addLastUpdate() {
    const footer = document.querySelector('.footer');
    if (footer) {
        const lastUpdate = document.createElement('div');
        lastUpdate.style.cssText = 'margin-top: 8px; font-size: 0.85em; color: #777;';
        lastUpdate.textContent = `Última atualização: ${new Date().toLocaleDateString('pt-BR')}`;
        footer.appendChild(lastUpdate);
    }
}

// Chamar função de última atualização
addLastUpdate();

