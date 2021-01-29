window.onload = function () {

    new WOW({
        animateClass: 'animate__animated',
    }).init();

    $('.phone').inputmask('+7(999)999-99-99');
    $('#time').inputmask('99:99 99.99.9999');


    $('#master-slider').slick({ //masters slider
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        dots: true,
        customPaging: function (slider, i) {
            return '<a>' + (i + 1) + '</a>';
        },
        responsive: [
            {
                breakpoint: 1240,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 870,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }]
    });


    $('#our-gallery').slick({ //main-gallery slider
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [

            {
                breakpoint: 1070,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 835,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    });

    $('.parent-container').magnificPopup({ //main-gallery popup
        delegate: 'a',
        type: 'image',
        gallery: {
            enabled: true
        },
    });


    let accordion = document.getElementsByClassName("accordion-title"); //accordion
    let accordionItem = document.getElementsByClassName("accordion-text");
    for (let i = 0; i < accordion.length; i++) {
        accordion[i].addEventListener("click", function () {

            this.classList.toggle("show");

            let descriptionAcc = this.nextElementSibling;
            if (descriptionAcc.style.display === "block") {
                descriptionAcc.style.display = "none";
            } else {
                for (let x = 0; x < accordionItem.length; x++) {
                    accordionItem[x].style.display = 'none';
                }
                descriptionAcc.style.display = "block";
            }
        });
    }


    $('#btn-question').click(() => { //validating and submitting the form FAQ
        let phone = $('#form-question-control');

        if (phone.val()) {
            $.ajax({
                type: 'post',
                url: 'mail-faq.php',
                data: 'phone=' + phone.val(),
                success: () => {
                    $('#questions-form-thanks').show();
                },
                error: () => {
                    alert('Ошибка отправки. Свяжитесь, пожалуйста, с нами по номеру телефона +7(981)458-85-96.');
                }
            });
        } else {
            $('#questions-form-error').show();
            phone.css('border-color', 'red');
        }
    });


    let btnArr = document.getElementsByClassName('btn-action'); //choose function
    Array.prototype.forEach.call(btnArr, function (element) {
        element.addEventListener('click', function () {

            document.getElementById('reservation-container').style.display = 'flex';

            if (element.classList.contains('product')) {
                let optionArr = document.getElementById('selector').getElementsByTagName('option');
                let eClass = element.classList;
                let hasNotError = true;
                switch (hasNotError) {
                    case(eClass.contains('product1')):
                        optionArr[1].selected = hasNotError;
                        break;
                    case(eClass.contains('product2')):
                        optionArr[2].selected = hasNotError;
                        break;
                    case(eClass.contains('product3')):
                        optionArr[3].selected = hasNotError;
                        break;
                    case(eClass.contains('product4')):
                        optionArr[4].selected = hasNotError;
                        break;
                }
            }
        });
    });


    let closeElementPopup = document.getElementById('reservation-cancel');//close-button action
    closeElementPopup.addEventListener('click', function () {
        document.getElementById('reservation-container').style.display = 'none';
    });


    let reserveBtn = document.getElementById('reserve-button'); // main form's validation
    reserveBtn.addEventListener('click', function () {

        let errorMessage = document.getElementById('reserve-error');
        errorMessage.style.display = 'none';

        let arrNames = Array.from(document.getElementsByClassName('need-validity'));

        let hasError = false;

        arrNames.forEach(function (i) {
            i.style.borderColor = '#721163';
            if (!i.value) {
                i.style.borderColor = 'red';
                errorMessage.style.display = 'block';
                hasError = true;
            }
        });

        if (!hasError) {
            $.ajax({
                type: 'post',
                url: 'mail.php',
                data: 'name=' + arrNames[0].value + '&phone=' + arrNames[1].value
                    + '&product=' + arrNames[2].value + '&time=' + arrNames[3].value,
                success: () => {
                    document.getElementById('reservation-sent').style.display = 'block';
                    document.getElementById('reservation-content').style.display = 'none';
                },
                error: () => {
                    document.getElementById('reservation-container').style.display = 'none';
                    alert('Ошибка бронирования. Свяжитесь, пожалуйста по номеру телефона');
                }
            });
        }
    });


    let burgerElement = document.getElementById('burger');   //close-button action
    burgerElement.addEventListener('click', function () {
        document.getElementById('menu').classList.toggle('open');
        document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    });


    $('#menu a').click(() => {   //nav actions
        $('#menu').removeClass('open');
        document.getElementsByTagName('body')[0].style.overflow = 'visible';
    });
}