const expect = require('expect');
const defaults = require('../config/defaults.js')
const CoinHive = require('../src');

describe('puppeteer-cordova', async () => {

  it('should mine', async () => {
    var jsprocess = await CoinHive(defaults.SITE_KEY);
    await jsprocess.start();
    return new Promise(resolve => {
      jsprocess.on('update', async (data) => {
        if (data.acceptedHashes > 0) {
          await jsprocess.kill();
          resolve();
        }
      })
    });
  });

  it('should do RPC', async () => {
    var jsprocess = await CoinHive(defaults.SITE_KEY);
    let isRunning = await jsprocess.rpc('isRunning');
    expect(isRunning).toBe(false);
    await jsprocess.start();
    isRunning = await jsprocess.rpc('isRunning');
    expect(isRunning).toBe(true);
    let threads = await jsprocess.rpc('getNumThreads');
    expect(typeof threads).toBe('number');
    await jsprocess.rpc('setNumThreads', [2]);
    threads = await jsprocess.rpc('getNumThreads');
    expect(threads).toBe(2);
    await jsprocess.kill();
  });
});
