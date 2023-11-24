import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-template',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})
export class TemplateComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
  }

}
