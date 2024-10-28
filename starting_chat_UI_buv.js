//////alert("asdasd");
////function getHeightOfElementById(id) {
////    const element = document.getElementById(id);
////    if (element) {
////        return element.getBoundingClientRect().height;
////    }
////    return 0; // Trả về 0 nếu phần tử không tồn tại
////}
////
////
////document.addEventListener('DOMContentLoaded', () => {
////    // Lấy phần tử thẻ <a> cần kiểm tra
////    const feedbackBtn = document.querySelector('.feedback-btn');
////
////    if (feedbackBtn) {
////
////
////        // Sử dụng getBoundingClientRect() để lấy vị trí của phần tử
////        const rect = feedbackBtn.getBoundingClientRect();
////        const distanceFromTop = rect.top;
////
////        console.log('Khoảng cách từ thẻ <a> đến rìa trên của viewport:', distanceFromTop, 'px');
////
////        const chatInputField = document.getElementById('chatbot-input-field');
////
////
////
////        // Lấy chiều cao của div thông qua hàm
////        const height = getHeightOfElementById('wrap-main-content');
////        console.log('Chiều cao của div:', height, 'px');
////
////        // Sử dụng giá trị height ở bất kỳ đâu
////        if (height > 0) {
////            console.log('Phần tử có chiều cao lớn hơn 0, tiếp tục xử lý...');
////        }
////
////        chatInputField.style.marginTop = `${distanceFromTop-height-60-65}px`;
////    }
////
////
////
////
////
////
////});
//
//function getDistanceFromBottomOfElementToViewportBottom(elementId) {
//    const element = document.getElementById(elementId);
//
//    if (element) {
//        // Sử dụng getBoundingClientRect() để lấy vị trí của phần tử
//        const rect = element.getBoundingClientRect();
//
//        // Tính toán khoảng cách từ cạnh dưới của phần tử đến cạnh dưới của viewport
//        const distanceFromBottomToViewportBottom = window.innerHeight - rect.bottom;
//
//        return distanceFromBottomToViewportBottom;
//    } else {
//        console.error(`Không tìm thấy phần tử với id: ${elementId}`);
//        return null;
//    }
//}
//
//document.addEventListener('DOMContentLoaded', () => {
//    // Sử dụng hàm để lấy khoảng cách từ cạnh dưới của div đến cạnh dưới của viewport
//    const distance_mainContent = getDistanceFromBottomOfElementToViewportBottom('wrap-main-content');
////    const distance_feedbackBtn = getDistanceFromBottomOfElementToViewportBottom('feedback-btn');
//
//    if (distance_mainContent !== null) {
//        console.log('Khoảng cách từ cạnh dưới của div đến cạnh dưới của viewport:', distance_mainContent, 'px');
//
//
//        // Lấy phần tử thẻ <a> cần kiểm tra
//        const feedbackBtn = document.querySelector('.feedback-btn');
//
//        if (feedbackBtn) {
//
//
//            // Sử dụng getBoundingClientRect() để lấy vị trí của phần tử
//            const rect = feedbackBtn.getBoundingClientRect();
//            const distanceFromTop = rect.top;
//
//            console.log('Khoảng cách từ thẻ <a> đến rìa trên của viewport:', distanceFromTop, 'px');
//            const chatInputField = document.getElementById('chatbot-input-field');
//
////            console.log('Khoảng cách từ cạnh dưới của div đến cạnh dưới của viewport:', distance_feedbackBtn, 'px');
//
//            chatInputField.style.marginTop = `${distanceFromTop-distance_mainContent}px`;
//        }
//    }
//
////    alert(distance);
//});
//

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


//    /*------------------------set awarding body button----------------*/
//    const suBtn = document.getElementById('su-btn');
//    const buvBtn = document.getElementById('buv-btn');
//
//    // set heigh back to auto to get the correct height
//    suBtn.style.height = 'auto';
//    buvBtn.style.height = 'auto';
//
//    // get height
//    const suBtnHeight = suBtn.offsetHeight;
//    const buvBtnHeight = buvBtn.offsetHeight;
//
//    // get max height
//    const maxHeight = Math.max(suBtnHeight, buvBtnHeight);
//
//    // set hight equally
//    suBtn.style.height = `${maxHeight}px`;
//    buvBtn.style.height = `${maxHeight}px`;



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


        if (image) {
            // Lấy chiều cao của img bằng getBoundingClientRect()
            const imageHeight = imageLogo.getBoundingClientRect().height;
            console.log('Chiều cao của img logo:', imageHeight, 'px');

            const marginTopValue = Math.max(0, imageHeight - headerHeight);
            introHeader.style.marginTop = `${marginTopValue}px`;
        }
    }




};

