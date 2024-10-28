
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
    const marginTopValue = Math.max(0, imageHeight - headerHeight);
    introHeader.style.marginTop = `${marginTopValue}px`;

};

