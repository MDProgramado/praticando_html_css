// TypeWriter Component
export class TypeWriter {
    constructor(element, words, options = {}) {
        this.element = element;
        this.words = words;
        this.options = {
            typeSpeed: 100,
            deleteSpeed: 50,
            delayBetweenWords: 1500,
            loop: true,
            cursor: true,
            ...options
        };
        
        this.wordIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.isPaused = false;
        this.timeout = null;
        
        this.init();
    }

    init() {
        // Add cursor if enabled
        if (this.options.cursor && !this.element.nextElementSibling?.classList.contains('typing-cursor')) {
            const cursor = document.createElement('span');
            cursor.className = 'typing-cursor';
            cursor.textContent = '|';
            this.element.parentNode.insertBefore(cursor, this.element.nextSibling);
        }
        
        // Start typing
        this.type();
    }

    type() {
        if (this.isPaused) return;

        const currentWord = this.words[this.wordIndex];
        
        if (this.isDeleting) {
            // Deleting text
            this.element.textContent = currentWord.substring(0, this.charIndex - 1);
            this.charIndex--;
        } else {
            // Typing text
            this.element.textContent = currentWord.substring(0, this.charIndex + 1);
            this.charIndex++;
        }

        // Calculate speed with some randomness for natural feel
        let speed = this.isDeleting ? this.options.deleteSpeed : this.options.typeSpeed;
        speed += Math.random() * 50 - 25; // Add randomness

        // Handle word completion
        if (!this.isDeleting && this.charIndex === currentWord.length) {
            // Pause at end of word
            speed = this.options.delayBetweenWords;
            this.isDeleting = true;
        } else if (this.isDeleting && this.charIndex === 0) {
            // Move to next word
            this.isDeleting = false;
            this.wordIndex++;
            
            // Loop or stop
            if (this.wordIndex === this.words.length) {
                if (this.options.loop) {
                    this.wordIndex = 0;
                } else {
                    this.pause();
                    return;
                }
            }
        }

        // Schedule next action
        this.timeout = setTimeout(() => this.type(), speed);
    }

    pause() {
        this.isPaused = true;
        if (this.timeout) {
            clearTimeout(this.timeout);
        }
    }

    resume() {
        if (this.isPaused) {
            this.isPaused = false;
            this.type();
        }
    }

    stop() {
        this.pause();
        this.wordIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.element.textContent = '';
    }

    updateWords(newWords) {
        this.pause();
        this.words = newWords;
        this.wordIndex = 0;
        this.charIndex = 0;
        this.isDeleting = false;
        this.resume();
    }

    destroy() {
        this.stop();
        // Remove cursor
        const cursor = this.element.nextElementSibling;
        if (cursor?.classList.contains('typing-cursor')) {
            cursor.remove();
        }
    }
}