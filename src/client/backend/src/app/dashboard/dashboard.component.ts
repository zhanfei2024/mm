import {Component, OnInit} from "@angular/core";
import {DashboardService} from "./dashboard.service";


@Component({
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {

  public tableLoading: boolean = false;
  public rows: any;
  public filter: any = {
    cocs: "1",
    members: "1",
    users: "1",
    msgs: "1",
    ccs: "1",
    cms: "1",
    cas: "1",
    tams: "1",
    yacs: "1",
    yams: "1",
    macs: "1",
    mams: "1",
    tacs: "1"
  };

  constructor(private dashboardService: DashboardService) {
  }

  ngOnInit() {
    this.readTables();
  }

  async readTables(): Promise<any> {
    try {
      this.tableLoading = true;
      this.rows  = await this.dashboardService.get(this.filter).toPromise();
      this.tableLoading = false;
    } catch (err) {
      this.tableLoading = false;
    }
  }


}
