// Importar componentes dinamicamente
let ThemeManager, TypeWriter, ScrollManager;

// Carregar componentes
async function loadComponents() {
    try {
        // Importar módulos
        const modules = await Promise.all([
            import('./components/ThemeManager.js'),
            import('./components/TypeWriter.js'),
            import('./components/ScrollManager.js')
        ]);
        
        // Extrair classes
        ThemeManager = modules[0].ThemeManager;
        TypeWriter = modules[1].TypeWriter;
        ScrollManager = modules[2].ScrollManager;
        
        return true;
    } catch (error) {
        console.error('Erro ao carregar componentes:', error);
        return false;
    }
}

// Classe principal da aplicação
class PortfolioApp {
    constructor() {
        this.components = {};
        this.init();
    }

    async init() {
        try {
            // Carregar componentes primeiro
            const loaded = await loadComponents();
            if (!loaded) {
                console.warn('Alguns componentes não foram carregados, continuando...');
            }
            
            // Inicializar componentes se carregados
            if (ThemeManager) this.components.theme = new ThemeManager();
            if (ScrollManager) this.components.scroll = new ScrollManager();
            
            // Inicializar funcionalidades básicas
            this.initCore();
            this.setupEventListeners();
            this.startAnimations();
            
        } catch (error) {
            console.error('Erro na inicialização:', error);
        }
    }

    initCore() {
        // Configuração básica
        this.setupYear();
        this.setupBackToTop();
        this.setupForm();
        this.setupProjectCards();
        
        // Typewriter effect (não precisa de import)
        this.initTypeWriter();
    }

    initTypeWriter() {
        const typedElement = document.querySelector('.typed-text');
        if (!typedElement) return;

        // Implementação simples do typewriter
        const words = [
            'Desenvolvedor Front-end',
            'Criativo',
            'Apaixonado por UI/UX',
            'Resolvedor de Problemas',
            'Inovador'
        ];
        
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let speed = 100;

        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typedElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                speed = 50;
            } else {
                typedElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                speed = 100;
            }

            if (!isDeleting && charIndex === currentWord.length) {
                speed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                speed = 500;
            }

            setTimeout(type, speed);
        }

        // Iniciar após 1 segundo
        setTimeout(type, 1000);
    }

    setupEventListeners() {
        // Mobile menu
        this.setupMobileMenu();
        
        // Window resize
        window.addEventListener('resize', () => {
            this.handleResize();
        });
        
        // Preloader
        this.handlePreloader();
    }

    setupMobileMenu() {
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        
        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', (e) => {
                e.stopPropagation();
                mobileMenu.classList.toggle('hidden');
                
                // Trocar ícone
                const icon = mobileMenuButton.querySelector('i');
                if (mobileMenu.classList.contains('hidden')) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                } else {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                }
            });
            
            // Fechar ao clicar fora
            document.addEventListener('click', (e) => {
                if (!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
                    mobileMenu.classList.add('hidden');
                    const icon = mobileMenuButton.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
            
            // Fechar ao clicar em links
            mobileMenu.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                    const icon = mobileMenuButton.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                });
            });
        }
    }

    setupProjectCards() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                const video = card.querySelector('video');
                if (video) {
                    video.play();
                }
            });
        });
    }

    setupForm() {
        const form = document.getElementById('contatoFormWhatsapp');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            if (!this.validateForm(name, email, message)) return;
            
            this.sendToWhatsApp(name, email, message);
        });
    }

    validateForm(name, email, message) {
        if (!name || !email || !message) {
            this.showNotification('Por favor, preencha todos os campos.', 'error');
            return false;
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            this.showNotification('Por favor, insira um email válido.', 'error');
            return false;
        }
        
        return true;
    }

    sendToWhatsApp(name, email, message) {
        const phoneNumber = '5571989211292';
        const text = `*Nova mensagem do portfólio!*%0A%0A*Nome:* ${name}%0A*Email:* ${email}%0A%0A*Mensagem:*%0A${message}`;
        const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
        
        window.open(url, '_blank');
        this.showNotification('Mensagem pronta para envio no WhatsApp!', 'success');
        document.getElementById('contatoFormWhatsapp').reset();
    }

    showNotification(message, type = 'info') {
        // Criar container se não existir
        let container = document.getElementById('notification-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'notification-container';
            container.className = 'fixed top-4 right-4 z-[1000] space-y-2';
            document.body.appendChild(container);
        }
        
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
            <button class="close-notification">&times;</button>
        `;
        
        container.appendChild(notification);
        
        // Auto-remover após 5 segundos
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
        
        // Botão de fechar
        notification.querySelector('.close-notification').addEventListener('click', () => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        });
    }

    setupYear() {
        const yearElement = document.getElementById('currentYear');
        if (yearElement) {
            yearElement.textContent = new Date().getFullYear();
        }
    }

    setupBackToTop() {
        // Criar botão se não existir
        if (!document.getElementById('backToTop')) {
            const backToTop = document.createElement('button');
            backToTop.id = 'backToTop';
            backToTop.className = 'back-to-top';
            backToTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
            backToTop.setAttribute('aria-label', 'Voltar ao topo');
            document.body.appendChild(backToTop);
            
            // Evento de scroll
            window.addEventListener('scroll', () => {
                if (window.scrollY > 500) {
                    backToTop.classList.add('visible');
                } else {
                    backToTop.classList.remove('visible');
                }
            });
            
            // Evento de clique
            backToTop.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    handlePreloader() {
        const preloader = document.getElementById('preloader');
        if (preloader) {
            // Esconder quando a página carregar
            window.addEventListener('load', () => {
                setTimeout(() => {
                    preloader.style.opacity = '0';
                    setTimeout(() => {
                        preloader.style.display = 'none';
                    }, 500);
                }, 1000);
            });
            
            // Fallback
            setTimeout(() => {
                if (preloader.style.display !== 'none') {
                    preloader.style.opacity = '0';
                    setTimeout(() => {
                        preloader.style.display = 'none';
                    }, 500);
                }
            }, 3000);
        }
    }

    startAnimations() {
        // Observer para animações de scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    if (entry.target.classList.contains('fade-in-on-scroll')) {
                        entry.target.classList.add('fade-in-up');
                    }
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '-50px'
        });
        
        // Observar todas as seções
        document.querySelectorAll('section').forEach(section => {
            section.classList.add('scroll-trigger');
            observer.observe(section);
        });
        
        // Animar elementos com delay
        document.querySelectorAll('.stagger-item').forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('animated');
            }, index * 100);
        });
    }

    handleResize() {
        // Fechar menu mobile em telas maiores
        if (window.innerWidth >= 768) {
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
                const mobileButton = document.getElementById('mobile-menu-button');
                if (mobileButton) {
                    const icon = mobileButton.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        }
    }
}

// Inicializar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    const app = new PortfolioApp();
    
    // Adicionar classe loaded após carregamento
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
    
    // Scroll suave para âncoras
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                const header = document.querySelector('header');
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Exportar para uso global (opcional)
if (typeof window !== 'undefined') {
    window.PortfolioApp = PortfolioApp;
}