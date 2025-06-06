# Rutgers Economics Labs - React Website

A modern, responsive React website for Rutgers Economics Labs (REL), a student organization conducting pro bono economic research for government agencies, think tanks, and public policy organizations.

## 🚀 Features

### ✅ Core Requirements Implemented
- **React Conversion**: Fully converted from static HTML to React with React Router
- **Tailwind CSS**: Complete styling with custom animations and responsive design
- **Google Analytics**: Integrated GA4 tracking (G-VNVTNP4NMX)
- **Contact Forms**: Email functionality sending to rel@rutgerseconomics.org with mailing list integration
- **Application Management**: Dynamic application status (open/closed) with dates and styling
- **Enhanced Resources**: Improved learning resources with filtering and search functionality

### 🎨 Design Features
- Responsive design optimized for all devices
- Animated stock chart background on homepage
- Smooth fade-in animations and hover effects
- Modern gradient backgrounds and card designs
- Interactive navigation with mobile menu
- Accessible color contrast and typography

### 📱 Pages
1. **Home** - Hero section with animated background and mission statement
2. **About** - Detailed organization information and process
3. **Projects** - Research project showcase and partner organizations
4. **Resources** - Comprehensive learning materials with search/filter
5. **People** - Team members, leadership, and alumni
6. **Apply** - Application status, timeline, and contact form
7. **Contact** - Contact form with mailing list signup and FAQ

## 🛠 Tech Stack

- **React 18** - Modern React with hooks and functional components
- **React Router 6** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Modern icon library
- **React GA4** - Google Analytics integration

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd rutgers-economics-labs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🔧 Configuration

### Google Analytics
The Google Analytics tracking ID is configured in `src/App.js`:
```javascript
const GA_TRACKING_ID = 'G-VNVTNP4NMX';
```

### Contact Form Email
Contact forms are configured to send emails to `rel@rutgerseconomics.org`. Update the email address in:
- `src/pages/Apply.js`
- `src/pages/Contact.js`

### Application Dates
Update application dates in `src/pages/Apply.js`:
```javascript
const [applicationDates, setApplicationDates] = useState({
  opening: 'August 15, 2025',
  closing: 'September 30, 2025',
  notification: 'October 15, 2025'
});
```

## 📧 Email & Mailing List Integration

The contact forms are designed to integrate with your backend API. To implement:

1. **Create API endpoint** at `/api/contact` that handles:
   - Form submission validation
   - Email sending to rel@rutgerseconomics.org
   - Mailing list subscription
   - Response with success/error status

2. **Example backend structure**:
   ```javascript
   // POST /api/contact
   {
     firstName: string,
     lastName: string,
     email: string,
     message: string,
     joinMailingList: boolean,
     sendTo: 'rel@rutgerseconomics.org'
   }
   ```

## 🎯 Application Status Management

The application page automatically shows open/closed status based on dates. To manage:

1. **Static dates**: Update dates in `src/pages/Apply.js`
2. **Dynamic management**: Connect to a backend API for real-time status updates
3. **Manual override**: Add admin interface for status management

## 📚 Content Management

### Adding Resources
Update the resources array in `src/pages/Resources.js`:
```javascript
const resources = {
  articles: [...],
  tutorials: [...],
  datasets: [...],
  tools: [...]
};
```

### Adding Team Members
Update team data in `src/pages/People.js`:
```javascript
const leadership = [...];
const currentMembers = [...];
const alumni = [...];
```

### Adding Projects
Update project showcase in `src/pages/Projects.js`:
```javascript
const projects = [...];
const partners = [...];
```

## 🚀 Deployment

### Netlify (Recommended)
1. Connect your repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `build`
4. Add environment variables if needed

### Vercel
1. Connect repository to Vercel
2. Framework preset: Create React App
3. Build command: `npm run build`
4. Output directory: `build`

### Traditional Hosting
1. Run `npm run build`
2. Upload `build` folder contents to your web server
3. Configure server for single-page application routing

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License. See LICENSE file for details.

## 📞 Support

For technical support or questions about the website:
- Email: rel@rutgerseconomics.org
- Visit: /contact page on the website

## 🔄 Updates & Maintenance

### Regular Updates
- Update application dates each semester
- Add new team members and projects
- Update resource links and content
- Monitor Google Analytics for insights

### Content Updates
- Review and update project showcases
- Add new learning resources
- Update team member information
- Refresh partner organization details

---

Built with ❤️ for Rutgers Economics Labs
