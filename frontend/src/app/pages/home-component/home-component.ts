import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home-component.html',
})
export class HomeComponent {
  ngAfterViewInit() {
    let slides = document.querySelectorAll('.carousel-slide');

    let index = 0;

    setInterval(() => {
      slides.forEach((slide: any) => slide.classList.add('hidden'));

      slides[index].classList.remove('hidden');

      index++;

      if (index >= slides.length) {
        index = 0;
      }
    }, 4000);
  }

  heroSlides = [
    {
      title: 'Gaming Laptop',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8',
    },
    {
      title: 'Wireless Mouse',
      image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3',
    },
    {
      title: 'High Speed Router',
      image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97',
    },
  ];

  
}
