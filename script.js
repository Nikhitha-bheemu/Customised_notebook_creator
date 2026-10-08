const messagesEl = document.getElementById('messages');
const choicesEl = document.getElementById('choices');
const continueBtn = document.getElementById('continueBtn');
const inputEl = document.getElementById('userInput');
const chatForm = document.getElementById('chatForm');
const resetBtn = document.getElementById('resetBtn');
const generalChatBtn = document.getElementById('generalChatBtn');
const exportPdfBtn = document.getElementById('exportPdfBtn');

const notebookTitleEl = document.getElementById('notebookTitle');
const coverLabelEl = document.getElementById('coverLabel');
const coverPreviewEl = document.getElementById('coverPreview');
const coverEmojiEl = document.getElementById('coverEmoji');
const pagePreviewThemeEl = document.getElementById('pagePreviewTheme');
const pageIllustrationEl = document.getElementById('pageIllustration');
const togglePagesBtn = document.getElementById('togglePagesBtn');
const pagePreviewCardEl = document.getElementById('pagePreviewCard');
const summaryClassEl = document.getElementById('summaryClass');
const summaryPagesEl = document.getElementById('summaryPages');
const summaryFormatEl = document.getElementById('summaryFormat');
const summarySectionsEl = document.getElementById('summarySections');
const summaryCustomisationEl = document.getElementById('summaryCustomisation');

const questionFlow = [
  {
    id: 'ageClass',
    prompt: 'Hi! Let’s create a notebook made especially for you! What class or age group are you in?',
    options: ['Nursery/Pre-school', 'Class 1-2', 'Class 3-4', 'Class 5-6', 'Class 7-8', 'Class 9-10']
  },
  {
    id: 'subjects',
    prompt: 'Great! Which subjects would you like in your notebook?',
    options: ['Maths', 'Science', 'English', 'Art', 'Reading', 'General Knowledge']
  },
  {
    id: 'interests',
    prompt: 'What do you love most—space, animals, sports, dinosaurs, art, or something else?',
    options: ['Space', 'Animals', 'Dinosaurs', 'Sports', 'Cartoons', 'Art', 'Science', 'Other']
  },
  {
    id: 'notebookType',
    prompt: 'Which style of notebook would you like?',
    options: ['School Notebook', 'Drawing Notebook', 'Math Practice Book', 'Story Notebook', 'Activity Book', 'My Personal Journal']
  },
  {
    id: 'theme',
    prompt: 'Pick a cover theme or tell me your favourite colours.',
    options: ['Space Explorer', 'Rainbow Fun', 'Ocean Adventure', 'Forest Friends', 'Super Hero', 'Fantasy Galaxy']
  }
];

const state = {
  currentStep: 0,
  answers: {
    ageClass: '',
    subjects: [],
    interests: [],
    notebookType: '',
    theme: '',
    childName: '',
    colors: 'Blue and Pink'
  },
  notebook: {
    title: 'My Special Notebook',
    format: 'Ruled notes + drawing pages + activity tasks',
    pageCount: 36,
    sections: ['Vocabulary Box', 'Practice Tasks', 'Drawing Corner'],
    cover: 'Space Explorer',
    customisation: 'Name + favourite colours + themed stickers'
  }
};

