if (localStorage.getItem("chances") == null) {
  localStorage.setItem("chances", "0");
}
if (localStorage.getItem("notPoinst") == null) {
  localStorage.setItem("notPoinst", "0");
}
if (localStorage.getItem("justPoinst") == null) {
  localStorage.setItem("justPoinst", "0");
  localStorage.setItem("today", null);
}

if (+localStorage.getItem("today") != new Date().getDay()) {
  localStorage.setItem("dailyChanceleft", "20");
}

if (+localStorage.getItem("lastHours") != new Date().getHours()) {
  localStorage.setItem("spinAdsLeft", "5");
}

adsLeft1.innerText = localStorage.getItem("spinAdsLeft");
adsLeft.innerText = localStorage.getItem("dailyChanceleft");

spinNumber.innerText = localStorage.getItem("chances");
notCoins.innerText = localStorage.getItem("notPoinst");
coinPoinst.innerText = localStorage.getItem("justPoinst");

function claim() {
  Toastify({ text: "Coming on 1 October" }).showToast();
}

function watchAdsDaily() {
  watchingDailyAds()
  // AdController.show().then((result) => {
//     // user watch ad till the end
//     // your code to reward user
//     watchingDailyAds()
//     alert('Reward');
//   }).catch((result) => {
//     // user skipped video or get error during playing ad
//     // do nothing or whatever you want
//     tg.alert("Hey you must finished the ads😡😡")
//   //  alert(JSON.stringify(result, null, 4));
//   })
// 
}
function watchAdsSpin() {
  watchingSpinAds()
  // AdController.show().then((result) => {
//     watchingSpinAds()
//   }).catch((result) => {
//     tg.showAlert("You must finished the ads😡😡")
//  // alert(JSON.stringify(result, null, 4));
//   })
}
function checkCode() {
  Toastify({ text: "Coming in a few days🙂" }).showToast();
}

function showInfo() {
  Toastify({ text: "Check your bot😄😄😄" }).showToast();
}



function watchingDailyAds() {
  if (+localStorage.getItem("dailyChanceleft") > 0) {
    Toastify({ text: "Ads is loding. Please wait🙂" }).showToast();
    let temp = +localStorage.getItem("justPoinst") + 100;
    localStorage.setItem("justPoinst", temp);
    coinPoinst.innerText = localStorage.getItem("justPoinst");

    //decreasing the chances
    let temp2 = +localStorage.getItem("dailyChanceleft") - 1;
    localStorage.setItem("dailyChanceleft", temp2);
    
    // increasing the watched list 
    let temp3 = +localStorage.getItem("watchedDailyAds") + 1;
    localStorage.setItem("watchedDailyAds", temp3);

    adsLeft.innerText = localStorage.getItem("dailyChanceleft");
    tg.showAlert("🎉🎉🎉100 points gotchaa🎊🎊🎊")
    tg.showAlert("Come after 5 minutes to rewatch And be rewarded")
  } else {
    localStorage.setItem("today", new Date().getDay());
    Toastify({ text: "Come back Tomorrow again😊😊😊" }).showToast();
  }
}



function watchingSpinAds() {
  if (+localStorage.getItem("spinAdsLeft") === 1) {
    let temp = +localStorage.getItem("chances") + 3;
    localStorage.setItem("chances", temp);
    spinNumber.innerText = localStorage.getItem("chances");
    localStorage.setItem("spinAdsLeft", "-11");
    localStorage.setItem("lastHours", new Date().getHours());
    Toastify({ text: "Congratuletion! You have got 3 tickets😊😊😊" }).showToast();
    tg.showAlert("Ooo yeah!!! 3 spins gotcha😌😌😌")
  } else if (+localStorage.getItem("spinAdsLeft") > 0) {
    Toastify({ text: "Ads is loding. Please wait🙂" }).showToast();
    let temp2 = +localStorage.getItem("spinAdsLeft") - 1;
    localStorage.setItem("spinAdsLeft", temp2);
    // increasing the watched list
    let temp4 = +localStorage.getItem("watchedSpinAds") + 1;
    localStorage.setItem("watchedSpinAds", temp4);

    adsLeft1.innerText = localStorage.getItem("spinAdsLeft");
  } else {
    Toastify({ text: "Come back again at next Hours. Like if it is now 9 then back at 10" }).showToast();
  }
}