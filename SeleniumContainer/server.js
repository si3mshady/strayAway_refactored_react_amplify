const {Builder, By, Key} = require('selenium-webdriver');
const { execSync } = require("child_process");
const express = require('express')
const app = express()
const port = 8080



app.get('/311', (_,res) => {
    // const validate = () => { execSync(`node ${__dirname}/runner.js`);  }        // // console.log(__dirname)
    // validate()
    (async function example() {
      let driver = await new Builder().
      forBrowser('chrome')
      .usingServer('http://selenium:4444/wd/hub').build() // connecting to docker container with remote driver!!
      //docker run -d -p 4444:4444  -v /dev/shm:/dev/shm selenium/standalone-chrome:4.0.0-beta-1-20210215
      // 'http://localhost:4444/wd/hub'
      // connecting to docker container with remote driver!!
      //docker run -d -p 4444:4444  -v /dev/shm:/dev/shm selenium/standalone-chrome:4.0.0-beta-1-20210215
      //https://blog.kevinlamping.com/common-selenium-and-webdriverio-error-messages/
      // THE FIX!  https://www.npmjs.com/package/wdio-selenium-standalone-service
      await driver.manage().setTimeouts( { implicit: 10000 } );
      try {
        await driver.get('https://dallascrm.force.com/public/request/ANIATAGR/location');
        //first form 
        setTimeout(async() => {
            console.log('before call')
            await  driver.findElement(By.xpath('//input[@type="text"]')).sendKeys('2510 McKinney Ave, Dallas, TX 75201', Key.RETURN);
            console.log('after call')
        }, 3000);
    
         setTimeout(async() => {
          await driver.findElement(By.xpath("//capsule-request-location//ul/li[1]")).click()
          console.log('clicked!!!')
    
          setTimeout(async() => {
            const xp = "/html/body/capsule-app/div/ng-component/div[2]/capsule-request-location/div[1]/div[2]/div[2]/div/div[2]/button[2]"
            await driver.findElement(By.xpath(xp)).click()
            // first form 
        // await driver.wait(until.titleIs('webdriver - Google Search'), 1000);        
            setTimeout(async() => {
              const dog = "/html/body/capsule-app/div//capsule-request-form-page/div/div[1]/form/capsule-request-field[1]/capsule-single-value-list-input/div/label[2]/input"
              await driver.findElement(By.xpath(dog)).click()
    
          //description 
          setTimeout(async() => {
            console.log('before description')
            const description =  "/html/body/capsule-app/div/ng-component//form/capsule-request-field[2]/capsule-string-input/input"
            await  driver.findElement(By.xpath(description)).sendKeys('Looked like CUJO');
            // wait 3 sections 
            // /html/body/capsule-app/div/ng-component/div[2]/capsule-request-location/div[1]/div[2]/div/ul/li[1]/span       
            console.log('After description')
            // last seen 
            console.log('Before last seen ')
            setTimeout(async() => {
             const lastSeen = "/html/body/capsule-app/div/ng-component/div[2]//form/capsule-request-field[3]/capsule-string-input/input"
             await  driver.findElement(By.xpath(lastSeen)).sendKeys("Sunday Feb 21, 2021");
             console.log('After last seen')
    
             setTimeout(async() => {
             //why report issue 
             console.log('Before dropdown')
             let whyReport = '/html/body/capsule-app/div/ng-component/div[2]//form/capsule-request-field[4]/capsule-single-value-list-input/div/select'
             await driver.findElement(By.xpath(whyReport)).click()
             // click drop down the
             console.log('After dropdown')
    
             setTimeout(async() => {
              console.log('Before drop down selection')
              let looseDog = "/html/body/capsule-app/div/ng-component/div[2]//form/capsule-request-field[4]/capsule-single-value-list-input/div/select/option[5]"
              await driver.findElement(By.xpath(looseDog)).click()
              console.log('After drop down selection')
    
    
              setTimeout(async() => {
                console.log('Before agressive activity  in progress')
                const inProgress = '/html/body/capsule-app/div/ng-component/div[2]/capsule-request-form-page/div/div[1]/form/capsule-request-field[5]/capsule-single-value-list-input/div/label[1]/input'
                await driver.findElement(By.xpath(inProgress)).click()
                console.log('After agressive activity  in progress')
                
                setTimeout(async() => {
                  console.log('Before is animal owned')
                  const animalOwned = "//capsule-request-form-page//capsule-request-field[6]/capsule-single-value-list-input/div/label[2]/input"
                  await driver.findElement(By.xpath(animalOwned)).click()
                  console.log('After is animal owned')
    
    
                  setTimeout(async() => {
                    console.log('Before submit')
                    const submit = "//capsule-request-form-page/div/div[1]/form/div[2]/button"
                    await driver.findElement(By.xpath(submit)).click()
                    console.log('After submit')
    
                    setTimeout(async () => {
                      console.log('Before review final submit')
                      const reviewFinalSubmit = '/html/body/capsule-app/div/ng-component/div[2]/capsule-request-contact-form-page/div/form/div[2]/button'
                      await driver.findElement(By.xpath(reviewFinalSubmit)).click()
                      console.log('After review final submit')
                    }, 2000);
                  }, 1000)
    
                },1000)
                
              }, 1000)
             }, 1000)        
            },1000)
           }, 1000)        
        }, 1000);
            }, 1000)
           }, 1000);
         }, 6000);
    
         
      } finally {
      
        console.log('done')
      }
    })();
  res.send('contacting Animal Services!')
})

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})





