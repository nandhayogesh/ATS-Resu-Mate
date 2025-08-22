# ProfiBoost Engine

A modern, AI-powered resume analyzer that helps optimize resumes for better career opportunities. Built with React, TypeScript, and powered by TextRazor AI for intelligent resume analysis.

## 🚀 Features

- **AI-Powered Analysis**: Advanced text analysis using TextRazor API
- **Text Upload**: Simple and secure text file upload (.txt format)
- **Smart Suggestions**: Intelligent recommendations for resume improvement
- **Professional UI**: Modern, responsive design built with Tailwind CSS
- **Real-time Analysis**: Fast and accurate resume insights
- **Career Insights**: Industry-specific recommendations and keyword optimization

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, Shadcn/ui components
- **AI Service**: TextRazor API for text analysis
- **Deployment**: Vercel with serverless functions
- **Build Tool**: Vite for fast development and optimized builds

## 🎯 How It Works

1. **Upload**: Upload your resume as a text file (.txt format)
2. **Analyze**: Our AI analyzes your resume content using advanced NLP
3. **Improve**: Get personalized suggestions and recommendations
4. **Optimize**: Apply suggestions to enhance your resume's effectiveness

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A TextRazor API key (get one at [textrazor.com](https://www.textrazor.com/))

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/profi-boost-engine.git
   cd profi-boost-engine
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Add your TextRazor API key to the environment variables.

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📁 Project Structure

```
profi-boost-engine/
├── api/                    # Vercel serverless functions
│   └── analyze-resume-text.js
├── public/                 # Static assets
├── src/
│   ├── components/         # React components
│   │   ├── ui/            # Shadcn/ui components
│   │   ├── AnalysisResults.tsx
│   │   └── ResumeUpload.tsx
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   ├── pages/             # Page components
│   │   ├── Index.tsx      # Home page
│   │   ├── Analyzer.tsx   # Resume analyzer
│   │   ├── About.tsx      # About page
│   │   └── NotFound.tsx   # 404 page
│   └── services/          # API services
│       └── aiService.ts
├── vercel.json            # Vercel deployment config
└── package.json
```

## 🔧 Environment Variables

For production deployment on Vercel, add these environment variables:

- `TEXTRAZOR_API_KEY`: Your TextRazor API key

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

The project is configured for Vercel with serverless functions for API endpoints.

### Manual Build

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📄 API Endpoints

- `POST /api/analyze-resume-text`: Analyzes resume text and returns improvement suggestions

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [TextRazor](https://www.textrazor.com/) for AI-powered text analysis
- [Shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Vite](https://vitejs.dev/) for fast development experience

## 📞 Support

If you have any questions or need support, please open an issue in the GitHub repository.

---

**ProfiBoost Engine** - Elevate your career with AI-powered resume optimization! 🚀
