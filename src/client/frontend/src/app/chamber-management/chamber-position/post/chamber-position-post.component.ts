import {Component, OnInit} from '@angular/core';
import * as _ from "lodash";
import {ToasterService} from "angular2-toaster";
import {ActivatedRoute, Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {Position, ChamberPositionService} from "../chamber-position.service";

@Component({
  templateUrl: './chamber-position-post.component.html',
})
export class ChamberPositionPostComponent implements OnInit {
  public title: string;
  public submitLoading: boolean;
  public id: string;
  public know: any;
  public submitShow: boolean = false;

  constructor(private chamberPositionService: ChamberPositionService,
              private toasterService: ToasterService,
              private translate: TranslateService,
              private activeRouter: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.id = localStorage.getItem('chamber');
    this.activeRouter.data.subscribe((data: { FindResolve: any }) => {
      if (!_.isUndefined(data.FindResolve)) {
        this.know = data.FindResolve.result;
        this.title = 'chamber.btn.edit_position';
      } else {
        this.know = new Position();
        this.title = 'chamber.btn.add_position';
      }
    });
    // this.know.type = 'position';
  }

  async onSubmit() {
    try {
      this.submitLoading = true;

      let funcName = _.isUndefined(this.know.id) ? 'store' : 'update';
      let message = funcName === 'store' ? 'message.store_message' : 'message.update_message';
      await this.chamberPositionService[funcName](this.id, this.know).toPromise();
      this.toasterService.pop('success', 'Success', this.translate.instant(message));
      this.submitLoading = false;
      this.router.navigate(['/chamber', this.id, 'positions', 'list'])
    } catch (err) {
      this.submitLoading = false;
      this.toasterService.pop('error', 'error', err.message);
    }
  }
}
