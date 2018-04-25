import {Component, OnInit, ViewChild} from '@angular/core';
import {ModalDirective} from "ngx-bootstrap";
import * as _ from 'lodash';
import {ChamberService} from "../chamber.service";
import {ActivatedRoute, Router} from "@angular/router";
import {GlobalSettingObservableService} from "../../../common/global/global";


@Component({
  selector: 'app-chamber-left',
  templateUrl: './chamber-left.component.html',
})
export class ChamberLeftComponent implements OnInit {
  public id: string;
  public index: string;
  public coc: any;
  public current: any;
  @ViewChild('inviteModal') inviteModal: ModalDirective;

  constructor(private chamberService: ChamberService,
              private activeRouter: ActivatedRoute,
              private globalSettingObservableService: GlobalSettingObservableService,
              private router: Router) {
  }

  ngOnInit() {
    this.activeRouter.params.subscribe((params) => {
      this.id = localStorage.getItem('chamber');
      if (_.isUndefined(this.globalSettingObservableService.cocs)) {
        this.globalSettingObservableService.getCoc().subscribe((data) => {
          this.coc = data;
          let index = _.findIndex(this.coc, {id: _.toNumber(this.id)});
          this.current = this.coc[index];
        });
      } else {
        this.id = localStorage.getItem('chamber');
        this.coc = this.globalSettingObservableService.cocs;
        let index = _.findIndex(this.coc, {id: _.toNumber(this.id)});
        this.current = this.coc[index];
      }
    });
  }


  selected(id: string) {
    this.index = id;
  }

  selectChamber() {
    const isApproved = this.coc[this.index].isApproved ? 'true' : 'false';
    if (this.coc[this.index].isApproved) {
      localStorage.setItem('chamber', this.coc[this.index].id);
      localStorage.setItem('isApproved', isApproved);
      this.router.navigate(['/chamber', this.coc[this.index].id, 'home']);
      this.inviteModal.hide();
    } else {
      localStorage.setItem('chamber', this.coc[this.index].id);
      this.router.navigate(['/chamber', 'settled', 'success']);
    }
  }


}
