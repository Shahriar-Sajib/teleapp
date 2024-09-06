const botToken = '7229842427:AAHpGOEpOmr3G_DNL04JpxROEohyFwa-dXI'; // Replace with your bot token
const apiUrl = `https://api.telegram.org/bot${botToken}`;
let lastUpdateId = 0; // Keep track of the last update ID to avoid processing the same message multiple times

// Function to get updates and find chat IDs
const getUpdates = async () => {
  try {
    const response = await fetch(`${apiUrl}/getUpdates?offset=${lastUpdateId + 1}`);
    const data = await response.json();

    if (data.result.length > 0) {
      data.result.forEach((update) => {
        if (update.message && update.message.text === '/start') {
          const chatId = update.message.chat.id; // Extract chat ID
          console.log('Chat ID:', chatId);
          sendMessage(chatId, 'Hello! Welcome to the bot. This message will be deleted in 5 seconds.');
        }
        lastUpdateId = update.update_id; // Update the lastUpdateId to the current one
      });
    }
  } catch (error) {
    console.error('Error getting updates:', error);
  }
};

// Function to send a message
const sendMessage = async (chatId, message) => {
  try {
    const response = await fetch(`${apiUrl}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Message sent successfully:', data);

    // Schedule deletion after 5 seconds
    setTimeout(() => deleteMessage(chatId, data.result.message_id), 5000);
  } catch (error) {
    console.error('Error sending message:', error);
  }
};

// Function to delete a message
const deleteMessage = async (chatId, messageId) => {
  try {
    const response = await fetch(`${apiUrl}/deleteMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: chatId,
        message_id: messageId
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Message deleted successfully:', data);
  } catch (error) {
    console.error('Error deleting message:', error);
  }
};

// Poll for updates every 3 seconds
setInterval(getUpdates, 1000);
