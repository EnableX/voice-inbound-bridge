# **Basic Client Examples to demonstrate Inbound Calls using Enablex Voice APIs. **
This example contains instructions how users can initiate Inbound Calls.


## Pre-requisite
- You will need Enablex Application credentials, APP ID and APP KEY.
- You will need a place for hosting this application either cloud or local machine.
- If hosting on local machine, you need to install ngrok from https://ngrok.com/


## Installation
- `git clone https://github.com/EnableX/voice-api-inbound-ivr.git`
- `cd voice-api-inbound-ivr`
- `npm install`


## Setting up configurations using environment variables

For Mac and Linux, open a terminal window and type the following commands. Note - Replace all the characters after the = with values from your EnableX account:

- Set APP ID and APP KEY. It is required configuration.
  - `export ENABLEX_APP_ID=`
  - `export ENABLEX_APP_KEY=`

- Set port. Default port is set to 3000. It is an optional configuration.
  - `export SERVICE_PORT=`

- WEBHOOK - EnableX will send HTTP (or HTTPS) requests to your application after certain events occur
  - It is an optional configuration.
  - Set this to `true` if you have deployed this service on a web server which is publicly accessible
  - Else set to `false`
    - `export USE_PUBLIC_WEBHOOK=`

- WEBHOOK - Set this if USE_PUBLIC_WEBHOOK set to `true`. Else leave it empty
  - Set to web server address where this service is deployed and publicly accessible
    - `export PUBLIC_WEBHOOK_HOST=`

- Tunneling - Either WEBHOOK or NGROK should be set to `true`
  - Set this to `true` if you want to deploy this service on a web server running locally on your own computer at a given port.
  - Else set to `false`
  - With ngrok, you can generate HTTP / HTTPS URL (such as https://fc6c892d6cd7.ngrok.io)
  - that tunnels requests to web server running locally on your own computer at a given port
  - ngrok (https://ngrok.com/) should be installed on your computer
    - `export USE_NGROK_TUNNEL=`

- set redirect parameter to bridge the call
  - `export REDIRECT_NUMBER=`
  
- Set to run the service on http / https (false / true)
  - `export LISTEN_SSL=`

For Windows:
  - Make a file with name ".env" in root directory . And copy content of .env.example in .env file . Then set the environment variables manually in .env file . And below are the environment variables .
    - `ENABLEX_APP_ID` , `ENABLEX_APP_KEY` , `SERVICE_PORT` , `USE_PUBLIC_WEBHOOK` , `PUBLIC_WEBHOOK_HOST` , `USE_NGROK_TUNNEL` , `REDIRECT_NUMBER` , `LISTEN_SSL`.
    Their explanation is given in Linux/Mac section (Upper section).


## SSL Certificate (Self Signed or Registered). It is required configuration if USE_PUBLIC_WEBHOOK is set to true or LISTEN_SSL is set to true.
For Linux/Mac:
  - Make a directory called certs on the root of the project
    - `mkdir certs`
  - Change to certs directory
    - `cd certs`
  - Create and Install certificates
    - `sudo openssl req -nodes -new -x509   -keyout example.key -out example.crt   -days 365   -subj '/CN=example.com/O=My Company Name LTD./C=US'; cat example.crt > example.ca-bundle`
  - use the certificate .key [self signed or registered]
    - `export CERTIFICATE_SSL_KEY=`
  - use the certificate .crt [self signed or registered]
    - `export CERTIFICATE_SSL_CERT=`
  - use the certificate CA[chain] [self signed or registered]
    - `export CERTIFICATE_SSL_CACERTS=`
  - switch to the root of the project
    - `cd ..`

For Windows (Using Git Bash):
  - Make a directory called certs on the root of the project
    - `mkdir certs`
  - Change to certs directory
    - `cd certs`
  - Create and Install certificates
    - `openssl req -nodes -new -x509   -keyout example.key -out example.crt   -days 365` 
    - `cat example.crt > example.ca-bundle`
  - Update these fields manually in .env file if not given else you can ignore it.
    - use the certificate .key [self signed or registered]
      - `CERTIFICATE_SSL_KEY=`
    - use the certificate .crt [self signed or registered]
      - `CERTIFICATE_SSL_CERT=`
    - use the certificate CA[chain] [self signed or registered]
      - `CERTIFICATE_SSL_CACERTS=`
  - switch to the root of the project
    - `cd ..`


## Starting the client application script
- For Inbound Calls
  - `node client-inbound-ivr.js`
