const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

const wrapMainContent = document.getElementById('wrap-main-content');
const chatDialog = document.getElementById('chat-dialog');


//let sessionId = "0";
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Kiểm tra xem đã có sessionId trong localStorage hay chưa
let sessionId = localStorage.getItem('sessionId');
if (!sessionId) {
    // Nếu chưa có, sinh mới và lưu vào localStorage
    sessionId = generateUUID();
    localStorage.setItem('sessionId', sessionId);
}

console.log(sessionId);


// Function để chuyển đổi Markdown thành HTML đơn giản
//function parseMarkdown(text) {
//    // Thay thế xuống dòng bằng <br>
//    let html = text.replace(/\n/g, '<br>');
//
//    // Thay thế **bold** thành <b>bold</b>
//    html = html.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
//
//    // Thay thế *italic* thành <i>italic</i>
//    html = html.replace(/\*(.*?)\*/g, '<i>$1</i>');
//
//    return html;
//}
//function parseMarkdown(text) {
//    // Thay thế xuống dòng bằng <br>
//    let html = text.replace(/\n/g, '<br>');
//
//    // Thay thế **bold** thành <b>bold</b>
//    html = html.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
//
//    // Thay thế *italic* thành <i>italic</i>
//    html = html.replace(/\*(.*?)\*/g, '<i>$1</i>');
//
//    // Thay thế [text](url) thành <a href="url">text</a>
//    html = html.replace(/\[(.*?)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
//
//    return html;
//}
function parseMarkdown(text) {
    // Thay thế xuống dòng bằng <br>
    let html = text.replace(/\n/g, '<br>');

    // Thay thế **bold** thành <b>bold</b>
    html = html.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');

    // Thay thế *italic* thành <i>italic</i>
    html = html.replace(/\*(.*?)\*/g, '<i>$1</i>');

    // Thay thế [text](url) thành <a href="url">text</a>
    html = html.replace(/\[(.*?)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

    // Thay thế các URL standalone thành <a href="url">url</a> nhưng bỏ qua nếu đã nằm trong thẻ <a>
    html = html.replace(/(^|[^"'>])((https?:\/\/[^\s<]+[^\.,\s<]))/g, '$1<a href="$2" target="_blank" rel="noopener noreferrer">$2</a>');

    return html;
}


// popup outlook for email address
function convertEmailsToLinks(text) {
    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
    const replacedText = text.replace(emailRegex, function(email) {
      return `<a href="mailto:${email}">${email}</a>`;
    });
    return replacedText;
}


// function convert link inside input string to tag <a>
function convertLinksToAnchors(inputString) {
    // Biểu thức chính quy đơn giản để tìm các URL
    const urlRegex = /(https?:\/\/[^\s]{5,})/g;

    // Thay thế các URL thành thẻ <a> với href
    const resultString = inputString.replace(urlRegex, (url) => {
        // Loại bỏ dấu chấm ở cuối URL nếu có
        if (url.endsWith('.')) {
            url = url.slice(0, -1);
        }

        // Trả về chuỗi đã thay thế với thẻ <a>
        return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
    });

    return resultString;
}



// Function to send message
function sendMessage() {
    const userInputValue = userInput.value.trim();
    if (userInputValue === '') {
        console.warn("User input is empty. Ignoring send.");
        return;
    }

    // display chat dialog
    wrapMainContent.style.display = 'none';
    chatDialog.style.display = 'block';


    // Append user message
    chatDialog.innerHTML += `
        <div class="user-message">
            <div class="text">${userInputValue}</div>
        </div>
    `;


    // Gửi yêu cầu đến Flask API với JSON format
    fetch('https://buv-flask-che2fdbmcvgjhcbg.eastus-01.azurewebsites.net/su', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            message: userInputValue,
            session_id: sessionId
        })
    })
    .then(response => response.json())
    .then(data => {
        // Kiểm tra phản hồi từ API và thêm vào UI
        if (data && data.answer) {
            // Sử dụng hàm parseMarkdown để chuyển đổi Markdown thành HTML

            const formattedAnswer = parseMarkdown(data.answer);
            const formattedAnswer_converted = convertEmailsToLinks(formattedAnswer);

            const pageInfo = data.page_number ? `<strong>Page(s):</strong> ${data.page_number}` : '';
            // const sourceInfo = data.source ? `<strong>Source:</strong> <a href="https://buvbus.blob.core.windows.net/docs/SU-JUL24-FAQ.pdf">${data.source}</a>` : '';
            // const sourceInfo = data.source ? `<strong>Source:</strong> <a href="https://buvbus.blob.core.windows.net/docs/SU_OCT24_FREQUENTLY_ASKED_QUESTIONS.pdf">${data.source}</a>` : '';

            let sourceUrl = '';

            switch (data.source) {
            case 'Student Handbook':
                sourceUrl = 'https://buvbus.blob.core.windows.net/docs/Student_Handbook_2024_2025_Oct_2024.pdf';
                break;
            case 'PSG Programme Handbook':
                sourceUrl = 'https://buvbus.blob.core.windows.net/docs/PSG_Programme_Handbook_Oct_2024.pdf';
                break;
            case 'SU Frequently Asked Questions':
                sourceUrl = 'https://buvbus.blob.core.windows.net/docs/SU_OCT24_FREQUENTLY_ASKED_QUESTIONS.pdf';
                break;
            default:
                sourceUrl = '';
            }

            const sourceInfo = sourceUrl ? `<strong>Source:</strong> <a href="${sourceUrl}">${data.source}</a>` : '';

//            const pageInfo = data.page_number;
//            const sourceInfo = data.source;

            chatDialog.innerHTML += `
                <div class="bot-message">
                    <div class="text">${formattedAnswer_converted} <br><br> ${sourceInfo}  <br> ${pageInfo}
                        <img src="./images/thumbsup.png" alt="icon" style="margin-right:30px;" class="rating-icon">
                        <img src="./images/thumbsdown.png" alt="icon" class="rating-icon">
                    </div>

                </div>
            `;
        } else {
            console.error("Response data is missing the 'answer' field", data);
            chatDialog.innerHTML += `
                <div class="bot-message">
                    <div class="text">Sorry, there was an issue processing your request.</div>
                </div>
            `;
        }
        chatDialog.scrollTop = chatDialog.scrollHeight;
    })
    .catch(error => {
        console.error('Error:', error);
        chatDialog.innerHTML += `
            <div class="bot-message">
                <div class="text" style="padding-bottom:5px !important;">Sorry, there was an error contacting the server. Please try again later.</div>
            </div>
        `;
        chatDialog.scrollTop = chatDialog.scrollHeight;
    });



    // Clear input
    userInput.value = '';

//    // Simulate bot response
//    setTimeout(() => {
//        chatDialog.innerHTML += `
//            <div class="bot-message">
//                <div class="text">You said: ${userInputValue}</div>
//            </div>
//        `;
//        chatDialog.scrollTop = chatDialog.scrollHeight;
//    }, 500);
//
//    chatDialog.scrollTop = chatDialog.scrollHeight;
}

// Event listener for 'Enter' key
userInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Event listener for Send button
sendBtn.addEventListener('click', sendMessage);

// Reset button functionality
document.getElementById('reset-btn').addEventListener('click', function () {
    userInput.value = '';
    chatDialog.innerHTML = '';

    // display main content
    chatDialog.style.display = 'none';
    wrapMainContent.style.display = 'block';

});

//
//<br>
//    <img src="./images/thumbsup.png" alt="icon" style="width: 15px; height: 15px;">
//    <img src="./images/thumbsdown.png" alt="icon" style="width: 15px; height: 15px;">

//<img src="./images/thumbsup.png" alt="icon" class="rating-icon">
//<img src="./images/thumbsdown.png" alt="icon" style="margin-left:20px;" class="rating-icon">

//British University Vietnam (IHM/FE/FE(dual))