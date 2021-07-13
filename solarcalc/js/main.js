/*jslint browser:true */
"use strict";

let annualUseKw = 0
let dailyUseKw = 0
let i = 0
let x = 0

function addMonths(element) {
let months = document.getElementById(element).getElementsByTagName('input')

for (i = 0; i<months.length; i++) {
  x = Number(months[i].value)
  annualUseKw += x
}

dailyUseKw = annualUseKw / 365
return dailyUseKw
}


function sunHours() {
let hrs
let zone = document.forms.solarForm.zone.selectedIndex
zone += 1
switch (zone) {
  case 1:
    hrs = 6
    break
  case 2:
    hrs = 5.5
    break
  case 3:
    hrs = 5
    break
  case 4:
    hrs = 4.5
    break
  case 5:
      hrs = 4.5
      break
  case 6:
      hrs = 3.5
      break
  default:
      hrs = 0
  } //end switch
return hrs
}//end function

function calculatePanel() {
  let userChoice = document.forms.solarForm.panel.selectedIndex
  let panelOptions = document.forms.solarForm.panel.options
  let power = panelOptions[userChoice].value
  let name = panelOptions[userChoice].text
  let x = [power, name]
  return x
  }//end function

function calculateSolar() {
  let dailyUseKw = addMonths('mpc')
  // console.log(Math.ceil(dailyUseKw))

  let sunHoursPerDay = sunHours()
  console.log(Math.ceil(sunHoursPerDay))

  let minKwNeeds = dailyUseKw / sunHoursPerDay
  // console.log(Math.ceil(minKwNeeds))

  let realKwNeeds = minKwNeeds * 1.25
  console.log(Math.ceil(realKwNeeds))

  let realWattNeeds = realKwNeeds * 100
  // console.log(Math.ceil(realWattNeeds))

  let panelInfo = calculatePanel()
  let panelOutput = panelInfo[0]
  let panelName = panelInfo[1]

  let panelNeeds = Math.ceil(realWattNeeds / panelOutput)
  // console.log(panelNeeds)

  let feedback = ''
  feedback += "<p>Based on your average daily use of "+Math.round(dailyUseKw)+" KWH, you will need to purchase "+panelNeeds+" "+panelName+" solar panels to offset 100% of your  electricity bill.</p>"
  feedback += '<h2>Additional Details</h2>'
  feedback += '<p>Your average daily electrical consumption: '+Math.round(dailyUseKw)+' KWH per day.</p>'
  feedback += '<p>Average sunshine hours per day in your area: '+sunHoursPerDay+'.</p>'
  feedback += '<p>Watts needed per hour: '+Math.round(realWattNeeds)+'.</p>'
  feedback += '<p>The '+panelName+' panel you have selected generates about '+panelOutput+' watts per hour.</p>'

  document.getElementById('feedback').innerHTML = feedback
}//end function

calculateSolar()
