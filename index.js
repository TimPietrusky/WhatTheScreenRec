const puppeteer = require('puppeteer')
const { PuppeteerScreenRecorder } = require('puppeteer-screen-recorder');
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')
const argv = yargs(hideBin(process.argv)).argv

const sleep = m => new Promise(r => setTimeout(r, m));

const width = 1024 || argv.width
const height = 1024 || argv.height

const Config = {
  followNewTab: false,
  fps: 60,
  recordDurationLimit: 15,
  // format: 'jpg',
  videoFrame: {
    width,
    height,
  },
  // ffmpeg_Path: '/opt/homebrew/bin/ffmpeg',
  videoCrf: 0,
  quality: 100,
  videoCodec: 'libx264',
  // videoCodec: 'libx264rgb',
  // videoPixelFormat: 'rgb24',
  videoPreset: 'veryslow',
  videoBitrate: 16000,
  autopad: {
    color: 'black' | '#35A5FF',
  },
  aspectRatio: '4:4',
};

(async () => {
  let browser = undefined;
  let page = undefined;

  if (!argv.screenshot && !argv.video) {
    console.log('specify -screenshot or -video so that something happens')
  } else {
    console.log('starting')

    browser = await puppeteer.launch({args: ['--use-gl=egl']});
    page = await browser.newPage();
  
    await page.goto('http://localhost:8080?preview=1');
  
    // Set screen size
    await page.setViewport({width, height});
  }

  if (argv.screenshot) {
    for(let i = 0; i < 20; i++) {
      console.log("sleep for 20s")
      await sleep(20000)
    
      await page.screenshot({
        path: `screenshot-v4-${i}.png`
      });
  
      await page.reload()
    }

    await browser.close();
  }

  if (argv.video) {
    const recorder = new PuppeteerScreenRecorder(page, Config);
    const savePath = './demo2.mp4';

    await sleep(4000)
    await page.reload();
    await recorder.start(savePath);
    

    setTimeout(async () => {
      await recorder.stop();
      await browser.close();
    }, 15000)
  }
})();
