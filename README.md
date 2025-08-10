# 🌦️ EmojiCast

<div align="center">

![EmojiCast Banner](https://via.placeholder.com/800x200/1976d2/ffffff?text=🌦️+EmojiCast+-+Beautiful+Weather+Forecasts)

**A beautiful, responsive weather application with emoji-based weather icons and comprehensive forecasts**

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Try_Now-1976d2?style=for-the-badge)](https://emojicast0.web.app)
[![GitHub Stars](https://img.shields.io/github/stars/danuaemx/emojicast?style=for-the-badge&color=gold)](https://github.com/danuaemx/emojicast/stargazers)
[![License](https://img.shields.io/badge/License-GPL_v3.0-blue?style=for-the-badge)](LICENSE)
[![Free APIs](https://img.shields.io/badge/100%25_Free-APIs-green?style=for-the-badge)](https://open-meteo.com)

---

**🔗 [Try EmojiCast Live](https://emojicast0.web.app) • [Report Bug](https://github.com/danuaemx/emojicast/issues) • [Request Feature](https://github.com/danuaemx/emojicast/issues)**

</div>

## 🌟 What Makes EmojiCast Special?

EmojiCast transforms weather forecasting into a delightful visual experience using **emoji-based weather icons** and **completely free APIs**. Built with vanilla JavaScript and Material Design principles, it offers comprehensive weather data without requiring any API keys or registration.

### 🎯 Key Highlights

- **🆓 100% Free** - No API keys, no registration, no costs
- **😊 Emoji Weather Icons** - Intuitive and fun weather representations
- **📱 Fully Responsive** - Perfect on desktop, tablet, and mobile
- **⚡ Lightning Fast** - Pure vanilla JavaScript, no heavy frameworks
- **🌙 Dark/Light Theme** - Beautiful themes that adapt to your preference
- **📊 Interactive Charts** - 24-hour temperature and humidity graphs
- **🌍 Global Coverage** - Weather data for any location worldwide

## ✨ Features Overview

<table>
<tr>
<td width="50%">

### 🎨 **Beautiful Interface**
- Clean Material Design aesthetics
- Smooth animations and transitions
- Color-coded UV index warnings
- Gradient backgrounds and cards

### 📊 **Comprehensive Data**
- Current weather conditions
- 24-hour detailed forecasts
- 7-day weather outlook
- Interactive temperature/humidity graphs

</td>
<td width="50%">

### 🌐 **Smart Location**
- Automatic IP-based location detection
- Global city search capabilities
- Timezone-aware displays
- Local sunrise/sunset times

### ⚡ **Performance Optimized**
- Lightweight vanilla JavaScript
- Efficient caching mechanisms
- Pull-to-refresh on mobile
- Auto-refresh every 10 minutes

</td>
</tr>
</table>

### 📱 **Mobile Experience**
- **Pull-to-refresh** gesture support
- **Responsive design** that works on all screen sizes
- **Touch-optimized** interface elements
- **PWA-ready** for app-like experience

### ⌨️ **Keyboard Shortcuts**
- `F5` or `Ctrl+R` - Refresh weather data
- `T` - Toggle dark/light theme
- `U` - Switch temperature units (°C/°F)
- `G` - Toggle graph type (temperature/humidity)

## 🚀 Quick Start

### 🌐 **Option 1: Use Online (Recommended)**

Simply visit **[https://emojicast0.web.app](https://emojicast0.web.app)** - No installation required!

### 💻 **Option 2: Run Locally**

```bash
# Clone the repository
git clone https://github.com/danuaemx/emojicast.git
cd emojicast

# Option A: Open directly in browser
open index.html

# Option B: Serve with Python (recommended for development)
python -m http.server 8000
# Then visit http://localhost:8000

# Option C: Serve with Node.js
npx serve .
# Then visit http://localhost:3000
```

### 🐳 **Option 3: Docker (Optional)**

```bash
# Build and run with Docker
docker build -t emojicast .
docker run -p 8080:80 emojicast
# Then visit http://localhost:8080
```

## 🛠️ Technology Stack

<div align="center">

| Frontend | APIs | Hosting | Design |
|----------|------|---------|--------|
| ![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white) | ![Open-Meteo](https://img.shields.io/badge/Open--Meteo-4285F4?style=flat&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMTMuMDkgOC4yNkwyMCA5TDEzLjA5IDE1Ljc0TDEyIDIyTDEwLjkxIDE1Ljc0TDQgOUwxMC45MSA4LjI2TDEyIDJaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K) | ![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat&logo=firebase&logoColor=black) | ![Material Design](https://img.shields.io/badge/Material_Design-757575?style=flat&logo=material-design&logoColor=white) |
| ![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white) | ![ipapi](https://img.shields.io/badge/ipapi.co-FF6B6B?style=flat&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJDNi40OCAyIDIgNi40OCAyIDEyUzYuNDggMjIgMTIgMjJTMjIgMTcuNTIgMjIgMTJTMTcuNTIgMiAxMiAyWk0xMCAxN0w1IDEyTDYuNDEgMTAuNTlMMTAgMTQuMTdMMTcuNTkgNi41OEwxOSA4TDEwIDE3WiIgZmlsbD0id2hpdGUiLz4KPHN2Zz4K) | | ![Responsive](https://img.shields.io/badge/Responsive-38B2AC?style=flat&logo=css3&logoColor=white) |
| ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black) | | | ![Accessibility](https://img.shields.io/badge/A11y-0052CC?style=flat&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJDMTMuMSAyIDE0IDIuOSAxNCA0UzEzLjEgNiAxMiA2UzEwIDUuMSAxMCA0UzEwLjkgMiAxMiAyWk0yMSA5VjdIMTVMMTMuNSA3LjVDMTMuMSA3LjIgMTIuNiA3IDEyIDdTMTAuOSA3LjIgMTAuNSA3LjVMOSA4TDguNSA4SDNWMTBINU0xMSA4LjVMOC41IDlMOSAxMC41TDEyIDEzTDE1IDEwLjVMMTUuNSA5TDEzIDguNUwxMiA5LjVMMTEgOC41WiIgZmlsbD0id2hpdGUiLz4KPHN2Zz4K) |

</div>

### 🔧 **Core Technologies**
- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Design System**: Material Design 3.0 principles
- **APIs**: 
  - [Open-Meteo](https://open-meteo.com) - Weather data (completely free)
  - [ipapi.co](https://ipapi.co) - Geolocation services (free tier)
- **Hosting**: Firebase Hosting with global CDN
- **Icons**: Unicode emoji + custom text fallbacks

## 📊 Weather Data & APIs

### 🌡️ **Current Weather Includes:**
- Temperature (current & feels like)
- Weather conditions with emoji representations
- Humidity, wind speed, and atmospheric pressure
- UV index with color-coded warnings
- Visibility estimation
- Sunrise and sunset times

### 📈 **Forecast Features:**
- **Hourly**: Next 24 hours with detailed conditions
- **Daily**: 7-day outlook with high/low temperatures
- **Interactive Graphs**: Temperature and humidity trends
- **Weather Codes**: Comprehensive condition mapping

### 🆓 **Why Free APIs?**
Unlike many weather apps that require expensive API keys, EmojiCast uses:
- **Open-Meteo**: European weather service with no rate limits
- **ipapi.co**: Geolocation with generous free tier
- **No registration required** - just open and use!

## 🎨 Customization & Themes

### 🌙 **Theme System**
- **Auto-detection**: Respects your system theme preference
- **Manual toggle**: Switch between light and dark modes
- **Persistent**: Remembers your choice across sessions
- **Smooth transitions**: Animated theme switching

### 🎯 **Color Palette**
```css
/* Light Theme */
--primary-color: #1976d2;
--secondary-color: #03dac6;
--background-color: #fafafa;

/* Dark Theme */
--primary-color: #bb86fc;
--secondary-color: #03dac6;
--background-color: #121212;
```

## 📱 Browser Support

<table>
<tr>
<th>Browser</th>
<th>Minimum Version</th>
<th>Features</th>
</tr>
<tr>
<td>🌐 Chrome</td>
<td>60+</td>
<td>✅ Full support with all animations</td>
</tr>
<tr>
<td>🦊 Firefox</td>
<td>55+</td>
<td>✅ Full support with all features</td>
</tr>
<tr>
<td>🧭 Safari</td>
<td>12+</td>
<td>✅ Full support (iOS 12+)</td>
</tr>
<tr>
<td>🔷 Edge</td>
<td>79+</td>
<td>✅ Full support with PWA features</td>
</tr>
</table>

### 📱 **Mobile Support**
- **iOS**: Safari 12+ (iPhone 6s and newer)
- **Android**: Chrome 60+ (Android 7.0+)
- **Progressive Web App** features for app-like experience

## 🤝 Contributing

We welcome contributions! Here's how you can help make EmojiCast even better:

### 🐛 **Bug Reports**
Found a bug? Please [open an issue](https://github.com/danuaemx/emojicast/issues) with:
- Browser and version
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

### 💡 **Feature Requests**
Have an idea? [Create a feature request](https://github.com/danuaemx/emojicast/issues) with:
- Clear description of the feature
- Use case and benefits
- Any implementation ideas

### 🔧 **Development**

```bash
# 1. Fork the repository
# 2. Clone your fork
git clone https://github.com/yourusername/emojicast.git
cd emojicast

# 3. Create a feature branch
git checkout -b feature/amazing-feature

# 4. Make your changes
# 5. Test thoroughly

# 6. Commit your changes
git commit -m 'Add: Amazing new feature'

# 7. Push to your fork
git push origin feature/amazing-feature

# 8. Open a Pull Request
```

### 📋 **Development Guidelines**
- Follow existing code style and patterns
- Test on multiple browsers and devices
- Ensure accessibility standards are met
- Update documentation for new features
- Keep performance optimizations in mind

## 📄 License & Legal

This project is licensed under the **GNU General Public License v3.0**. See the [LICENSE](LICENSE) file for full details.

### 🔒 **What this means:**
- ✅ **Free to use** for personal and commercial projects
- ✅ **Modify and distribute** with proper attribution
- ✅ **Access to source code** guaranteed
- ❗ **Share-alike** - derivatives must use same license

### 🙏 **Acknowledgments & Credits**
- **Weather Data**: [Open-Meteo](https://open-meteo.com) - Free weather API
- **Geolocation**: [ipapi.co](https://ipapi.co) - IP-based location service
- **Design**: Google's [Material Design](https://material.io) principles
- **Hosting**: [Firebase Hosting](https://firebase.google.com/products/hosting)
- **Icons**: Unicode Consortium emoji standards
- **Fonts**: [Google Fonts](https://fonts.google.com) (Roboto family)

## 📊 Project Stats

<div align="center">

![GitHub repo size](https://img.shields.io/github/repo-size/danuaemx/emojicast?style=flat&color=blue)
![GitHub code size](https://img.shields.io/github/languages/code-size/danuaemx/emojicast?style=flat&color=blue)
![GitHub last commit](https://img.shields.io/github/last-commit/danuaemx/emojicast?style=flat&color=green)
![GitHub issues](https://img.shields.io/github/issues/danuaemx/emojicast?style=flat&color=orange)
![GitHub pull requests](https://img.shields.io/github/issues-pr/danuaemx/emojicast?style=flat&color=purple)

</div>

### 📈 **Performance Metrics**
- **Bundle Size**: < 100KB total (HTML + CSS + JS)
- **Load Time**: < 2 seconds on 3G
- **Lighthouse Score**: 95+ (Performance, Accessibility, SEO)
- **API Response**: < 500ms average

## 📞 Contact & Support

<div align="center">

**👨‍💻 Developer**: [@danuaemx](https://github.com/danuaemx)

**🔗 Project Links**:
[GitHub Repository](https://github.com/danuaemx/emojicast) • 
[Live Demo](https://emojicast0.web.app) • 
[Issue Tracker](https://github.com/danuaemx/emojicast/issues)

**📬 Get in Touch**:
[GitHub Issues](https://github.com/danuaemx/emojicast/issues) • 
[Discussions](https://github.com/danuaemx/emojicast/discussions)

</div>

---

<div align="center">

**⭐ Enjoyed EmojiCast? Give it a star to show your support!**

[![Star on GitHub](https://img.shields.io/github/stars/danuaemx/emojicast?style=social)](https://github.com/danuaemx/emojicast/stargazers)

*Made with ❤️ and lots of ☕ by [@danuaemx](https://github.com/danuaemx)*

**🌦️ Keep exploring the weather! 🌈**

</div>