const themeArtMap = {
  'Space Explorer': {
    className: 'theme-space',
    emoji: '🚀',
    label: 'Space theme',
    svg: '<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><circle cx="56" cy="18" r="10" fill="#ffd76a"/><circle cx="18" cy="26" r="4" fill="#fef3c7"/><circle cx="66" cy="40" r="3" fill="#fef3c7"/><circle cx="26" cy="16" r="3" fill="#fef3c7"/><path d="M22 56 L40 42 L58 56 L40 66 Z" fill="#8ec5ff"/><path d="M40 40 L52 48 L40 60 L28 48 Z" fill="#cfeaff"/><path d="M34 50 L40 45 L46 50 L40 55 Z" fill="#0f172a"/><path d="M40 31 L46 38 L40 42 L34 38 Z" fill="#ffffff"/></svg>'
  },
  'Rainbow Fun': {
    className: 'theme-rainbow',
    emoji: '🌈',
    label: 'Rainbow theme',
    svg: '<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><path d="M10 52 C22 25, 58 25, 70 52" stroke="#ff5fa2" stroke-width="8" fill="none"/><path d="M10 58 C22 34, 58 34, 70 58" stroke="#ffbf69" stroke-width="8" fill="none"/><path d="M10 64 C22 43, 58 43, 70 64" stroke="#8be9a8" stroke-width="8" fill="none"/><circle cx="40" cy="61" r="8" fill="#fef3c7"/><path d="M18 64 H62" stroke="#6c63ff" stroke-width="5" stroke-linecap="round"/></svg>'
  },
  'Ocean Adventure': {
    className: 'theme-ocean',
    emoji: '🌊',
    label: 'Ocean theme',
    svg: '<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><path d="M0 60 C18 52, 30 52, 40 58 C52 65, 60 63, 80 54 V80 H0 Z" fill="#79d7ff"/><path d="M0 66 C18 60, 30 62, 40 68 C56 75, 64 72, 80 66 V80 H0 Z" fill="#3aa7d8"/><circle cx="22" cy="20" r="8" fill="#fff9c9"/><path d="M22 26 L30 38 L22 52 L14 38 Z" fill="#7dd3fc"/><path d="M50 22 L56 32 L50 46 L44 32 Z" fill="#d7f8ff"/></svg>'
  },
  'Forest Friends': {
    className: 'theme-forest',
    emoji: '🌳',
    label: 'Forest theme',
    svg: '<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><path d="M0 58 L80 58 L80 80 L0 80 Z" fill="#9ad88a"/><path d="M18 58 L26 30 L34 58 Z" fill="#3e8c42"/><path d="M30 58 L42 24 L54 58 Z" fill="#4ea55b"/><path d="M50 58 L60 34 L70 58 Z" fill="#2a7d3b"/><circle cx="18" cy="20" r="10" fill="#fcd34d"/><circle cx="60" cy="16" r="8" fill="#fde68a"/></svg>'
  },
  'Super Hero': {
    className: 'theme-superhero',
    emoji: '🦸',
    label: 'Superhero theme',
    svg: '<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><path d="M40 14 L57 25 L57 49 L40 60 L23 49 L23 25 Z" fill="#facc15"/><path d="M27 48 L40 32 L53 48" stroke="#1f2937" stroke-width="5" fill="none"/><circle cx="40" cy="34" r="8" fill="#fff"/><path d="M36 26 L40 18 L44 26" fill="#fff"/><path d="M19 60 H61" stroke="#1f2937" stroke-width="6" stroke-linecap="round"/></svg>'
  },
  'Fantasy Galaxy': {
    className: 'theme-fantasy',
    emoji: '✨',
    label: 'Fantasy theme',
    svg: '<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg"><circle cx="62" cy="18" r="10" fill="#d8b4fe"/><circle cx="20" cy="20" r="6" fill="#fdf2f8"/><circle cx="38" cy="44" r="12" fill="#a78bfa"/><path d="M40 12 L46 30 L64 30 L49 41 L55 60 L40 47 L25 60 L31 41 L16 30 L34 30 Z" fill="#f9a8d4" opacity="0.9"/><path d="M18 64 C28 52, 52 52, 64 64" stroke="#fef3c7" stroke-width="6" fill="none"/></svg>'
  }
};

const QWEN_ENDPOINTS = ['http://localhost:11434/api/chat'];
const QWEN_MODEL = 'qwen2.5:3b';
const GENERAL_CHAT_SYSTEM_PROMPT = 'You are a helpful, friendly, child-safe general-purpose assistant. Answer questions about any subject, not only notebooks. Explain things clearly and accurately. Keep the first answer brief and direct unless the user asks for detail, and say when you are unsure.';

let generalChatMode = false;
let generalChatHistory = [{ role: 'system', content: GENERAL_CHAT_SYSTEM_PROMPT }];

