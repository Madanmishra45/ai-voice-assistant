// ==========================================
// AI Voice Assistant - Main Application
// ==========================================

class AIVoiceAssistant {
    constructor() {
        // Speech Recognition Setup
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = 'en-US';

        // Speech Synthesis Setup
        this.synth = window.speechSynthesis;

        // DOM Elements
        this.voiceBtn = document.getElementById('voiceBtn');
        this.textInput = document.getElementById('textInput');
        this.sendBtn = document.getElementById('sendBtn');
        this.responseDiv = document.getElementById('response');
        this.statusText = document.getElementById('statusText');
        this.statusDot = document.getElementById('status');
        this.historyList = document.getElementById('historyList');
        this.clearHistoryBtn = document.getElementById('clearHistory');
        this.permissionAlert = document.getElementById('permissionAlert');

        // Settings Elements
        this.volumeControl = document.getElementById('volumeControl');
        this.rateControl = document.getElementById('rateControl');
        this.languageSelect = document.getElementById('languageSelect');
        this.autoSpeak = document.getElementById('autoSpeak');
        this.darkModeToggle = document.getElementById('darkMode');
        this.notificationsToggle = document.getElementById('notifications');

        // Navigation
        this.navItems = document.querySelectorAll('.nav-item');

        // State
        this.isListening = false;
        this.commandHistory = JSON.parse(localStorage.getItem('commandHistory')) || [];
        this.settings = JSON.parse(localStorage.getItem('settings')) || {
            volume: 0.8,
            rate: 1,
            language: 'en-US',
            autoSpeak: true,
            darkMode: false,
            notifications: true
        };

        // Website mappings
        this.websites = {
            'google': 'https://google.com',
            'youtube': 'https://youtube.com',
            'github': 'https://github.com',
            'facebook': 'https://facebook.com',
            'twitter': 'https://twitter.com',
            'instagram': 'https://instagram.com',
            'linkedin': 'https://linkedin.com',
            'reddit': 'https://reddit.com',
            'wikipedia': 'https://wikipedia.org',
            'stack overflow': 'https://stackoverflow.com',
            'spotify': 'https://spotify.com',
            'netflix': 'https://netflix.com',
            'amazon': 'https://amazon.com',
            'ebay': 'https://ebay.com',
            'gmail': 'https://mail.google.com',
            'whatsapp': 'https://web.whatsapp.com',
            'discord': 'https://discord.com',
            'slack': 'https://slack.com',
            'notion': 'https://notion.so',
            'figma': 'https://figma.com',
            'calculator': 'javascript:void(0)',
            'twitch': 'https://twitch.tv',
            'medium': 'https://medium.com',
            'dev': 'https://dev.to'
        };

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadSettings();
        this.updateHistoryDisplay();
        this.checkMicrophonePermission();
    }

