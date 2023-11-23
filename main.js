const toggleMenuBtn = document.querySelector('#toggleMenuBtn')
const dropdownMenu = document.getElementById('dropdownMenu')

toggleMenuBtn.addEventListener('click', function () {
    if (dropdownMenu.style.display === 'none' || dropdownMenu.style.display === "") {
        dropdownMenu.style.display = 'block'
    } else {
        dropdownMenu.style.display = 'none'
    }
})
window.addEventListener('click', function (event) {
    if (!event.target.matches('#toggleMenuBtn')) {
        dropdownMenu.style.display = 'none';
    }
})


const prevBtn = document.getElementById('prevBtn')
const nextBtn = document.getElementById('nextBtn')
const slides = document.querySelectorAll('.slide')

let currentslide = 0;

function showSlide(index) {
    slides.forEach((slide, i) => {
        if (i === index) {
            slide.style.display = 'block'
        } else {
            slide.style.display = 'none'
        }
    })
}
showSlide(currentslide)

prevBtn.addEventListener('click', function () {
    currentslide = (currentslide - 1 + slides.length) % slides.length
    showSlide(currentslide)    
})
nextBtn.addEventListener('click', function () {
    currentslide = (currentslide + 1) % slides.length
    showSlide(currentslide)
})

document.getElementById('feedbackForm').addEventListener('submit', function (event){

    event.preventDefault();

    let formData = new FormData(this);

    let feedbackData = {};

    formData.forEach(function (value, key) {
        feedbackData[key] = value;
    });

    fetch ('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
        },
        body: JSON.stringify(feedbackData),
    })
    .then(response => response.json())
    .then(data => {
        alert('с вами свяжутся')
        console.log('успешно отправлено:', data);
        this.reset();
    })
    .catch(error => {
        console.error('ошибка', error);
    });
});