async function callQwen(prompt, { onToken, options } = {}) {
  let lastError = null;

  for (const url of QWEN_ENDPOINTS) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: QWEN_MODEL,
          stream: typeof onToken === 'function',
          keep_alive: '10m',
          ...(options ? { options } : {}),
          messages: Array.isArray(prompt) ? prompt : [{
            role: 'user',
            content: prompt
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      if (typeof onToken === 'function') {
        if (!response.body) {
          throw new Error('Streaming is not supported by this browser.');
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        let content = '';

        const processLine = (line) => {
          if (!line.trim()) return;
          const data = JSON.parse(line);
          if (data.error) throw new Error(data.error);
          const token = data.message?.content || data.choices?.[0]?.delta?.content || '';
          if (token) {
            content += token;
            onToken(content);
          }
        };

        while (true) {
          const { done, value } = await reader.read();
          buffer += decoder.decode(value || new Uint8Array(), { stream: !done });
          const lines = buffer.split('\n');
          buffer = lines.pop() || '';
          lines.forEach(processLine);
          if (done) break;
        }
        processLine(buffer);

        if (content) return content.trim();
        throw new Error('Qwen returned an empty response.');
      }

      const data = await response.json();

      if (data.message && typeof data.message.content === 'string') {
        return data.message.content.trim();
      }

      if (typeof data.response === 'string') {
        return data.response.trim();
      }

      if (Array.isArray(data.choices) && data.choices[0]?.message?.content) {
        return String(data.choices[0].message.content).trim();
      }
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError || new Error('Could not contact the local Qwen server.');
}

function updateThemeVisual(theme) {
  const themeData = themeArtMap[theme] || themeArtMap['Space Explorer'];

  coverLabelEl.textContent = theme;
  coverEmojiEl.textContent = themeData.emoji;
  pagePreviewThemeEl.textContent = themeData.label;
  pageIllustrationEl.innerHTML = themeData.svg;

  const themeClasses = Object.values(themeArtMap).map((item) => item.className);
  coverPreviewEl.classList.remove(...themeClasses);
  coverPreviewEl.classList.add(themeData.className);
}

function pdfColor(hex) {
  const value = hex.replace('#', '');
  const { rgb } = PDFLib;
  return rgb(
    parseInt(value.slice(0, 2), 16) / 255,
    parseInt(value.slice(2, 4), 16) / 255,
    parseInt(value.slice(4, 6), 16) / 255
  );
}

function pdfSafeText(value) {
  return String(value)
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\x20-\x7E]/g, '');
}

async function svgToPngBytes(svg) {
  const image = new Image();
  const canvas = document.createElement('canvas');
  canvas.width = 320;
  canvas.height = 320;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('Could not prepare the notebook illustrations.');

  image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  await image.decode();
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  const data = atob(canvas.toDataURL('image/png').split(',')[1]);
  return Uint8Array.from(data, (character) => character.charCodeAt(0));
}

function drawPdfText(page, text, x, y, options = {}) {
  const { font, size = 12, color = pdfColor('#26324B'), maxWidth } = options;
  page.drawText(pdfSafeText(text), {
    x,
    y,
    size,
    font,
    color,
    maxWidth,
    lineHeight: size * 1.35
  });
}

async function createNotebookPdf() {
  if (!window.PDFLib) {
    throw new Error('The PDF generator could not load. Check your internet connection and reload the page.');
  }

  const { PDFDocument, StandardFonts } = PDFLib;
  const pdf = await PDFDocument.create();
  const regularFont = await pdf.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdf.embedFont(StandardFonts.HelveticaBold);
  const theme = state.answers.theme || state.notebook.cover || 'Space Explorer';
  const themeData = themeArtMap[theme] || themeArtMap['Space Explorer'];
  const name = state.answers.childName || 'Your Child';
  const subjects = state.answers.subjects.length ? state.answers.subjects : ['Maths', 'Science', 'Art'];
  const interests = state.answers.interests.length ? state.answers.interests : ['Space', 'Art'];
  const type = state.answers.notebookType || 'School Notebook';
  const sections = state.notebook.sections.length ? state.notebook.sections : ['Notes', 'Practice Tasks', 'Drawing Corner'];
  const pageCount = Math.max(2, state.notebook.pageCount || 36);
  const coverTitle = state.notebook.title === 'My Special Notebook'
    ? `${name}'s ${theme} Notebook`
    : state.notebook.title || `${name}'s ${theme} Notebook`;
  pdf.setTitle(pdfSafeText(coverTitle));
  pdf.setAuthor('MyBook');
  const themeColors = {
    'Space Explorer': ['#6D7DFF', '#D8F4FF'],
    'Rainbow Fun': ['#FF8AB3', '#88E4BF'],
    'Ocean Adventure': ['#3DB0D4', '#D8F5FF'],
    'Forest Friends': ['#70BF63', '#EFFAD8'],
    'Super Hero': ['#FF6659', '#FFD96D'],
    'Fantasy Galaxy': ['#715EF4', '#EFD6FF']
  };
  const [coverColor, paleColor] = themeColors[theme] || themeColors['Space Explorer'];
  const illustration = await pdf.embedPng(await svgToPngBytes(themeData.svg));
  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const margin = 54;
  const totalPages = pageCount;

  const cover = pdf.addPage([pageWidth, pageHeight]);
  cover.drawRectangle({ x: 0, y: 0, width: pageWidth, height: pageHeight, color: pdfColor(coverColor) });
  cover.drawCircle({ x: pageWidth - 58, y: pageHeight - 48, size: 125, color: pdfColor(paleColor), opacity: 0.38 });
  cover.drawCircle({ x: 62, y: 70, size: 95, color: pdfColor(paleColor), opacity: 0.28 });
  drawPdfText(cover, 'MYBOOK - MADE JUST FOR YOU', margin, pageHeight - 100, { font: boldFont, size: 12, color: PDFLib.rgb(1, 1, 1) });
  drawPdfText(cover, coverTitle, margin, pageHeight - 190, { font: boldFont, size: 30, color: PDFLib.rgb(1, 1, 1), maxWidth: pageWidth - margin * 2 });
  drawPdfText(cover, `Created for ${name}`, margin, pageHeight - 240, { font: regularFont, size: 18, color: PDFLib.rgb(1, 1, 1), maxWidth: pageWidth - margin * 2 });
  cover.drawImage(illustration, { x: (pageWidth - 190) / 2, y: 300, width: 190, height: 190 });
  drawPdfText(cover, `${state.answers.ageClass || 'Class 3'}  |  ${type}`, margin, 230, { font: boldFont, size: 14, color: PDFLib.rgb(1, 1, 1), maxWidth: pageWidth - margin * 2 });
  drawPdfText(cover, `${theme}  |  ${subjects.join(', ')}`, margin, 196, { font: regularFont, size: 12, color: PDFLib.rgb(1, 1, 1), maxWidth: pageWidth - margin * 2 });

  for (let pageNumber = 2; pageNumber <= totalPages; pageNumber += 1) {
    const page = pdf.addPage([pageWidth, pageHeight]);
    const subject = subjects[(pageNumber - 2) % subjects.length];
    const interest = interests[(pageNumber - 2) % interests.length];
    const section = sections[(pageNumber - 2) % sections.length];
    const headerY = pageHeight - 76;

    page.drawRectangle({ x: 0, y: pageHeight - 12, width: pageWidth, height: 12, color: pdfColor(coverColor) });
    drawPdfText(page, section, margin, headerY + 19, { font: boldFont, size: 10, color: pdfColor(coverColor), maxWidth: pageWidth - margin * 2 - 52 });
    drawPdfText(page, `${subject} ${pageNumber % 3 === 0 ? 'Challenge' : 'Page'}`, margin, headerY - 5, { font: boldFont, size: 21, color: pdfColor('#26324B'), maxWidth: pageWidth - margin * 2 - 52 });
    page.drawImage(illustration, { x: pageWidth - margin - 42, y: headerY - 15, width: 42, height: 42 });
    page.drawLine({ start: { x: margin, y: headerY - 25 }, end: { x: pageWidth - margin, y: headerY - 25 }, thickness: 1.5, color: pdfColor(paleColor) });
    drawPdfText(page, `${name}'s ${theme} notebook`, margin, headerY - 48, { font: regularFont, size: 10, color: pdfColor('#68738A') });

    let contentY = headerY - 100;
    const prompt = type === 'Drawing Notebook' || pageNumber % 5 === 0
      ? `Draw your own ${interest.toLowerCase()} adventure!`
      : type === 'Math Practice Book'
        ? `Solve these ${subject} challenges.`
        : type === 'Story Notebook'
          ? `Story starter: One day, a ${interest.toLowerCase()} found a mysterious map...`
          : type === 'My Personal Journal'
            ? 'Today I felt ______ because ______.'
            : pageNumber % 4 === 0
              ? `Quick ${subject} challenge: write or draw three things about ${interest.toLowerCase()}.`
              : `Use this page for your ${subject} ideas and notes.`;
    drawPdfText(page, prompt, margin, contentY, { font: boldFont, size: 14, color: pdfColor('#26324B'), maxWidth: pageWidth - margin * 2 });
    contentY -= 38;

    if (type === 'Drawing Notebook' || pageNumber % 5 === 0) {
      page.drawRectangle({
        x: margin,
        y: 105,
        width: pageWidth - margin * 2,
        height: contentY - 105,
        borderColor: pdfColor(coverColor),
        borderWidth: 1.5,
        borderDashArray: [6, 4]
      });
      page.drawImage(illustration, { x: pageWidth - margin - 64, y: 120, width: 48, height: 48, opacity: 0.45 });
    } else if (type === 'Math Practice Book') {
      for (let index = 0; index < 6; index += 1) {
        const y = contentY - 34 - index * 82;
        drawPdfText(page, `${index + 1}.  __________  =  __________`, margin + 8, y, { font: regularFont, size: 14, color: pdfColor('#26324B') });
        page.drawLine({ start: { x: margin, y: y - 20 }, end: { x: pageWidth - margin, y: y - 20 }, thickness: 0.7, color: pdfColor(paleColor) });
      }
    } else {
      const lineCount = type === 'My Personal Journal' ? 12 : 13;
      for (let index = 0; index < lineCount; index += 1) {
        const y = contentY - 22 - index * 43;
        page.drawLine({ start: { x: margin, y }, end: { x: pageWidth - margin, y }, thickness: 0.7, color: pdfColor('#B8C8EA') });
      }
      if (type === 'My Personal Journal') {
        page.drawImage(illustration, { x: (pageWidth - 44) / 2, y: 176, width: 44, height: 44, opacity: 0.8 });
      }
    }

    page.drawLine({ start: { x: margin, y: 55 }, end: { x: pageWidth - margin, y: 55 }, thickness: 0.7, color: pdfColor(paleColor) });
    drawPdfText(page, type, margin, 36, { font: regularFont, size: 9, color: pdfColor('#75809A') });
    drawPdfText(page, `${pageNumber} / ${totalPages}`, pageWidth - margin - 48, 36, { font: regularFont, size: 9, color: pdfColor('#75809A') });
  }

  return pdf.save();
}

async function exportNotebookPdf() {
  exportPdfBtn.disabled = true;
  exportPdfBtn.textContent = 'Creating PDF...';

  try {
    const pdfBytes = await createNotebookPdf();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const safeName = (state.answers.childName || 'MyBook').replace(/[^a-z0-9_-]/gi, '_');
    link.href = url;
    link.download = `${safeName}_notebook.pdf`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 60000);
    addMessage(`Your PDF has been downloaded to your Downloads folder as "${link.download}".`, 'bot');
  } catch (error) {
    addMessage(`I could not create the PDF: ${error.message}`, 'bot');
  } finally {
    exportPdfBtn.disabled = false;
    exportPdfBtn.textContent = 'Download Notebook PDF';
  }
}

