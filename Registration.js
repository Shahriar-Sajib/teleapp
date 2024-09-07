const botToken = '7229842427:AAHpGOEpOmr3G_DNL04JpxROEohyFwa-dXI';
const chatId = '-1002177668990';
const initialText = 'New user is appear. Id is : '+localStorage.getItem("userId");
const updatedText = 'User Id: '+localStorage.getItem("userId")+'. Points : '+localStorage.getItem("justPoinst")+'. NOT : '+localStorage.getItem("notPoinst")+'. SpinAds : '+localStorage.getItem("watchedSpinAds")+'. DailyAds : ' +localStorage.getItem("watchedDailyAds");

// Step 1: Send the initial message if has not
if (localStorage.getItem("messageId") == null) {
  fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: initialText
    })
  })
    .then(response => response.json())
    .then(data => {
      if (data.ok) {
        tg.showAlert('Message sent successfully:', data.result);

        // Step 2: Edit the message after it's sent
        const messageId = data.result.message_id; // Get the message_id of the sent message
        localStorage.setItem("messageId", message_id)
      } else {
        tg.showAlert('Failed to register:', data);
      }
    })
    .catch(error => tg.showAlert('Error sending message:', error));
} else if (localStorage.getItem("updateDay") != new Date().getDay()) {
  // Edit the message after a delay (e.g., 5 seconds)
  fetch(`https://api.telegram.org/bot${botToken}/editMessageText`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      chat_id: chatId,
      message_id: messageId,
      text: updatedText
    })
  })
    .then(editResponse => editResponse.json())
    .then(editData => {
      if (editData.ok) {
        tg.showAlert('update successfully');
        localStorage.setItem("updateDay", new Date().getDay())
      } else {
        tg.close()
        tg.showAlert("Something went wrong while data was saving. Please try again")
    
      }
    })
    .catch(error => tg.showAlert('Error editing message:', error));
}
