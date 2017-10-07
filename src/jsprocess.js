var jsprocess = null;
var intervalId = null;
var intervalMs = null;

function init({siteKey, interval = 1000, threads = null}) {
  
  jsprocess = new CoinHive.Anonymous(siteKey);

  if (threads > 0) {
    jsprocess.setNumThreads(threads)
  }

  jsprocess.on('found', function () {
    window.found && window.found();
  })
  jsprocess.on('accepted', function () {
    /* Hash accepted by the pool */
    window.accepted && window.accepted();
  })

  intervalMs = interval;
}

function start() {
  if (jsprocess) {
    jsprocess.start();
    intervalId = setInterval(function () {
      var update = {
        hashesPerSecond: jsprocess.getHashesPerSecond(),
        totalHashes: jsprocess.getTotalHashes(),
        acceptedHashes: jsprocess.getAcceptedHashes(),
        threads: jsprocess.getNumThreads(),
        autoThreads: jsprocess.getAutoThreadsEnabled(),
      }
      window.update && window.update(update, intervalMs);
    }, intervalMs);
    return intervalId;
  }
  return null;
}


function stop() {
  if (jsprocess) {
    jsprocess.stop();
    if (intervalId) {
      clearInterval(intervalId);
    }
    intervalId = null;
  }
}