    setupEventListeners() {
        // Voice Button
        this.voiceBtn.addEventListener('click', () => this.toggleListening());

        // Text Input
        this.textInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleTextCommand();
        });
        this.sendBtn.addEventListener('click', () => this.handleTextCommand());

        // Speech Recognition Events
        this.recognition.onstart = () => this.onListeningStart();
        this.recognition.onresult = (event) => this.onSpeechResult(event);
        this.recognition.onerror = (event) => this.onSpeechError(event);
        this.recognition.onend = () => this.onListeningEnd();

        // Navigation
        this.navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchSection(item.dataset.section);
            });
        });

        // Settings
        this.clearHistoryBtn.addEventListener('click', () => this.clearHistory());
        this.volumeControl.addEventListener('input', (e) => this.updateVolume(e.target.value));
        this.rateControl.addEventListener('input', (e) => this.updateRate(e.target.value));
        this.languageSelect.addEventListener('change', (e) => this.updateLanguage(e.target.value));
        this.autoSpeak.addEventListener('change', (e) => this.settings.autoSpeak = e.target.checked);
        this.darkModeToggle.addEventListener('change', (e) => this.toggleDarkMode(e.target.checked));
        this.notificationsToggle.addEventListener('change', (e) => this.settings.notifications = e.target.checked);

        // Quick Commands
        document.querySelectorAll('.quick-cmd-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const command = btn.dataset.command;
                this.processCommand(command);
            });
        });
    }

    // ==========================================
    // Voice Recognition
    // ==========================================

    async checkMicrophonePermission() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            stream.getTracks().forEach(track => track.stop());
            this.permissionAlert.style.display = 'none';
        } catch (err) {
            this.permissionAlert.style.display = 'flex';
        }
    }

    toggleListening() {
        if (this.isListening) {
            this.recognition.stop();
        } else {
            this.recognition.start();
        }
    }

    onListeningStart() {
        this.isListening = true;
        this.voiceBtn.classList.add('listening');
        this.voiceBtn.innerHTML = '<i class="fas fa-microphone"></i><span>Listening...</span>';
        this.statusDot.classList.add('listening');
        this.statusText.textContent = 'Listening...';
    }

    onSpeechResult(event) {
        const transcript = event.results[0][0].transcript.toLowerCase();
        this.responseDiv.textContent = `You said: "${transcript}"`;
        this.processCommand(transcript);
    }

    onSpeechError(event) {
        this.showNotification(`Error: ${event.error}`, 'error');
        this.responseDiv.textContent = `Error: ${event.error}`;
    }

    onListeningEnd() {
        this.isListening = false;
        this.voiceBtn.classList.remove('listening');
        this.voiceBtn.innerHTML = '<i class="fas fa-microphone"></i><span>Click to Speak</span>';
        this.statusDot.classList.remove('listening');
        this.statusText.textContent = 'Ready to listen...';
    }

    // ==========================================
    // Command Processing
    // ==========================================

    handleTextCommand() {
        const command = this.textInput.value.trim().toLowerCase();
        if (command) {
            this.processCommand(command);
            this.textInput.value = '';
        }
    }

    processCommand(command) {
        // Add to history
        this.addToHistory(command);

        let response = '';

        // Website opening
        if (command.includes('open ')) {
            response = this.handleOpenWebsite(command);
        }
        // Writing/Typing
        else if (command.includes('write ') || command.includes('type ')) {
            response = this.handleWrite(command);
        }
        // Time commands
        else if (command.includes('time') || command.includes('what time')) {
            response = this.handleTime(command);
        }
        // Date commands
        else if (command.includes('date') || command.includes('today')) {
            response = this.handleDate(command);
        }
        // Calculator
        else if (command.includes('calculate') || command.includes('math')) {
            response = this.handleCalculate(command);
        }
        // Search
        else if (command.includes('search ')) {
            response = this.handleSearch(command);
        }
        // Weather
        else if (command.includes('weather')) {
            response = this.handleWeather(command);
        }
        // Greetings
        else if (command.includes('hello') || command.includes('hi ') || command.includes('hey ')) {
            response = this.handleGreeting(command);
        }
        // Help
        else if (command.includes('help') || command.includes('what can you do')) {
            response = 'I can help you open websites, write text, tell time and date, perform calculations, search the web, and much more! Say "open google" to get started.';
        }
        // Jokes
        else if (command.includes('joke') || command.includes('make me laugh')) {
            response = this.getRandomJoke();
        }
        // How are you
        else if (command.includes('how are you')) {
            response = 'I am doing great! Thanks for asking. Ready to help you with anything!';
        }
        // Unknown
        else {
            response = `I didn't understand that command. You said: "${command}". Try saying "open google" or "write hello"`;
        }

        this.displayResponse(response);
        
        if (this.settings.autoSpeak) {
            this.speak(response);
        }
    }

    handleOpenWebsite(command) {
        const website = command.replace('open ', '').trim();
        
        if (website === 'calculator') {
            this.openCalculator();
            return `Opening calculator...`;
        }

        const url = this.websites[website];
        if (url) {
            window.open(url, '_blank');
            return `Opening ${website}...`;
        }

        // Try to open as generic website
        let fullUrl = website;
        if (!website.startsWith('http')) {
            fullUrl = `https://${website}.com`;
        }
        window.open(fullUrl, '_blank');
        return `Opening ${website}...`;
    }

    handleWrite(command) {
        const textToWrite = command.replace(/^(write|type)\s+/, '').trim();
        
        // Try to focus on any text input on the page
        const textArea = document.querySelector('textarea');
        const textInput = document.querySelector('input[type="text"]');
        
        if (textArea) {
            textArea.value += textToWrite;
            textArea.focus();
        } else if (textInput && textInput !== this.textInput) {
            textInput.value += textToWrite;
            textInput.focus();
        } else {
            // Copy to clipboard if no input field found
            navigator.clipboard.writeText(textToWrite);
            this.showCopyFeedback();
            return `Copied to clipboard: "${textToWrite}"`;
        }
        
        return `Typed: "${textToWrite}"`;
    }

    handleTime(command) {
        const now = new Date();
        const time = now.toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit',
            second: '2-digit'
        });
        return `The current time is ${time}`;
    }

    handleDate(command) {
        const now = new Date();
        const date = now.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        return `Today is ${date}`;
    }

    handleCalculate(command) {
        try {
            const expression = command.replace(/^(calculate|math)\s+/, '').trim();
            // Remove common words
            const cleanExpression = expression
                .replace(/plus/g, '+')
                .replace(/minus/g, '-')
                .replace(/multiply|times/g, '*')
                .replace(/divide|divided by/g, '/')
                .replace(/percent/g, '%');
            
            const result = eval(cleanExpression);
            return `${expression} equals ${result}`;
        } catch (e) {
            return 'Sorry, I couldn\'t calculate that. Please try again.';
        }
    }

    handleSearch(command) {
        const query = command.replace('search ', '').trim();
        window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
        return `Searching for "${query}"...`;
    }

    handleWeather(command) {
        // Note: This would need a real weather API. For now, showing placeholder
        return 'To get real weather data, you would need to integrate with a weather API like OpenWeatherMap. For now, please check your weather app!';
    }

    handleGreeting(command) {
        const greetings = [
            'Hello! How can I help you today?',
            'Hi there! What can I do for you?',
            'Hey! Ready to assist you with anything!',
            'Greetings! How may I be of service?'
        ];
        return greetings[Math.floor(Math.random() * greetings.length)];
    }

    getRandomJoke() {
        const jokes = [
            'Why did the AI go to school? To improve its neural network!',
            'What do you call an AI that tells jokes? A pun-processing unit!',
            'Why did the voice assistant go to the party? Because it wanted to have a speak!',
            'How many programmers does it take to change a light bulb? None, that\'s a hardware problem!',
            'Why do Java developers wear glasses? Because they can\'t C#!'
        ];
        return jokes[Math.floor(Math.random() * jokes.length)];
    }

    // ==========================================
    // Display & UI
    // ==========================================

    displayResponse(response) {
        this.responseDiv.textContent = response;
    }

    speak(text) {
        // Cancel any ongoing speech
        this.synth.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = this.settings.rate;
        utterance.volume = this.settings.volume;
        utterance.lang = this.settings.language;

        this.synth.speak(utterance);
    }

    switchSection(sectionId) {
        // Update active nav item
        this.navItems.forEach(item => item.classList.remove('active'));
        document.querySelector(`[data-section="${sectionId}"]`).classList.add('active');

        // Update active section
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(sectionId).classList.add('active');
    }

    // ==========================================
    // History Management
    // ==========================================

    addToHistory(command) {
        const historyItem = {
            command,
            timestamp: new Date().toLocaleTimeString()
        };

        this.commandHistory.unshift(historyItem);
        if (this.commandHistory.length > 50) {
            this.commandHistory.pop();
        }

        localStorage.setItem('commandHistory', JSON.stringify(this.commandHistory));
        this.updateHistoryDisplay();
    }

    updateHistoryDisplay() {
        if (this.commandHistory.length === 0) {
            this.historyList.innerHTML = '<p class="empty-message">No commands yet. Start by saying something!</p>';
            return;
        }

        this.historyList.innerHTML = this.commandHistory
            .map((item, index) => `
                <div class="history-item">
                    <div class="history-item-text">
                        <div class="history-item-command">${this.escapeHtml(item.command)}</div>
                        <div class="history-item-time">${item.timestamp}</div>
                    </div>
                    <button class="history-item-copy" onclick="assistant.copyToClipboard('${this.escapeHtml(item.command)}')">
                        <i class="fas fa-copy"></i> Copy
                    </button>
                </div>
            `)
            .join('');
    }

    clearHistory() {
        if (confirm('Are you sure you want to clear all command history?')) {
            this.commandHistory = [];
            localStorage.setItem('commandHistory', JSON.stringify(this.commandHistory));
            this.updateHistoryDisplay();
            this.showNotification('History cleared!', 'success');
        }
    }

    copyToClipboard(text) {
        navigator.clipboard.writeText(text);
        this.showCopyFeedback();
    }

    // ==========================================
    // Settings
    // ==========================================

    loadSettings() {
        this.volumeControl.value = this.settings.volume * 100;
        document.getElementById('volumeValue').textContent = Math.round(this.settings.volume * 100) + '%';

        this.rateControl.value = this.settings.rate;
        document.getElementById('rateValue').textContent = this.settings.rate + 'x';

        this.languageSelect.value = this.settings.language;
        this.autoSpeak.checked = this.settings.autoSpeak;
        this.darkModeToggle.checked = this.settings.darkMode;
        this.notificationsToggle.checked = this.settings.notifications;

        if (this.settings.darkMode) {
            document.body.classList.add('dark-mode');
        }

        this.recognition.lang = this.settings.language;
    }

    updateVolume(value) {
        this.settings.volume = value / 100;
        document.getElementById('volumeValue').textContent = value + '%';
        this.saveSettings();
    }

    updateRate(value) {
        this.settings.rate = parseFloat(value);
        document.getElementById('rateValue').textContent = value + 'x';
        this.saveSettings();
    }

    updateLanguage(value) {
        this.settings.language = value;
        this.recognition.lang = value;
        this.saveSettings();
    }

    toggleDarkMode(enabled) {
        this.settings.darkMode = enabled;
        if (enabled) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        this.saveSettings();
    }

    saveSettings() {
        localStorage.setItem('settings', JSON.stringify(this.settings));
    }

    // ==========================================
    // Utilities
    // ==========================================

    openCalculator() {
        // Create a simple inline calculator
        alert('Calculator feature: Use voice commands like "calculate 5 plus 3" for math operations.');
    }

    showNotification(message, type = 'info') {
        const notification = document.getElementById('notification');
        notification.textContent = message;
        notification.className = `notification show ${type}`;

        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000);
    }

    showCopyFeedback() {
        const feedback = document.getElementById('copyFeedback');
        feedback.style.display = 'block';

        setTimeout(() => {
            feedback.style.display = 'none';
        }, 2000);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// ==========================================
// Initialize App
// ==========================================

let assistant;

document.addEventListener('DOMContentLoaded', () => {
    assistant = new AIVoiceAssistant();
    console.log('AI Voice Assistant initialized successfully!');
});