function addMessage(text, role = 'bot') {
  const message = document.createElement('div');
  message.className = `message ${role}`;
  message.textContent = text;
  messagesEl.appendChild(message);
  messagesEl.scrollTop = messagesEl.scrollHeight;
  return message;
}

function renderChoices(options) {
  choicesEl.innerHTML = '';
  const isMultiSelect = ['subjects', 'interests'].includes(questionFlow[state.currentStep]?.id);

  options.forEach((option) => {
    const button = document.createElement('button');
    button.className = 'choice-btn';
    button.type = 'button';
    button.textContent = option;

    if (isMultiSelect && state.answers[questionFlow[state.currentStep].id].includes(option)) {
      button.classList.add('selected');
    }

    button.addEventListener('click', () => {
      if (isMultiSelect) {
        handleMultiChoice(option);
      } else {
        handleChoice(option);
      }
    });

    choicesEl.appendChild(button);
  });

  if (isMultiSelect) {
    continueBtn.classList.remove('hidden');
  } else {
    continueBtn.classList.add('hidden');
  }
}

function handleMultiChoice(option) {
  const field = questionFlow[state.currentStep].id;
  const values = state.answers[field];
  const exists = values.includes(option);

  if (exists) {
    state.answers[field] = values.filter((item) => item !== option);
  } else {
    state.answers[field].push(option);
  }

  const selectedButtons = [...document.querySelectorAll('.choice-btn')];
  for (const button of selectedButtons) {
    if (button.textContent === option) {
      button.classList.toggle('selected');
    }
  }

  if (state.answers[field].length > 0) {
    continueBtn.classList.remove('hidden');
  } else {
    continueBtn.classList.add('hidden');
  }
}

