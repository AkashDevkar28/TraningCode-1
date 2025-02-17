
const prev = document.querySelector('.carousel-control-prev');
const next = document.querySelector('.carousel-control-next');

const images= [
            "https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=2020&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://plus.unsplash.com/premium_photo-1678566153919-86c4ba4216f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
]

let index = 0;




function updateImage(){
    // carouselItems.forEach(item => item.classList.remove('active'));
    // carouselItems[index].classList.add('active');
    document.querySelector(".carousel-item.active img").src = images[index];
}

prev.addEventListener('click',function(){
    index = (index - 1 + images.length) % images.length;
    updateImage();
})

next.addEventListener('click',function(){
    index = (index + 1) % images.length;
    updateImage();
});

