# 🎤 AI Voice Assistant - Complete Web Application

A powerful, fully-featured AI voice-controlled assistant that lets you control your digital world with just your voice! Say commands to open websites, write text, get time/date, perform calculations, search the web, and much more.

![AI Voice Assistant](https://img.shields.io/badge/AI-Voice%20Assistant-blue?style=flat-square)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-yellow?style=flat-square)
![Responsive](https://img.shields.io/badge/Responsive-Mobile%20Friendly-green?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-red?style=flat-square)

## 🌟 Features

### 🎙️ Voice Control
- **Speech Recognition**: Built-in Web Speech API for real-time voice input
- **Text-to-Speech**: Automatic voice responses with adjustable speed and volume
- **Multiple Languages**: Support for 6+ languages (English US/UK, Spanish, French, German, Italian)
- **Microphone Support**: Seamless microphone integration with permission handling

### 🌐 Website Opening
- Open any website by voice command: *"open google", "open youtube", "open github"*
- Pre-configured shortcuts for 20+ popular websites
- Generic website opening support

### ✍️ Text Input & Writing
- Write/type text with voice: *"write hello world"*
- Auto-focus on text inputs
- Clipboard support for fallback scenarios

### ⏰ Time & Date
- Get current time: *"what time is it"*
- Get current date: *"what is today's date"*
- Formatted responses

### 🧮 Calculator
- Perform math operations: *"calculate 5 plus 3"*
- Support for basic arithmetic operations

### 🔍 Search
- Google search from voice: *"search machine learning"*
- Direct web search results

### 💬 Conversation
- Greetings and responses: *"hello", "how are you"*
- Jokes and entertainment: *"tell me a joke"*
- Help commands: *"what can you do"*

### 📜 Command History
- Automatic history logging
- Copy previous commands
- Clear history option
- Persistent storage (localStorage)

### ⚙️ Settings & Customization
- **Volume Control**: Adjust speech output volume (0-100%)
- **Speech Rate**: Control voice speed (0.5x - 2x)
- **Language Selection**: Choose from multiple languages
- **Dark Mode**: Toggle dark mode for comfortable usage
- **Auto-speak**: Enable/disable automatic voice responses
- **Notifications**: Toggle system notifications

### 🎨 Beautiful UI
- Modern, gradient design
- Responsive layout (mobile, tablet, desktop)
- Sidebar navigation
- Dark mode support
- Smooth animations and transitions
- Professional color scheme

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Edge, Safari)
- Microphone access permission
- Internet connection

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Madanmishra45/ai-voice-assistant.git
cd ai-voice-assistant
```

2. **Open in browser**
```bash
# Simply open index.html in your web browser
# Or use a local server for better experience
python -m http.server 8000
# Then visit http://localhost:8000
```

### Quick Start

1. **Allow Microphone Access**: Click "Allow" when browser asks for microphone permission
2. **Click the Voice Button**: Large purple microphone button in the center
3. **Speak Your Command**: Say any command like "open google" or "write hello"
4. **Get Response**: See instant text response and hear voice feedback

## 📝 Command Examples

### Website Commands
```
"open google"
"open youtube"
"open github"
"open facebook"
"open spotify"
"open netflix"
"open twitter"
"open linkedin"
"open amazon"
"open gmail"
```

### Text Commands
```
"write hello world"
"type my name is john"
"write a message"
```

### Information Commands
```
"what time is it"
"what is today's date"
"tell me the time"
"today's date"
```

### Calculation Commands
```
"calculate 5 plus 3"
"calculate 10 minus 2"
"calculate 4 multiply 5"
"calculate 20 divide 4"
```

### Search Commands
```
"search machine learning"
"search artificial intelligence"
"search web development"
```

### Entertainment Commands
```
"tell me a joke"
"make me laugh"
"hello"
"how are you"
"what can you do"
```

## 🎛️ Settings

### Voice Settings
- **Volume**: Adjust output volume from 0-100%
- **Speech Rate**: Change voice speed from 0.5x to 2x

### Display Settings
- **Dark Mode**: Toggle dark theme for better visibility
- **Language**: Choose from 6+ languages
- **Auto-speak**: Toggle automatic voice responses

### Data Settings
- **Notifications**: Enable/disable toast notifications
- **History**: View and clear command history

## 📂 File Structure

```
ai-voice-assistant/
├── index.html          # Main HTML file with UI structure
├── styles.css          # Complete CSS styling with dark mode
├── app.js              # JavaScript application logic
├── README.md           # Documentation (this file)
└── package.json        # Project metadata (optional)
```

## 💻 Code Overview

### HTML (index.html)
- Responsive semantic HTML5 structure
- Sidebar navigation with Font Awesome icons
- Multiple sections: Home, Commands, History, Settings
- Voice button and text input interface
- Settings panel with controls

### CSS (styles.css)
- CSS Grid and Flexbox layouts
- CSS variables for theming
- Dark mode support
- Responsive breakpoints (768px, 480px)
- Smooth animations and transitions
- Custom scrollbars

### JavaScript (app.js)
- `AIVoiceAssistant` class: Main application logic
- Speech Recognition API integration
- Speech Synthesis API for voice output
- Command processing and routing
- Local Storage for history and settings
- DOM manipulation and event handling

## 🔧 Advanced Features

### Local Storage
- Persistent command history
- Saved settings across sessions
- Automatic data loading on startup

### Command Routing
- Intelligent command parsing
- Multiple command variations supported
- Error handling and fallback responses

### Browser APIs Used
- Web Speech API (Recognition)
- Speech Synthesis API
- Web Audio API (indirectly)
- Clipboard API
- Local Storage API
- Media Devices API (microphone)

## 🌐 Browser Compatibility

| Browser | Support |
|---------|---------|
| Chrome | ✅ Full Support |
| Firefox | ✅ Full Support |
| Edge | ✅ Full Support |
| Safari | ✅ Partial Support |
| Opera | ✅ Full Support |
| IE 11 | ❌ Not Supported |

## 📱 Responsive Design

- **Desktop**: Full sidebar navigation + main content
- **Tablet**: Optimized layout with touch support
- **Mobile**: Collapsed navigation, full-width content

## 🎯 Use Cases

1. **Hands-free Navigation**: Browse websites without typing
2. **Accessibility**: Voice control for users with mobility issues
3. **Productivity**: Quick voice commands while working
4. **Learning**: Educational tool for understanding voice interfaces
5. **Automation**: Streamline repetitive web tasks
6. **Entertainment**: Interactive voice assistant experience

## 🔒 Privacy & Security

- **No Server**: All processing happens in your browser
- **No Data Collection**: Commands stored locally only
- **Open Source**: Full transparency of code
- **Microphone**: Permission required before use

## 🚀 Future Enhancements

- [ ] AI API Integration (OpenAI, Claude)
- [ ] Advanced NLP processing
- [ ] More website shortcuts
- [ ] Custom command creation
- [ ] Voice profiles and personalization
- [ ] Email/Message sending
- [ ] Weather API integration
- [ ] News fetching
- [ ] Music control
- [ ] Smart home integration
- [ ] Browser extension version
- [ ] Desktop app version

## 🐛 Troubleshooting

### Microphone Not Working
- Check browser permissions
- Allow microphone access in settings
- Test microphone in system settings
- Try a different browser

### Voice Not Playing
- Check volume settings in the app
- Ensure system volume is not muted
- Enable "Auto-speak" in settings
- Check browser audio output

### Commands Not Recognized
- Speak clearly and slowly
- Reduce background noise
- Try text input instead
- Check selected language matches your accent

### Responsive Issues
- Clear browser cache
- Force refresh (Ctrl+F5 or Cmd+Shift+R)
- Resize browser window
- Try different browser

## 📚 Learning Resources

- [Web Speech API Documentation](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- [Speech Synthesis API](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis)
- [Responsive Web Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [ES6 JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference)

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs and issues
- Suggest new features
- Submit pull requests
- Improve documentation

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

**Madan Mishra**
- GitHub: [@Madanmishra45](https://github.com/Madanmishra45)
- Email: mishramadan845@gmail.com

## 🙏 Acknowledgments

- Built with Web Speech API
- Styled with modern CSS3
- Icons by Font Awesome
- Inspired by modern voice assistants

## 📞 Support

For issues, questions, or suggestions:
1. Check the troubleshooting section
2. Open an GitHub issue
3. Review existing documentation
4. Contact the author

## 🎉 Fun Facts

- This assistant works completely offline (except for website opening)
- All data is stored locally in your browser
- No tracking or data collection
- Works on desktop, tablet, and mobile devices
- Supports multiple languages for global users

---

**Built with ❤️ using Web APIs**

⭐ If you like this project, please give it a star on GitHub!

---

## Quick Links

- 🌐 [Live Demo](#) - Deploy to GitHub Pages
- 📖 [Full Documentation](README.md)
- 🐛 [Report Issues](https://github.com/Madanmishra45/ai-voice-assistant/issues)
- 💡 [Suggest Features](https://github.com/Madanmishra45/ai-voice-assistant/discussions)

Happy Voice Commanding! 🚀
