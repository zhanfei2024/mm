import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";

@Component({
  selector: 'custom-pagination',
  templateUrl: './custom-pagination.component.html'
})

export class CustomPaginationComponent implements OnInit{

  @Input() itemsPrePage: string = '';
  @Input() currentPage: string = '';
  @Input() itemsNextPage: string = '';

  @Output() pageChanged = new EventEmitter();


  ngOnInit(){

  }

  goPage(page: string): void {
    this.pageChanged.emit({page: page});
  }

}
