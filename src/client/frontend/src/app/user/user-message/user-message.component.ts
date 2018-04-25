import {Component, OnInit, ViewChild} from "@angular/core";
import {UserService} from "../user.service";
import {IFilter, IMeta} from "../../../common/http/http.service";
import {ModalDirective} from "ngx-bootstrap";

@Component({
  templateUrl: './user-message.component.html'
})

export class UserMessageComponent implements OnInit {
  public announcementsLoading: boolean;
  public announcements: any[] = [];
  public indexRows: any;
  public userCocMeta: IMeta = {pagination: {}};
  public id: string;
  public filter: IFilter = {
    page: 1,
    limit: 6,
    sorting: '',
    search: '',
  };
  @ViewChild('editModal') public editModal: ModalDirective;

  constructor(private user: UserService) {

  }

  ngOnInit() {
    this.getMessage();

  }

  //商会公告
  async getMessage(): Promise<any> {
    try {
      this.announcementsLoading = true;
      let data = await this.user.getMessages(this.filter).toPromise();
      this.announcementsLoading = false;
      this.announcements = data.result;
      this.userCocMeta = data.meta;
    } catch (err) {
      this.announcementsLoading = false;
    }
  }

  async pageChanged(event: any) {
    this.filter.page = event.page;
    this.filter.limit = event.itemsPerPage;
    await this.getMessage();
  }

  openModel(index: number) {
    this.indexRows = this.announcements[index];
    this.editModal.show();
  }
}
