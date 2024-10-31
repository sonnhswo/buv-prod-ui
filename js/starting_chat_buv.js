const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

const wrapMainContent = document.getElementById('wrap-main-content');
const chatDialog = document.getElementById('chat-dialog');

// Function to generate a unique session ID
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

// Function to parse Markdown text into HTML
function parseMarkdown(text) {
    let html = text.replace(/\n/g, '<br>');
    html = html.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
    html = html.replace(/\*(.*?)\*/g, '<i>$1</i>');
    html = html.replace(/\[(.*?)\]\((https?:\/\/[^\s)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
    html = html.replace(/(^|[^"'>])((https?:\/\/[^\s<]+[^\.,\s<]))/g, '$1<a href="$2" target="_blank" rel="noopener noreferrer">$2</a>');
    return html;
}

// Function to convert email addresses into mailto links
function convertEmailsToLinks(text) {
    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
    return text.replace(emailRegex, function(email) {
        return `<a href="mailto:${email}">${email}</a>`;
    });
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
    fetch('https://buv-flask-che2fdbmcvgjhcbg.eastus-01.azurewebsites.net/buv', {
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
            const formattedAnswer = parseMarkdown(data.answer);
            const formattedAnswerConverted = convertEmailsToLinks(formattedAnswer);

            const pageInfo = data.page_number ? `<strong>Page(s):</strong> ${data.page_number}` : '';

            let sourceUrl = '';
            switch (data.source) {
                case 'Student Handbook':
                    sourceUrl = 'https://buvbus.blob.core.windows.net/docs/Student_Handbook_2024_2025_Oct_2024.pdf';
                    break;
                case 'PSG Programme Handbook':
                    sourceUrl = 'https://buvbus.blob.core.windows.net/docs/PSG_Programme_Handbook_Oct_2024.pdf';
                    break;
                case 'BUV Frequently Asked Questions':
                    sourceUrl = 'https://buvbus.blob.core.windows.net/docs/BUV_OCT24_FREQUENTLY_ASKED_QUESTIONS.pdf';
                    break;
                default:
                    sourceUrl = '';
            }

            const sourceInfo = sourceUrl ? `<strong>Source:</strong> <a href="${sourceUrl}" target="_blank">${data.source}</a>` : '';

            chatDialog.innerHTML += `
                <div class="bot-message">
                    <div class="text">${formattedAnswerConverted} <br><br> ${sourceInfo}  <br> ${pageInfo}
                        <img src="./images/thumbsup.png" alt="icon" style="margin-right:30px;" class="rating-icon thumbs-up">
                        <img src="./images/thumbsdown.png" alt="icon" class="rating-icon thumbs-down">
                    </div>
                </div>
            `;

            // Add event listeners for rating icons after bot message is appended
            const ratingIcons = chatDialog.querySelectorAll('.rating-icon');
            ratingIcons.forEach(icon => {
                icon.addEventListener('click', function () {
//                    alert('Bạn đã bấm vào biểu tượng đánh giá!');

                    // Sử dụng event delegation để gắn sự kiện cho các phần tử được thêm sau
                    document.body.addEventListener('click', function(event) {
                        if (event.target.classList.contains('thumbs-up')) {
                            const thumbsUp = event.target;
                            const thumbsDown = thumbsUp.closest('.text').querySelector('.thumbs-down');
                            thumbsDown.classList.remove('selected');
                            thumbsUp.classList.add('selected');
                        } else if (event.target.classList.contains('thumbs-down')) {
                            const thumbsDown = event.target;
                            const thumbsUp = thumbsDown.closest('.text').querySelector('.thumbs-up');
                            thumbsUp.classList.remove('selected');
                            thumbsDown.classList.add('selected');
                        }
                    });
                });
            });
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

    // gen new sessionID
    sessionId = generateUUID();
    localStorage.setItem('sessionId', sessionId);
});
