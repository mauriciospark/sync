/**
 * ============================================================================
 * PROPRIETÁRIO: Mauricio Spark
 * MARCA: WINSOFT
 * PROJETO: SYNC
 * VERSÃO: 1.0.0
 * LINHAGEM: SPARK
 * ============================================================================
 */

const SYNC_CONFIG = {
    STORAGE_KEY: 'sync_target_data',
    UPDATE_INTERVAL: 1000
};

class SyncTimer {
    constructor() {
        this.targetDate = null;
        this.intervalId = null;
        
        this.dom = {
            display: {
                days: document.getElementById('days'),
                hours: document.getElementById('hours'),
                minutes: document.getElementById('minutes'),
                seconds: document.getElementById('seconds')
            },
            inputs: {
                day: document.getElementById('day'),
                month: document.getElementById('month'),
                year: document.getElementById('year'),
                hours: document.getElementById('inputHours'),
                minutes: document.getElementById('inputMinutes')
            },
            feedback: {
                title: document.getElementById('eventName'),
                description: document.getElementById('eventDescription')
            },
            controls: {
                startBtn: document.getElementById('startBtn')
            }
        };

        this.init();
    }

    init() {
        this.bindEvents();
        this.loadSavedState();
    }

    bindEvents() {
        this.dom.controls.startBtn.addEventListener('click', () => this.handleStart());
        
        // Atalho de teclado: Enter para iniciar
        document.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleStart();
        });

        // Feedback visual instantâneo nos inputs
        Object.values(this.dom.inputs).forEach(input => {
            input.addEventListener('input', () => this.clearErrors());
        });
    }

    handleStart() {
        const values = this.getInputValues();
        
        if (!this.isValidInput(values)) {
            this.showFeedback('DATA INVÁLIDA', 'Por favor, preencha todos os campos corretamente.', 'error');
            return;
        }

        this.targetDate = new Date(
            values.year, 
            values.month - 1, 
            values.day, 
            values.hours, 
            values.minutes, 
            0
        );

        if (this.targetDate <= new Date()) {
            this.showFeedback('DATA NO PASSADO', 'A data alvo deve ser no futuro.', 'error');
            return;
        }

        this.saveState(values);
        this.startEngine();
    }

    getInputValues() {
        return {
            day: parseInt(this.dom.inputs.day.value),
            month: parseInt(this.dom.inputs.month.value),
            year: parseInt(this.dom.inputs.year.value),
            hours: parseInt(this.dom.inputs.hours.value),
            minutes: parseInt(this.dom.inputs.minutes.value)
        };
    }

    isValidInput(v) {
        return !isNaN(v.day) && !isNaN(v.month) && !isNaN(v.year) && 
               !isNaN(v.hours) && !isNaN(v.minutes);
    }

    startEngine() {
        if (this.intervalId) clearInterval(this.intervalId);
        
        this.updateDisplay();
        this.intervalId = setInterval(() => this.updateDisplay(), SYNC_CONFIG.UPDATE_INTERVAL);
        
        this.showFeedback('SYNC ATIVO', 'Contagem regressiva em tempo real.', 'success');
    }

    updateDisplay() {
        const now = new Date();
        const diff = this.targetDate - now;

        if (diff <= 0) {
            this.handleExpiry();
            return;
        }

        const time = {
            days: Math.floor(diff / 86400000),
            hours: Math.floor((diff % 86400000) / 3600000),
            minutes: Math.floor((diff % 3600000) / 60000),
            seconds: Math.floor((diff % 60000) / 1000)
        };

        this.renderTime(time);
    }

    renderTime(time) {
        this.animateChange(this.dom.display.days, this.pad(time.days));
        this.animateChange(this.dom.display.hours, this.pad(time.hours));
        this.animateChange(this.dom.display.minutes, this.pad(time.minutes));
        this.animateChange(this.dom.display.seconds, this.pad(time.seconds));
    }

    animateChange(element, newValue) {
        if (element.textContent !== newValue) {
            element.classList.add('fade-update');
            element.textContent = newValue;
            setTimeout(() => element.classList.remove('fade-update'), 300);
        }
    }

    pad(num) {
        return num.toString().padStart(2, '0');
    }

    handleExpiry() {
        clearInterval(this.intervalId);
        this.renderTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        this.showFeedback('CONCLUÍDO', 'O evento definido foi alcançado.', 'expired');
        this.playCelebrationSound();
    }

    playCelebrationSound() {
        try {
            const celebrationAudio = new Audio('./applause.mp3');
            celebrationAudio.play().catch(e => {
                console.warn('SYNC: Áudio aguardando interação do usuário.', e);
            });
        } catch (error) {
            console.error('SYNC ERROR: Falha ao carregar áudio:', error);
        }
    }

    showFeedback(title, desc, type) {
        this.dom.feedback.title.textContent = title;
        this.dom.feedback.description.textContent = desc;
        this.dom.feedback.title.className = `status-${type}`;
    }

    clearErrors() {
        if (this.dom.feedback.title.classList.contains('status-error')) {
            this.showFeedback('SYNC', 'Defina uma nova data alvo.', 'normal');
        }
    }

    saveState(values) {
        localStorage.setItem(SYNC_CONFIG.STORAGE_KEY, JSON.stringify({
            ...values,
            targetISO: this.targetDate.toISOString()
        }));
    }

    loadSavedState() {
        const saved = localStorage.getItem(SYNC_CONFIG.STORAGE_KEY);
        if (saved) {
            try {
                const data = JSON.parse(saved);
                Object.keys(this.dom.inputs).forEach(key => {
                    if (data[key] !== undefined) this.dom.inputs[key].value = data[key];
                });
                this.targetDate = new Date(data.targetISO);
                if (this.targetDate > new Date()) this.startEngine();
            } catch (e) {
                localStorage.removeItem(SYNC_CONFIG.STORAGE_KEY);
            }
        }
    }
}

document.addEventListener('DOMContentLoaded', () => new SyncTimer());
