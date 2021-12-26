import { Component, OnInit } from '@angular/core';
import { AboutService } from './about.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private aboutService: AboutService) {
    this.showLoading = true;
   }

  titles = {
    history: '',
    about: ''
  }
  texts = {
    history: '',
    about: ''
  }
  showLoading = true;

  images: Object = [];

  ngOnInit(): void {
    this.aboutService.getAbout().subscribe(res => {
      this.titles.history = res.page1.title;
      this.texts.history = res.page1.text1 + ' ' + res.page1.text2;
      this.titles.about = res.page2.title;
      this.texts.about = res.page2.text;
      if(res.page2.text) {
        this.showLoading = false;
      }
    });
  }
}
