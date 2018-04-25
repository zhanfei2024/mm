import {Injectable, Inject} from '@angular/core';
import {Title} from '@angular/platform-browser';
import * as _ from "lodash";
import {ɵgetDOM as getDOM} from '@angular/platform-browser';
import {DOCUMENT} from '@angular/platform-browser';

@Injectable()

export class SeoService {
  private titleService: Title;
  private conpanyId: string;
  private headElement: HTMLElement;
  public siteTitle: string = '';
  private DOM: any;

  constructor(titleService: Title,
              @Inject(DOCUMENT) private document) {
    this.titleService = titleService;
    this.DOM = getDOM();

    this.headElement = this.DOM.querySelector(document, 'head');
  }

  public getTitleContent(): string {
    return this.siteTitle;
  }

  public getTitle(): string {
    return this.titleService.getTitle();
  }

  public setTitle(newTitle: string, Title?: string) {
    if (!_.isUndefined(Title)) {
      let data = newTitle + Title;
      this.titleService.setTitle(data);
    } else {
      this.titleService.setTitle(newTitle + this.siteTitle);
    }
  }

  public setKeyWords(content: string): void {
    let el: HTMLElement;
    el = this.DOM.querySelector(document, '#keywords');
    el.setAttribute('content', content);
  }

  public setDescription(content: string): void {
    let el: HTMLElement;
    el = this.DOM.querySelector(document, '#description');
    el.setAttribute('content', content);
  }

  public setTag(name: string, content: string) {
    // let isExist: boolean = false;
    // _.forEach(this.document.getElementsByTagName('meta'), (meta:any) => {
    //   if (!_.isUndefined(meta.attributes['name'])) {
    //     if (meta.attributes['name'].value === name) {
    //       isExist = true;
    //       meta.attributes['content'] = content;
    //       return false;
    //     }
    //   }
    // });
    // if (!isExist) {
      let el: HTMLElement;
      el = this.DOM.createElement('meta');
      el.setAttribute('name', name);
      this.headElement.appendChild(el);
      el.setAttribute('content', content);
    // }
  }
}
