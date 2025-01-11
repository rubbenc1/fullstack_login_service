require('dotenv').config();
const axios = require('axios');
const sharp = require('sharp');

const loginUrl = 'http://localhost:4000/auth/login';
const captchaUrl = 'http://localhost:4000/captchas/generate';
const validateCaptchaUrl = 'http://localhost:4000/captchas/validate';

const userData = {
  email: 'ann@gmail.com',
  password: 'Password124!',
};

const API_KEY = process.env.RUCAPTCHA_TOKEN;
if (!API_KEY) {
  throw new Error('RUCAPTCHA_API_KEY is not defined in .env');
}

// Преобразование SVG в PNG и конвертация в base64
async function convertSvgToPngBase64(svgData) {
  const pngBuffer = await sharp(Buffer.from(svgData))
    .png() // Преобразование в PNG
    .toBuffer();
  return pngBuffer.toString('base64');
}

async function solveCaptcha(svgCaptcha) {
  try {
    console.log('Конвертация CAPTCHA в PNG base64...');
    const base64Captcha = await convertSvgToPngBase64(svgCaptcha);

    console.log('Отправка CAPTCHA на RuCaptcha...');
    const createTaskResponse = await axios.post('https://api.rucaptcha.com/createTask', {
      clientKey: API_KEY,
      task: {
        type: 'ImageToTextTask',
        body: base64Captcha,
        phrase: false,
        case: true,
        numeric: 4,
        math: false,
        minLength: 1,
        maxLength: 6,
      },
      languagePool: 'rn',
    });

    const { errorId, taskId } = createTaskResponse.data;
    if (errorId !== 0) {
      throw new Error(`Ошибка создания задачи: ${createTaskResponse.data.errorCode}`);
    }
    console.log(`Задача создана. Task ID: ${taskId}`);

    console.log('Ожидание результата...');
    while (true) {
      const getResultResponse = await axios.post('https://api.rucaptcha.com/getTaskResult', {
        clientKey: API_KEY,
        taskId,
      });

      const { status, solution, errorId: resultErrorId } = getResultResponse.data;

      if (resultErrorId !== 0) {
        throw new Error(`Ошибка получения результата: ${getResultResponse.data.errorCode}`);
      }

      if (status === 'ready') {
        console.log(`CAPTCHA распознана: ${solution.text}`);
        return solution.text;
      }

      console.log('Результат ещё не готов. Ожидание...');
      await new Promise((resolve) => setTimeout(resolve, 5000)); // Ждём 5 секунд
    }
  } catch (error) {
    console.error('Ошибка:', error.response?.data || error.message);
    throw error;
  }
}

async function performLogin() {
  try {
    console.log('Получение CAPTCHA...');
    const captchaResponse = await axios.post(captchaUrl);
    const { svg, id } = captchaResponse.data;

    console.log('Отправка CAPTCHA на распознавание...');
    const captchaText = await solveCaptcha(svg);
    console.log(`Распознанный текст CAPTCHA: ${captchaText}`);

    console.log('Проверка CAPTCHA...');
    const validateCaptcha = await axios.post(validateCaptchaUrl, {
      id,
      input: captchaText,
    });

    if (validateCaptcha.status === 200){
        console.log('CAPTCHA успешно проверена.');
        console.log('Попытка авторизации...');

        const loginResponse = await axios.post(loginUrl, {
            ...userData
        });
        if (loginResponse.status === 200){
            console.log('Авторизация успешна:', loginResponse.data);
        }else {
            console.error('Ошибка авторизации:', loginResponse.data.message);
        }
    }
  } catch (error) {
    console.error('Ошибка:', error.response?.data?.message || error.message);
  }
}

// Запуск
performLogin();
