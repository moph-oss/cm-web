import { Component, OnInit, Inject, Output, Input, EventEmitter } from '@angular/core';
import { JwtHelper } from 'angular2-jwt';

@Component({
  selector: 'cm-search-vendors',
  templateUrl: './search-vendors.component.html',
  styles: []
})
export class SearchVendorsComponent implements OnInit {

  @Output('onChange') onChange: EventEmitter<any> = new EventEmitter<any>();
  @Output('onSelect') onSelect: EventEmitter<any> = new EventEmitter<any>();
  @Input() public labelerType: any;
  @Input() public disabled: boolean;

  token: any;
  query: any = null;
  searchUrl: any;

  constructor(
    @Inject('API_URL') private apiUrl: string) {
    this.token = sessionStorage.getItem('token');
    this.searchUrl = `${this.apiUrl}/standard/search/labelers?token=${this.token}&type=${this.labelerType}`;
  }

  ngOnInit() { }

  setDefault(value: string) {
    this.query = value;
  }

  onClearSelected(event: any) {
    if (event.keyCode === 13 || event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40) {
      this.onChange.emit(false);
    } else {
      this.query = null;
      this.onChange.emit(true);
    }
  }

  handleResultSelected(event: any) {
    this.onSelect.emit(event);
    this.query = event.labeler_name;
  }

}
