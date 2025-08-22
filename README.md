# ATS Resu-Mate

A professional AI-powered resume analyzer designed to optimize resumes for Applicant Tracking Systems (ATS) and improve career prospects. Built with modern web technologies and powered by TextRazor AI for intelligent resume analysis and optimization recommendations.

## Features

- **AI-Powered Analysis**: Advanced natural language processing using TextRazor API
- **ATS Optimization**: Specialized recommendations for ATS compatibility
- **Secure Text Upload**: Simple and secure text file upload (.txt format)
- **Intelligent Suggestions**: Data-driven recommendations for resume improvement
- **Modern Interface**: Clean, responsive design built with React and Tailwind CSS
- **Real-time Processing**: Fast and accurate resume analysis
- **Career Insights**: Industry-specific recommendations and keyword optimization
- **Professional Scoring**: Comprehensive resume evaluation metrics

## Technology Stack

## Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Shadcn/ui component library
- **AI Integration**: TextRazor API for natural language processing
- **Deployment**: Vercel with serverless functions
- **Build System**: Vite for optimized development and production builds

## How It Works

1. **Upload**: Users upload their resume as a text file (.txt format)
2. **Process**: The system analyzes content using advanced NLP algorithms
3. **Evaluate**: AI generates comprehensive improvement recommendations
4. **Optimize**: Users receive actionable insights for resume enhancement

## Getting Started

### Prerequisites

- Node.js 18 or higher
- TextRazor API key (available at textrazor.com)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/nandhayogesh/profi-boost-engine.git
   cd profi-boost-engine
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Add your TextRazor API key to the environment variables.

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Access the application at http://localhost:5173

## Project Architecture

```
ats-resu-mate/
├── api/                    # Vercel serverless functions
│   └── analyze-resume-text.js
├── public/                 # Static assets and images
├── src/
│   ├── components/         # Reusable React components
│   │   ├── ui/            # Shadcn/ui component library
│   │   ├── AnalysisResults.tsx
│   │   └── ResumeUpload.tsx
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions and helpers
│   ├── pages/             # Application pages
│   │   ├── Index.tsx      # Landing page
│   │   ├── Analyzer.tsx   # Resume analysis interface
│   │   ├── About.tsx      # About page
│   │   └── NotFound.tsx   # 404 error page
│   └── services/          # API service layer
│       └── aiService.ts
├── vercel.json            # Vercel deployment configuration
├── package.json           # Project dependencies and scripts
└── README.md
```

## Environment Configuration

Production deployment requires the following environment variables:

- `TEXTRAZOR_API_KEY`: Your TextRazor API authentication key

## Deployment

### Vercel Deployment (Recommended)

1. Push code to GitHub repository
2. Import project in Vercel dashboard
3. Configure environment variables
4. Deploy application

The project is optimized for Vercel's serverless architecture with built-in API routing.

### Local Production Build

```bash
npm run build
```

Production files are generated in the `dist` directory.

## API Documentation

### Endpoints

- `POST /api/analyze-resume-text`: Processes resume text and returns optimization recommendations

## Development Workflow

### Contributing Guidelines

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/enhancement-name`)
3. Implement changes with appropriate testing
4. Commit changes (`git commit -m 'Add enhancement description'`)
5. Push to branch (`git push origin feature/enhancement-name`)
6. Create a Pull Request

### Code Standards

- TypeScript for type safety
- ESLint for code quality
- Prettier for code formatting
- Component-based architecture
- Responsive design principles

## Technical Specifications

### Performance Metrics

- Build size: 299KB (92.53KB gzipped)
- TypeScript compilation: Zero errors
- Modern ES6+ JavaScript
- Optimized asset loading
- Mobile-responsive design

### Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

This project is licensed under the MIT License.

## Acknowledgments

- TextRazor for advanced natural language processing capabilities
- Shadcn/ui for modern component architecture
- Tailwind CSS for utility-first styling
- Vite for optimized development experience
- Vercel for seamless deployment infrastructure

## Support

For technical support or questions, please create an issue in the GitHub repository.

---

**ATS Resu-Mate** - Professional Resume Optimization Platform
