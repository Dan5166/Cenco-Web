import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  slides = [
    {
      imageUrl: 'https://via.placeholder.com/800x400',
      title: 'Slide 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      buttonText: 'Learn More'
    },
    {
      imageUrl: 'https://via.placeholder.com/800x400',
      title: 'Slide 2',
      description: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      buttonText: 'Shop Now'
    },
    {
      imageUrl: 'https://via.placeholder.com/800x400',
      title: 'Slide 3',
      description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      buttonText: 'Get Started'
    }
  ];
}
