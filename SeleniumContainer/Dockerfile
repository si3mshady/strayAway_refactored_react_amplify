
FROM selenium/standalone-chrome as browserAutomation

FROM node

WORKDIR /app

COPY  . .
COPY chromedriver  ./
ENV  SELENIUM_REMOTE_URL="http://localhost:4444/wd/hub" 
EXPOSE 5900 5001 4444 

CMD ["node","server.js"]



# https://docs.docker.com/develop/develop-images/multistage-build/
# https://www.npmjs.com/package/selenium-webdriver
#https://www.selenium.dev/documentation/en/remote_webdriver/remote_webdriver_client/