function moveToNextStep() {
  const current = questionFlow[state.currentStep];
  if (!current) return;

  const field = current.id;
  if (['subjects', 'interests'].includes(field)) {
    const selected = state.answers[field];
    if (selected.length === 0) {
      addMessage('Please choose at least one option before moving on.', 'bot');
      return;
    }
  }

  continueBtn.classList.add('hidden');
  addMessage(state.answers[field] || current.options[0], 'user');
  state.currentStep += 1;
  choicesEl.innerHTML = '';

  if (state.currentStep < questionFlow.length) {
    askNextQuestion();
  } else {
    askForName();
  }
}

continueBtn.addEventListener('click', moveToNextStep);

function askNextQuestion() {
  const current = questionFlow[state.currentStep];
  if (!current) {
    generateNotebookSummary();
    return;
  }

  addMessage(current.prompt, 'bot');
  renderChoices(current.options);
}

function handleChoice(option) {
  const currentStep = questionFlow[state.currentStep];
  if (!currentStep) return;

  const field = currentStep.id;
  state.answers[field] = option;
  addMessage(option, 'user');
  state.currentStep += 1;
  choicesEl.innerHTML = '';

  if (state.currentStep < questionFlow.length) {
    askNextQuestion();
  } else {
    askForName();
  }
}

