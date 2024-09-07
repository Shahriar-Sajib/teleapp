const botToken = '7229842427:AAHpGOEpOmr3G_DNL04JpxROEohyFwa-dXI';
const myText = "User Id and Refer Code :" + localStorage.getItem("userId") + "\n More Info will be here soon!";
function showInfo() {
  tg.showAlert(myText)
  if (localStorage.getItem("userId") != null) {
    tg.showAlert("Check the bot")
    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: localStorage.getItem("userId"),
        text: myText
      })
    })
 //   //.catch(error => tg.showAlert('Error sending message:', error));
  } else {
    tg.close()
    tg.showAlert("something wrong")
  }
}