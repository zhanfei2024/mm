import {Component, OnInit} from '@angular/core';
import * as _ from "lodash";
import {ToasterService} from "angular2-toaster";
import {ActivatedRoute, Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {AddKnow, AddKnowService} from "../chamber-know.service";
import {ChamberService} from "../../chamber.service";
import {Config} from "../../../../common/config/config";

@Component({
  templateUrl: './chamber-know-post.component.html',
})
export class ChamberKnowPostComponent implements OnInit {
  public title: string;
  public submitLoading: boolean;
  public id: string;
  public know: any;
  public postUrl: any;
  public submitShow: boolean = false;

  constructor(private addKnowService: AddKnowService,
              private toasterService: ToasterService,
              private translate: TranslateService,
              private config: Config,
              private chamberService: ChamberService,
              private activeRouter: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.id = localStorage.getItem('chamber');
    this.activeRouter.data.subscribe((data: { FindResolve: any }) => {
      if (!_.isUndefined(data.FindResolve)) {
        this.know = data.FindResolve.result;
        this.title = 'chamber.btn.edit_know';
        this.postUrl = `${this.config.apiEndPoint}enterprise/enterprises/cocs/${this.id}/coc-rules/${this.know.id}`;
      } else {
        this.know = new AddKnow();
        this.postUrl = `${this.config.apiEndPoint}enterprise/enterprises/cocs/${this.id}/coc-rules`;
        this.title = 'chamber.btn.add_know';
      }
    });
    this.know.type = 'notice';
  }

  async onSubmit() {
    try {
      this.submitLoading = true;
      let funcName = _.isUndefined(this.know.id) ? 'post' : 'put';
      let message = funcName === 'store' ? 'message.store_message' : 'message.update_message';
      await this.chamberService.makeFileRequest(this.postUrl, this.know, funcName);
      this.toasterService.pop('success', 'Success', this.translate.instant(message));
      this.submitLoading = false;
      this.router.navigate(['/chamber', this.id, 'know', 'list'])
    } catch (err) {
      this.submitLoading = false;
      this.toasterService.pop('error', 'error', err.message);
    }
  }
}
