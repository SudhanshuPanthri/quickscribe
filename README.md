# Quickscribe

Quickscribe is an AI-powered application designed to transform lengthy PDF documents into concise, easy-to-read summaries. Built with [Next.js](https://nextjs.org), it leverages advanced AI models like OpenAI's GPT and Google's Gemini AI to provide accurate and engaging summaries.

## Features

- **AI-Powered Summarization**: Automatically generate summaries for uploaded PDF documents using OpenAI and Gemini AI.
- **User Authentication**: Secure user authentication and session management powered by [Clerk](https://clerk.dev).
- **PDF Upload**: Upload PDF files up to 32MB for processing.
- **Responsive Design**: Fully responsive UI built with Tailwind CSS.
- **Pricing Plans**: Multiple subscription tiers for different user needs.
- **Customizable Components**: Modular and reusable UI components for easy customization.

---

## Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org) (v18 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Clerk API Keys](https://clerk.dev/docs/quickstart)
- [OpenAI API Key](https://platform.openai.com/signup/)
- [Google Gemini API Key](https://cloud.google.com/genai/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/quickscribe.git
   cd quickscribe

2. Install Dependencies
    npm install
    # or
    yarn install

3. Set up environment variables: Create a .env.local file in the root directory and add the following:
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-publishable-key
    CLERK_SECRET_KEY=your-clerk-secret-key
    UPLOADTHING_TOKEN=your-uploadthing-token
    OPENAI_KEY=your-openai-api-key
    GEMINI_API_KEY=your-gemini-api-key

4. Running Development Server
    npm run dev
    #or
    yarn dev

## PROJECT STRUCTURE
.
├── app/                     # Next.js app directory
│   ├── (authenticated-routes)/  # Protected routes
│   ├── api/                 # API routes
│   ├── components/          # Reusable UI components
│   ├── [layout.tsx](http://_vscodecontentref_/0)           # Root layout
│   ├── [page.tsx](http://_vscodecontentref_/1)             # Home page
├── lib/                     # Utility libraries
├── utils/                   # Helper functions
├── public/                  # Static assets
├── [.env.local](http://_vscodecontentref_/2)               # Environment variables
├── [package.json](http://_vscodecontentref_/3)             # Project dependencies
├── [README.md](http://_vscodecontentref_/4)                # Project documentation
└── [tsconfig.json](http://_vscodecontentref_/5)            # TypeScript configuration


## Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.
Create a new branch for your feature or bug fix.
Commit your changes and push the branch.
Open a pull request.