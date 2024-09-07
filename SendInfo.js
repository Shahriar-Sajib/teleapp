const botToken = '7229842427:AAHpGOEpOmr3G_DNL04JpxROEohyFwa-dXI';
const myText ="User Id and Refer Code :"+localStorage.getItem("userId")
function hh() {
  if (localStorage.getItem("userId") != null) {
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
    //.catch(error => tg.showAlert('Error sending message:', error));
  } else {
    tg.close()
    tg.showAlert("something wrong")
  }

}