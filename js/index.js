
// can chinh nut menu toggle
window.onload = function() {
    /*----------- set menu toggle button ----------*/
    // get the width of compnonent
    const container = document.querySelector('.container-fluid');
    const button = document.querySelector('.menu-toggle');

    const containerWidth = container.offsetWidth;
    const buttonWidth = button.offsetWidth;

    // print out to fix bug
    console.log('Container width:', containerWidth);
    console.log('Button width:', buttonWidth);

    // change css
    if (containerWidth > buttonWidth) {
        container.style.position = 'relative';
        button.style.position = 'absolute';
        button.style.top = (containerWidth-buttonWidth)/2;
    }


    /*------------------------set awarding body button----------------*/
    const suBtn = document.getElementById('su-btn');
    const buvBtn = document.getElementById('buv-btn');

    // set heigh back to auto to get the correct height
    suBtn.style.height = 'auto';
    buvBtn.style.height = 'auto';

    // get height
    const suBtnHeight = suBtn.offsetHeight;
    const buvBtnHeight = buvBtn.offsetHeight;

    // get max height
    const maxHeight = Math.max(suBtnHeight, buvBtnHeight);

    // set hight equally
    suBtn.style.height = `${maxHeight}px`;
    buvBtn.style.height = `${maxHeight}px`;


    /*----------------------------------*/
    const image = document.querySelector('#offcanvas-header img');

    if (image) {
        // Lấy khoảng cách từ hình ảnh đến lề trái của container
        const imageWidth = image.offsetWidth;
        const imageMargin = (250-imageWidth)/2;

        console.log('image Width', imageWidth);
        console.log('image margin', (250-imageWidth)/2);

        // Thiết lập margin-top bằng với khoảng cách tới lề trái
        image.style.marginTop = `${imageMargin}px`;
    }

    /*------------------can chinh image logo - sidebar - thang hang voi chu Studen Info Ser-------------------*/
    const introHeader = document.getElementById('intro-header');
    const imageLogo = document.querySelector('#sidebar-larger-screen img');

    if (introHeader) {
        // Lấy chiều cao của h1 bằng getBoundingClientRect()
        const headerHeight = introHeader.getBoundingClientRect().height;
        console.log('Chiều cao của h1:', headerHeight, 'px');
    }

    if (image) {
        // Lấy chiều cao của img bằng getBoundingClientRect()
        const imageHeight = imageLogo.getBoundingClientRect().height;
        console.log('Chiều cao của img logo:', imageHeight, 'px');
    }

//    const marginTopValue = Math.max(0, imageHeight - headerHeight);
//    introHeader.style.marginTop = `${marginTopValue}px`;

};



document.addEventListener("DOMContentLoaded", function() {
    // Lấy element của span
    const spanElement = document.querySelector('.navbar-toggler-icon');



    // Kiểm tra xem span có tồn tại hay không
    if (spanElement) {
        // Tính khoảng cách từ lề trái của span đến lề trái màn hình
        const leftOffset = spanElement.getBoundingClientRect().left;
        console.log("Left Offset:", leftOffset); // Log khoảng cách lề trái

        // Tính khoảng cách từ lề phải của span đến lề trái màn hình
        const rightOffset = spanElement.getBoundingClientRect().left + spanElement.offsetWidth;
        console.log("Right Offset:", rightOffset); // Log khoảng cách lề phải

//        // Tổng khoảng cách lề trái và lề phải
//        const totalOffset = leftOffset + rightOffset;
//        console.log("Total Offset:", totalOffset); // Log tổng khoảng cách

        // Đặt vị trí left cho #logo-primary-small-screen
        const logo = document.querySelector('#logo-primary-small-screen');
        if (logo) {
            logo.style.left = `${rightOffset}px`;
//            console.log("Logo left position set to:", totalOffset); // Log giá trị left đã được set
        }

        /*----------------------------*/
        // Lấy element của h1 bằng id
        const h1Element = document.getElementById('intro-header');

        // Kiểm tra xem h1 có tồn tại hay không
        if (h1Element) {
            // Tính khoảng cách từ lề trái của h1 đến lề trái màn hình
            const h1LeftOffset = h1Element.getBoundingClientRect().left;
            console.log("H1 Left Offset:", h1LeftOffset); // Log khoảng cách lề trái của h1

            // Lấy element của #header-navbar và set thuộc tính left
            const headerNavbar = document.getElementById('header-navbar');
            const dist = Math.abs(leftOffset-h1LeftOffset)
            if (headerNavbar) {


                const viewportWidth = window.innerWidth;
                console.log("Viewport Width:", viewportWidth);

                // Kiểm tra điều kiện về chiều rộng của viewport
                if (viewportWidth > 852) {
//                    alert("bigger");
                    headerNavbar.style.left = `-${dist-100}px`;
                    console.log("Header Navbar left position set to:", `-${dist}px`); // Log giá trị left đã được set
                } else {
//                    alert("smaller");
                    headerNavbar.style.left = `-${dist}px`;
                    console.log("Header Navbar left position set to:", `-${dist}px`); // Log giá trị left đã được set
                }

            }
        }

    }
});