function askForName() {
  addMessage('Fantastic! I have enough to design your notebook. What is the child’s name you want on the cover?', 'bot');
  choicesEl.innerHTML = '';
}

function parseCustomCommand(input) {
  const text = input.toLowerCase();
  const updates = [];

  if (text.includes('space') || text.includes('galaxy')) {
    state.answers.theme = 'Space Explorer';
    updates.push('Space theme');
  }

  if (text.includes('rainbow') || text.includes('colour') || text.includes('colors') || text.includes('colourful')) {
    state.answers.theme = 'Rainbow Fun';
    updates.push('Rainbow Fun theme');
  }

  if (text.includes('change the theme')) {
    state.answers.theme = state.answers.theme || 'Fantasy Galaxy';
    updates.push('theme updated');
  }

  if (text.includes('make it for class')) {
    const match = input.match(/class\s*(\d+)/i);
    if (match) {
      state.answers.ageClass = `Class ${match[1]}`;
      updates.push(`Class ${match[1]}`);
    }
  }

  if (text.includes('drawing pages') || text.includes('more drawing')) {
    state.notebook.format = 'Lots of drawing pages, doodle sections, and picture prompts';
    state.notebook.sections.push('Extra Drawing Corner');
    updates.push('more drawing pages');
  }

  if (text.includes('school notebook')) {
    state.answers.notebookType = 'School Notebook';
    updates.push('School Notebook style');
  }

  if (text.includes('math') || text.includes('maths')) {
    state.answers.notebookType = 'Math Practice Book';
    updates.push('Math Practice Book style');
  }

  if (text.includes('journal')) {
    state.answers.notebookType = 'My Personal Journal';
    updates.push('personal journal style');
  }

  if (text.includes('story')) {
    state.answers.notebookType = 'Story Notebook';
    updates.push('storybook style');
  }

  if (text.includes('activity')) {
    state.answers.notebookType = 'Activity Book';
    updates.push('activity book style');
  }

  return updates;
}

