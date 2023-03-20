import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-notice',
  templateUrl: './notice.component.html',
  styleUrls: ['./notice.component.css']
})
export class NoticeComponent implements OnInit {

  nameSearch = '';

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.paramMap.subscribe(data => {
      console.log(data);
      this.nameSearch = data.get('name');
    });
  }

  ngOnInit(): void {
  }

}
