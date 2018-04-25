import {Component, OnInit} from "@angular/core";
import {UserService} from "../user.service";
import {ActivatedRoute} from "@angular/router";
import {IFilter, IMeta} from "../../../common/http/http.service";

@Component({
  templateUrl: './user-notice.component.html'
})

export class UserNoticeComponent implements OnInit {
  public announcementsLoading: boolean;
  public announcements: any[] = [];
  public userCocMeta: IMeta = {pagination: {}};
  public id: string;
  public filter: IFilter = {
    page: 1,
    limit: 4,
    sorting: '',
    search: '',
  };
  constructor(private user: UserService,
              private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
     this.activatedRoute.params.subscribe(
       (params)=>{
          this.id = params['id'];
          this.getAnnouncements(this.id);
       }
     )
  }

  //商会公告
  async getAnnouncements(id: string): Promise<any> {
    try {
      this.announcementsLoading = true;
      this.filter['cocId'] = id;
      let data = await this.user.getAnnouncements(id,this.filter).toPromise();
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
    await this.getAnnouncements(this.id);
  }
}
