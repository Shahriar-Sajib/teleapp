if (localStorage.getItem("chances") == null) {
  localStorage.setItem("chances", "5");
}
if (localStorage.getItem("notPoinst") == null) {
  localStorage.setItem("notPoinst", "0");
}
if (localStorage.getItem("justPoinst") == null) {
  localStorage.setItem("justPoinst", "0");
  localStorage.setItem("today", new Date().getDay());
  localStorage.setItem("dailyChanceleft",20)
  
}

if (+localStorage.getItem("today") != new Date().getDay()) {
  localStorage.setItem("dailyChanceleft", "20");
}

adsLeft.innerText = localStorage.getItem("dailyChanceleft");
notCoins.innerText = localStorage.getItem("notPoinst");
coinPoinst.innerText = localStorage.getItem("justPoinst");


function claim(msg) {
  if(msg == "DailyBonus"){
    tg.showAlert("You have got 1 NOT and 200 points as your daily claim")
  }
  if(msg == "not" || msg == "coins"){
    Toastify({ text: "Coming on 1 October" }).showToast();
  }
}

function watchAdsDaily() {
  Toastify({text:"Ads is coming soon Please Wait🙏🙏🙏"}).showToast();
  watchingDailyAds()
  AdController.show().then((result) => {
    // user watch ad till the end
    // your code to reward user
    watchingDailyAds()
  }).catch((result) => {
    // user skipped video or get error during playing ad
    // do nothing or whatever you want
    tg.alert("Hey you must finished the ads😡😡")
  //  alert(JSON.stringify(result, null, 4));
  })

}

function checkCode() {
  Toastify({ text: "Coming in a few days🙂. You will get 250 for completing tasks in every 3 hours" }).showToast();
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