//
//document.addEventListener("DOMContentLoaded", function() {
//    // Lấy element của h1 bằng id
//    const h1Element = document.getElementById('intro-header');
//
//    // Kiểm tra xem h1 có tồn tại hay không
//    if (h1Element) {
//        // Tính khoảng cách từ lề trái của h1 đến lề trái màn hình
//        const h1LeftOffset = h1Element.getBoundingClientRect().left;
//        console.log("H1 Left Offset:", h1LeftOffset); // Log khoảng cách lề trái của h1
//
////        // Lấy element của #header-navbar và set thuộc tính left
////        const headerNavbar = document.getElementById('header-navbar');
////        if (headerNavbar) {
////            headerNavbar.style.left = `-${h1LeftOffset}px`;
////            console.log("Header Navbar left position set to:", `-${h1LeftOffset}px`); // Log giá trị left đã được set
////        }
//    }
//});


//document.addEventListener("DOMContentLoaded", function() {
//    // Lấy chiều rộng toàn màn hình (viewport width)
//    const viewportWidth = window.innerWidth;
//
//    // Kiểm tra nếu viewport lớn hơn 992px
//    if (viewportWidth > 992) {
//        // Lấy phần tử #chatbot-input-field
//        const chatbotInputField = document.getElementById('chatbot-input-field');
//
//        // Kiểm tra nếu phần tử #chatbot-input-field tồn tại
//        if (chatbotInputField) {
//            // Lấy chiều rộng của #chatbot-input-field
//            const chatbotInputFieldWidth = chatbotInputField.offsetWidth;
//
//            // Lấy phần tử #wrap-main-content
//            const wrapMainContent = document.getElementById('wrap-main-content');
//
//            // Kiểm tra nếu phần tử #wrap-main-content tồn tại
//            if (wrapMainContent) {
//                // Đặt chiều rộng của #wrap-main-content bằng với chiều rộng của #chatbot-input-field
//                wrapMainContent.style.width = `${chatbotInputFieldWidth}px`;
//                console.log(`#wrap-main-content width set to: ${chatbotInputFieldWidth}px`);
//            }
//        }
//    }
//});


//document.addEventListener("DOMContentLoaded", function() {
//    // Lấy element của #logo-primary-small-screen
//    const logoPrimary = document.getElementById('logo-primary-small-screen');
//    const headerNavbar = document.getElementById('header-navbar');
//
//    // Kiểm tra xem logo có tồn tại và headerNavbar có tồn tại không
//    if (logoPrimary && headerNavbar) {
//        // Lắng nghe sự kiện thay đổi display của logo
//        const observer = new MutationObserver(function(mutations) {
//            mutations.forEach(function(mutation) {
//                if (window.getComputedStyle(logoPrimary).display === 'block') {
//                    // Khi logo có display là block, đặt chiều cao cho #header-navbar
//                    headerNavbar.style.height = '11dvh';
//                    console.log("Height of #header-navbar set to 11dvh");
//                }
//            });
//        });
//
//        // Khởi tạo observer để theo dõi sự thay đổi của style
//        observer.observe(logoPrimary, { attributes: true, attributeFilter: ['style', 'class'] });
//    }
//});
