import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class MetaService {
  metaData: any[] = [];
  constructor(private meta: Meta, private titleService: Title) {}

  updateMetaTags(data: any[], title: string) {
    this.metaData = data;
    this.titleService.setTitle(title);

    this.metaData.forEach((ele) => {
      this.meta.addTag(ele);
    });
  }
}