function generateNotebookSummary() {
  const ageClass = state.answers.ageClass || 'Class 3';
  const subjects = state.answers.subjects.length ? state.answers.subjects.join(', ') : 'Maths and Science';
  const interests = state.answers.interests.length ? state.answers.interests.join(', ') : 'Space and Art';
  const type = state.answers.notebookType || 'School Notebook';
  const theme = state.answers.theme || 'Space Explorer';
  const name = state.answers.childName || 'Your Child';

  const basePageCount = ageClass.includes('Class 7') || ageClass.includes('Class 8') || ageClass.includes('Class 9') || ageClass.includes('Class 10') ? 64 : ageClass.includes('Class 5') || ageClass.includes('Class 6') ? 48 : 36;
  const pageCount = Math.max(24, basePageCount + (state.notebook.sections.length > 4 ? 8 : 0));

  state.notebook.title = `${name}'s ${theme} Notebook`;
  state.notebook.cover = theme;
  state.notebook.pageCount = pageCount;
  state.notebook.format = `${type} with ruled notes, creative pages, and ${subjects.toLowerCase()} activities`;
  state.notebook.sections = [
    `Vocabulary & ${subjects.split(',')[0]} words`,
    'Drawing and Doodle Corner',
    'Activity Challenge Page',
    'Quick Quiz Section'
  ];
  state.notebook.customisation = `${name}'s name, favourite colours, ${theme} illustration, and a fun cover sticker area`;

  notebookTitleEl.textContent = state.notebook.title;
  updateThemeVisual(theme);
  summaryClassEl.textContent = ageClass;
  summaryPagesEl.textContent = String(pageCount);
  summaryFormatEl.textContent = state.notebook.format;
  summarySectionsEl.innerHTML = state.notebook.sections.map((s) => `<li>${s}</li>`).join('');
  summaryCustomisationEl.textContent = state.notebook.customisation;

  const coverGradient = {
    'Space Explorer': 'linear-gradient(135deg, #7a8cff, #7ed7ff 35%, #c5f0ff 100%)',
    'Rainbow Fun': 'linear-gradient(135deg, #ff9dbb, #ffd36a 30%, #8de3c5 100%)',
    'Ocean Adventure': 'linear-gradient(135deg, #5ac8fa, #4ec0a6 35%, #d2f6ff 100%)',
    'Forest Friends': 'linear-gradient(135deg, #8cc26b, #dbef86 35%, #ecfdd7 100%)',
    'Super Hero': 'linear-gradient(135deg, #ff6868, #ffb36e 35%, #ffd86f 100%)',
    'Fantasy Galaxy': 'linear-gradient(135deg, #6e5ef2, #a284ff 35%, #ffd7f9 100%)'
  };

  const coverStyle = coverGradient[theme] || 'linear-gradient(135deg, #7a8cff, #8dc7ff 100%)';
  document.getElementById('coverPreview').style.background = coverStyle;

  const aiPrompt = `You are MyBook, a warm and child-safe notebook designer. Recommend a personalised notebook for a child with these details: class/age: ${ageClass}, subjects: ${subjects}, interests: ${interests}, notebook type: ${type}, cover theme: ${theme}, child name: ${name}. Keep the response short, friendly, and practical. Mention the cover style, page layout, sections, and some fun activities. Do not use markdown tables.`;

  addMessage(`Great choice! I recommend a ${theme} notebook for ${name}. It is perfect for ${subjects} and ${interests}. The notebook includes ${type.toLowerCase()} pages, creative drawing prompts, practice activities, and a custom cover with ${name}'s name and favourite colours.`, 'bot');

  callQwen(aiPrompt)
    .then((aiText) => {
      const cleanText = aiText.replace(/\s+/g, ' ').trim();
      addMessage(cleanText, 'bot');
    })
    .catch(() => {
      addMessage('Qwen is not available right now, so I am using the built-in recommendation flow. You can still customise the notebook theme, class level, and page mix.', 'bot');
    });
}

async function handleSubmit(event) {
  event.preventDefault();
  const input = inputEl.value.trim();
  if (!input) return;

  addMessage(input, 'user');
  inputEl.value = '';

  if (generalChatMode) {
    generalChatHistory.push({ role: 'user', content: input });
    const sendButton = chatForm.querySelector('button[type="submit"]');
    sendButton.disabled = true;
    let replyEl;

    try {
      replyEl = addMessage('Thinking...', 'bot');
      const qwenReply = await callQwen(generalChatHistory, {
        options: { num_predict: 160 },
        onToken: (text) => {
          replyEl.textContent = text;
          messagesEl.scrollTop = messagesEl.scrollHeight;
        }
      });
      generalChatHistory.push({ role: 'assistant', content: qwenReply });
    } catch (error) {
      if (replyEl) replyEl.remove();
      generalChatHistory.pop();
      addMessage(`I could not get a reply from Qwen: ${error.message}. Please check that Ollama is running with the qwen2.5:3b model, then try again.`, 'bot');
    } finally {
      sendButton.disabled = false;
      inputEl.focus();
    }
    return;
  }

  if (!state.answers.childName && state.currentStep >= questionFlow.length) {
    state.answers.childName = input;
    addMessage(`Thanks, ${input}! I’m ready to design your notebook.`, 'bot');
    generateNotebookSummary();
    return;
  }

  const customUpdates = parseCustomCommand(input);

  if (customUpdates.length > 0) {
    addMessage(`Absolutely! I’ll update it to include ${customUpdates.join(', ')}.`, 'bot');
    generateNotebookSummary();
    return;
  }

  if (state.currentStep < questionFlow.length) {
    handleChoice(input);
    return;
  }

  try {
    const qwenReply = await callQwen(`You are MyBook, a playful notebook designer. The user says: "${input}". Based on the current notebook profile: class/age ${state.answers.ageClass || 'Class 3'}, subjects ${state.answers.subjects.length ? state.answers.subjects.join(', ') : 'Maths and Science'}, interests ${state.answers.interests.length ? state.answers.interests.join(', ') : 'Space and art'}, notebook type ${state.answers.notebookType || 'School Notebook'}, theme ${state.answers.theme || 'Space Explorer'}. Reply with a friendly design suggestion and a simple next step. Keep it short and child-safe.`);
    addMessage(qwenReply, 'bot');
  } catch (error) {
    addMessage('Nice! I can make it more fun by adding drawing pages, changing the theme, or choosing a different class level. Say something like “use a space theme” or “add more drawing pages.”', 'bot');
  }
}

