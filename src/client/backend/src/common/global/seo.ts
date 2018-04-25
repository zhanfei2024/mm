import {Injectable, Inject} from '@angular/core';
import {Title} from '@angular/platform-browser';
import * as _ from 'lodash';
import {ɵgetDOM as getDOM} from '@angular/platform-browser';
import {DOCUMENT} from '@angular/platform-browser';

@Injectable()

export class SeoService {
  private titleService: Title;
  private headElement: HTMLElement;
  private DOM: any;

  constructor(titleService: Title,
              @Inject(DOCUMENT) private document) {
    this.titleService = titleService;
    this.DOM = getDOM();

    this.headElement = this.DOM.querySelector(document, 'head');
  }

  public getTitle(): string {
    return this.titleService.getTitle();
  }

  public setTitle(newTitle: string) {
    this.titleService.setTitle(newTitle);
  }

  public setTag(name: string, content: string) {
    // let isExist = false;
    // _.forEach(this.document.getElementsByTagName('meta'), (meta) => {
    //   if (!_.isUndefined(meta.attributes['name'])) {
    //     if (meta.attributes['name'].value === name) {
    //       isExist = true;
    //       meta.attributes['content'] = content;
    //       return false;
    //     }
    //   }
    // });
    // if (!isExist) {
    //
    // }
    let el: HTMLElement;
    el = this.DOM.createElement('meta');
    el.setAttribute('name', name);
    this.headElement.appendChild(el);
    el.setAttribute('content', content);
  }
}
