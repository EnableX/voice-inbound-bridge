// core modules
const { request } = require('https');
// modules installed from npm
const btoa = require('btoa');
require('dotenv').config();
// application modules
const logger = require('./logger');

// EnableX server REST API call default options
const httpOptions = {
  host: 'api-qa.enablex.io',
  port: 443,
  headers: {
    Authorization: `Basic ${btoa(`${process.env.ENABLEX_APP_ID}:${process.env.ENABLEX_APP_KEY}`)}`,
    'Content-Type': 'application/json',
  },
};

// To initiate Rest API Call to EnableX Server API
const connectEnablexServer = (data, callback) => {
  logger.info(`REQ URI:- ${httpOptions.method} ${httpOptions.host}:${httpOptions.port}${httpOptions.path}`);
  logger.info(`REQ PARAM:- ${data}`);

  const req = request(httpOptions, (res) => {
    let body = '';
    res.on('data', (response) => {
      body += response;
    });

    res.on('end', () => {
      callback(body);
    });

    res.on('error', (e) => {
      logger.info(`Got error: ${e.message}`);
    });
  });

  if (data == null) {
    req.end();
  } else {
    req.end(data);
  }
};

// Voice API call to play IVR using TTS
function playVoiceIVR(callVoiceId, data, callback) {
  httpOptions.path = `/voice/v1/call/${callVoiceId}/play`;
  httpOptions.method = 'PUT';

  connectEnablexServer(data, (response) => {
    logger.info(`RESPONSE:- ${response}`);
    callback(response);
  });
}

// Voice API to accept incomingcall
function acceptCall(callVoiceId, callback) {
 httpOptions.path = `/voice/v1/call/${callVoiceId}/accept`;
 httpOptions.method = 'PUT';

 connectEnablexServer('', (response) => {
  logger.info(`RESPONSE:- ${response}`);
  callback(response);
 });
}

// Voice API call to play IVR using TTS
function ivrVoiceCall(callVoiceId, ttsPlayVoice, texttoplay, prompt_ref, callback) {
  httpOptions.path = `/voice/v1/call/${callVoiceId}/play`;
  httpOptions.method = 'PUT';

  console.log("inside IVRVOICECALL : " + texttoplay);
  const postData = JSON.stringify({
      //text: 'This is the 1st level menu, Hanging up the call in 10 Sec',
      //asr : true,
      //startTimeout : 10,
      //recognizerTimeout : 1,
      dtmf : true,
      text : texttoplay,//'Thanks we will disconnect the call',
      voice: ttsPlayVoice,
      language: 'en-US',
      prompt_ref: prompt_ref
  });

  connectEnablexServer(postData, (response) => {
    logger.info(`RESPONSE:- ${response}`);
    callback(response);
  });
}

// Voice API to bridge the call
function bridgeCall(callVoiceId, fromNumber , toNumber, callback) {
  httpOptions.path = `/voice/v1/call/${callVoiceId}/connect`;
  httpOptions.method = 'PUT';

  const postData = JSON.stringify({
    from : fromNumber,
    to : toNumber
  });

  connectEnablexServer(postData, (response) => {
    logger.info(`RESPONSE:- ${response}`);
    callback(response);
  });
}


// Voice API call to hangup the call
function hangupCall(callVoiceId, callback) {
  httpOptions.path = `/voice/v1/call/${callVoiceId}`;
  httpOptions.method = 'DELETE';

  connectEnablexServer('', (response) => {
    logger.info(`RESPONSE:- ${response}`);
    callback(response);
  });
}

// Voice API to start the Recording
function startRecording(callVoiceId, recordingName, callback) {
  httpOptions.path = `/voice/v1/call/${callVoiceId}/recording`;
  httpOptions.method = 'PUT';

  const postData = JSON.stringify({
    start : true,
    //recording_name : recordingName
  });

  connectEnablexServer(postData, (response) => {
    logger.info(`RESPONSE:- ${response}`);
    callback(response);
  });
}

// Voice API to stop the Recording
function stopRecording(callVoiceId, callback) {
  httpOptions.path = `/voice/v1/call/${callVoiceId}/recording`;
  httpOptions.method = 'PUT';

  const postData = JSON.stringify({
    stop : true,
  });

  connectEnablexServer(postData, (response) => {
    logger.info(`RESPONSE:- ${response}`);
    callback(response);
  });
}


module.exports = {
  ivrVoiceCall,
  hangupCall,
  bridgeCall,
  acceptCall,
  startRecording,
  stopRecording,
};

