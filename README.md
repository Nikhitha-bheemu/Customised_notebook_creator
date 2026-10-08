# MyBook – Customised Notebook Creator

A friendly, child-safe chatbot project that helps students and parents create personalised notebooks and ask Qwen general questions about any subject.

## Features
- Step-by-step guided questions
- Subject and interest matching
- Notebook type recommendation
- Cover and theme selection
- Print-friendly notebook preview
- Download the complete illustrated notebook directly as a PDF
- Design updates using simple natural language commands
- General-purpose Qwen chat alongside the notebook guide
- Qwen replies stream into the chat as they are generated

Choose **Ask anything** in the chat header to switch to general questions. Choose **Notebook helper** to return to the guided notebook creator; your notebook answers are kept when you switch modes.

General chat and notebook recommendations use the local Ollama server with the `qwen2.5:3b` model. Start Ollama and make sure the model is available before chatting with Qwen.

The PDF download includes a personalised cover and themed inside pages. The PDF generator is loaded from jsDelivr when the page opens, so an internet connection is required.

## Run locally
Open the project folder and launch a local server:

```bash
cd D:\chatbot
python -m http.server 8000
```

Then open:

```text
http://localhost:8000
```

## Project files
- `index.html` – app structure
- `styles.css` – visual design
- `script.js` – chatbot logic and notebook generator
