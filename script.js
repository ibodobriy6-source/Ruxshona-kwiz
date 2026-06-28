const wrongAnswersDict = {
    1: "Bosilib ketdi blaman :)",
    2: "Aniqmi :(",
    3: "Ha uyatchen bilamanu !"
};

let currentWrongCount = 0;

// Розовые поднимающиеся сердечки на фоне
function createBackgroundHearts() {
    const container = document.getElementById('bg-hearts-container');
    const heartSymbols = ['❤️', '🩷', '♡'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'bg-heart';
        heart.innerText = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        
        heart.style.left = Math.random() * 100 + 'vw';
        const size = Math.random() * 15 + 15; 
        heart.style.fontSize = size + 'px';
        heart.style.setProperty('--random-x', (Math.random() * 140 - 70) + 'px');
        heart.style.animationDuration = (Math.random() * 3 + 5) + 's';
        
        container.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 8000);
    }, 500);
}

function nextPage(currentPageId, nextPageId) {
    currentWrongCount = 0; 
    
    const current = document.getElementById(`page-${currentPageId}`);
    const next = document.getElementById(`page-${nextPageId}`);
    
    if (current) current.classList.remove('active');
    if (next) next.classList.add('active');
}

function checkAnswer(questionNum, isCorrect, element) {
    const errorDiv = document.getElementById(`error-${questionNum}`);
    
    if (isCorrect) {
        if (errorDiv) {
            errorDiv.classList.remove('show');
            errorDiv.innerText = "";
        }
        
        // Визуальное выделение правильной кнопки как на картинке
        element.classList.add('selected');
        
        // Эффект взрыва розовых сердечек
        createHeartBurst(element);
        
        setTimeout(() => {
            nextPage(questionNum + 1, questionNum + 2);
        }, 700);
        
    } else {
        currentWrongCount++;
        let phase = currentWrongCount > 3 ? 3 : currentWrongCount;
        
        if (errorDiv) {
            errorDiv.innerText = wrongAnswersDict[phase];
            errorDiv.classList.add('show');
            
            // Тряска плашки ошибки
            errorDiv.style.animation = 'none';
            errorDiv.offsetHeight; 
            errorDiv.style.animation = 'shake 0.4s ease-in-out';
        }
    }
}

// Эффект взрыва
function createHeartBurst(buttonElement) {
    const rect = buttonElement.getBoundingClientRect();
    const burstCount = 30; 
    const heartSymbols = ['🩷', '❤️', '✨'];

    for (let i = 0; i < burstCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'burst-heart';
        particle.innerText = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        
        const x = rect.left + rect.width / 2;
        const y = rect.top + rect.height / 2;
        
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 150 + 50;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        particle.style.setProperty('--tx', tx + 'px');
        particle.style.setProperty('--ty', ty + 'px');
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 800);
    }
}

function restartQuiz() {
    currentWrongCount = 0;
    
    // Сбрасываем выбранные кнопки
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    
    // Прячем ошибки
    for (let i = 1; i <= 5; i++) {
        const err = document.getElementById(`error-${i}`);
        if (err) {
            err.innerText = "";
            err.classList.remove('show');
        }
    }
    
    const activePage = document.querySelector('.page.active');
    if (activePage) activePage.classList.remove('active');
    
    document.getElementById('page-1').classList.add('active');
}

window.addEventListener('DOMContentLoaded', () => {
    createBackgroundHearts();
});