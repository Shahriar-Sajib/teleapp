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
    if(+localStorage.getItem("dailyBonusChecked")!=new Date().getDay()){
    tg.showAlert("You have got 200 points as your daily claim. Come again tomorrow for more.");
    localStorage.setItem("dailyBonusChecked",new Date().getDay());
    let temp = +localStorage.getItem("justPoinst") + 200;
    localStorage.setItem("justPoinst", temp);
    coinPoinst.innerText = localStorage.getItem("justPoinst");

    }else{
      tg.showAlert("You have already got today bonuses")
    }
  }
  if(msg == "not" || msg == "coins"){
    Toastify({ text: "Coming on October" }).showToast();
  }
}

function watchAdsDaily() {
if(localStorage.getItem("watchedTime") != new Date().getMinutes()){
  Toastify({text:"Ads is loading soon Please Wait🙏🙏🙏"}).showToast();
  AdController.show().then((result) => {
    // user watch ad till the end
    // your code to reward user
    watchingDailyAds()
    localStorage.setItem("today", new Date().getDay())
  }).catch((result) => {
    // user skipped video or get error during playing ad
    // do nothing or whatever you want
    tg.showAlert("Hey you must finished the ads😡😡")
  //  alert(JSON.stringify(result, null, 4));
  })

    }else{
      tg.showAlert("Come again 5 minutes later")
    }
        

}

function checkCode() {
  Toastify({ text: "Coming in a few days🙂. You will get 250 for completing tasks in every 3 hours" }).showToast();
}

function watchingDailyAds() {
  if (+localStorage.getItem("dailyChanceleft") > 0 && +localStorage.getItem("watchedTime") != new Date().getMinutes()) {
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
    tg.showAlert("🎉🎉🎉100 points gotchaa🎊🎊🎊");
    tg.showAlert("Come after 3-5 minutes to rewatch And be rewarded");
    localStorage.setItem("watchedTime", new Date().getMinutes())
  } else {
    if(+localStorage.getItem("watchedTime")==new Date().getMinutes()){
      tg.showAlert("Come after 3-5 minutes to rewatch And be rewarded");
    }else{
      localStorage.setItem("today", new Date().getDay());
      Toastify({ text: "Come back Tomorrow again😊😊😊" }).showToast();
    }
  }
}
