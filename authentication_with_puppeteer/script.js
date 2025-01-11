require('dotenv').config();
const puppeteer = require('puppeteer');
const axios = require('axios');
const sharp = require('sharp');

const userData = {
  email: 'ann@gmail.com',
  password: 'Password124!',
};

const API_KEY = process.env.RUCAPTCHA_TOKEN;
if (!API_KEY) {
  throw new Error('RUCAPTCHA_TOKEN is not defined in .env');
}

async function solveCaptcha(base64Captcha) {
  try {
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
        return solution.text;
      }

      await new Promise((resolve) => setTimeout(resolve, 5000)); // Ждём 5 секунд
    }
  } catch (error) {
    throw new Error('Ошибка решения CAPTCHA: ' + (error.response?.data?.message || error.message));
  }
}

async function performLogin(){
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();

    try {
        await page.goto('http://localhost:8080/login');
        await page.type('input[id="email"]', userData.email);
        await page.type('input[id="password"]', userData.password);

        const captchaElement = await page.$('svg');
        const captchaSvg = await captchaElement.evaluate((el) => el.outerHTML);
        
        const pngBuffer = await sharp(Buffer.from(captchaSvg)).png().toBuffer();
        const base64Captcha = pngBuffer.toString('base64');

        const captchaText = await solveCaptcha(base64Captcha);
        if (!captchaText) {
            throw new Error('Failed to solve CAPTCHA.');
        }
        console.log('CAPTCHA recognized:', captchaText);
        await page.type('input[id="captcha"]', captchaText);
        console.log('Submitting the form...');
        await page.click('button[type="submit"]');
        
        if (!(await page.$('p.error'))) {
          console.log('Login successful: Successfully authorized');
        } else {
          throw new Error('Login failed: Success message not found.');
        }
    } catch(error){
        console.error('Error during login process:', error.message);
    } finally {
        console.log('Closing browser...');
        await browser.close();
    }
}

performLogin();