const fs = require('fs');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Cấu hình: API Key của bạn (Nên lấy từ file .env, ở đây dùng biến môi trường)
// Chạy script bằng:
// GEMINI_API_KEY="your_api_key_here" node translate_md.js path/to/file.md
const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error('❌ Lỗi: Vui lòng cung cấp GEMINI_API_KEY trong biến môi trường.');
  console.error('Ví dụ: $env:GEMINI_API_KEY="key_cua_ban"; node translate_md.js docs/File.md');
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

async function translateMarkdown(filePath) {
  try {
    // 1. Kiểm tra đầu vào
    const fullPath = path.resolve(process.cwd(), filePath);
    if (!fs.existsSync(fullPath)) {
      console.error(`❌ Không tìm thấy file: ${fullPath}`);
      process.exit(1);
    }

    const content = fs.readFileSync(fullPath, 'utf8');
    const fileName = path.basename(fullPath);

    console.log(`⏳ Đang dịch file: ${fileName} (${content.length} ký tự)...`);

    // 2. Gửi prompt đến Gemini model (hiện đang dùng flash-1.5, bạn có thể đổi)
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const prompt = `
You are a professional technical translator. Please translate the following Markdown text from Vietnamese to English.
CRITICAL INSTRUCTIONS:
- ONLY output the translated markdown. Do NOT add any extra explanations or conversational text.
- Preserve all Markdown formatting perfectly (headers, code blocks, tables, bold, italic, links).
- Preserve Docusaurus Frontmatter (the section between --- at the top of the file) if it exists, translating only the title and description inside it.
- Keep all code block contents, variables, package names, HTML tags, and command lines intact. Do NOT translate technical terms that should remain in English.

Here is the document to translate:

${content}
`;

    const result = await model.generateContent(prompt);
    const translatedText = result.response.text();

    // 3. Xác định đường dẫn file đầu ra (Lưu vào i18n/en/...)
    // Mặc định Docusaurus lưu file tiếng anh ở: i18n/en/docusaurus-plugin-content-docs/current/
    const isDoc = fullPath.includes(path.join('docs'));
    let outPath = '';

    if (isDoc) {
      const relativePath = path.relative(path.join(process.cwd(), 'docs'), fullPath);
      outPath = path.join(process.cwd(), 'i18n', 'en', 'docusaurus-plugin-content-docs', 'current', relativePath);
    } else {
      // Nếu không nằm trong ./docs, tạo file _{name}_en.md ở cùng thư mục
      outPath = path.join(path.dirname(fullPath), `${path.parse(fileName).name}_en.md`);
    }

    // 4. Lưu file
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    
    // Đảm bảo không bị bọc trong markdown codeblock do AI sinh ra ở 2 đầu
    let finalOutput = translatedText.trim();
    if (finalOutput.startsWith('\`\`\`markdown')) {
      finalOutput = finalOutput.replace(/^\`\`\`markdown\n/, '').replace(/\n\`\`\`$/, '');
    }

    fs.writeFileSync(outPath, finalOutput, 'utf8');

    console.log(`✅ Dịch thành công! Đã lưu tại:`);
    console.log(`👉 ${outPath}`);
    
  } catch (error) {
    console.error('❌ Quá trình dịch thất bại:', error);
  }
}

// Lấy tham số đường dẫn file từ dòng lệnh
const targetFile = process.argv[2];
if (!targetFile) {
  console.error('❌ Lỗi: Vui lòng truyền đường dẫn tới file markdown.');
  console.error('Ví dụ: node translate_md.js docs/intro.md');
  process.exit(1);
}

translateMarkdown(targetFile);