chatForm.addEventListener('submit', handleSubmit);
resetBtn.addEventListener('click', resetChat);
generalChatBtn.addEventListener('click', toggleGeneralChatMode);
exportPdfBtn.addEventListener('click', exportNotebookPdf);
togglePagesBtn.addEventListener('click', () => {
  pagePreviewCardEl.classList.toggle('collapsed');
  togglePagesBtn.textContent = pagePreviewCardEl.classList.contains('collapsed') ? 'Open' : 'Close';
});

function resetChat() {
  generalChatMode = false;
  generalChatHistory = [{ role: 'system', content: GENERAL_CHAT_SYSTEM_PROMPT }];
  generalChatBtn.textContent = 'Ask anything';
  generalChatBtn.classList.remove('active');
  generalChatBtn.setAttribute('aria-pressed', 'false');
  inputEl.placeholder = "Type your answer or say, 'use a space theme'...";
  state.currentStep = 0;
  state.answers = {
    ageClass: '',
    subjects: [],
    interests: [],
    notebookType: '',
    theme: '',
    childName: '',
    colors: 'Blue and Pink'
  };
  state.notebook = {
    title: 'My Special Notebook',
    format: 'Ruled notes + drawing pages + activity tasks',
    pageCount: 36,
    sections: ['Vocabulary Box', 'Practice Tasks', 'Drawing Corner'],
    cover: 'Space Explorer',
    customisation: 'Name + favourite colours + themed stickers'
  };

  messagesEl.innerHTML = '';
  choicesEl.innerHTML = '';
  continueBtn.classList.add('hidden');
  notebookTitleEl.textContent = 'My Special Notebook';
  updateThemeVisual('Space Explorer');
  summaryClassEl.textContent = 'Class 3';
  summaryPagesEl.textContent = '36';
  summaryFormatEl.textContent = 'Ruled pages, drawing pages, and activity tasks.';
  summarySectionsEl.innerHTML = '<li>Vocabulary Box</li><li>Practice Tasks</li><li>Drawing Corner</li>';
  summaryCustomisationEl.textContent = 'Name, favourite colours, and cover design.';
  document.getElementById('coverPreview').style.background = 'linear-gradient(135deg, #cce8ff, #d5f0f6 25%, #f7d6ff 100%)';

  addMessage('Hi! Let’s create a notebook made especially for you! What class are you studying in?', 'bot');
  renderChoices(questionFlow[0].options);
}

function toggleGeneralChatMode() {
  generalChatMode = !generalChatMode;
  messagesEl.innerHTML = '';
  choicesEl.innerHTML = '';
  continueBtn.classList.add('hidden');
  generalChatBtn.textContent = generalChatMode ? 'Notebook helper' : 'Ask anything';
  generalChatBtn.classList.toggle('active', generalChatMode);
  generalChatBtn.setAttribute('aria-pressed', String(generalChatMode));

  if (generalChatMode) {
    inputEl.placeholder = 'Ask me anything...';
    addMessage('Ask me anything! I can help with school subjects, science, stories, everyday questions, and more.', 'bot');
    inputEl.focus();
    return;
  }

  inputEl.placeholder = "Type your answer or say, 'use a space theme'...";
  if (state.currentStep < questionFlow.length) {
    askNextQuestion();
  } else if (!state.answers.childName) {
    askForName();
  } else {
    addMessage('Welcome back to your notebook! Ask me to change the design, or start again to create a new one.', 'bot');
  }
}

resetChat();
