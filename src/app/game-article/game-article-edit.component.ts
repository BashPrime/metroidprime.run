import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import * as getSlug from 'speakingurl';

import { GameArticle, SectionType, GameArticleSection } from '../model/game-article';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game-article-edit',
  templateUrl: './game-article-edit.component.html',
  styleUrls: ['./game-article-edit.component.scss']
})
export class GameArticleEditComponent implements OnInit {
  article: GameArticle = new GameArticle();
  articleForm: FormGroup;
  types = [
    { text: 'Markdown', value: SectionType.MARKDOWN },
    { text: 'YouTube', value: SectionType.YOUTUBE }
  ];
  typeEnums = {
    markdown: SectionType.MARKDOWN,
    youtube: SectionType.YOUTUBE
  };
  categories = [];
  valueChangeSub: any;

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit() {
    this.categories = this.route.snapshot.data.categories.data;

    this.articleForm = this.formBuilder.group({
      title: [''],
      slug: [''],
      category: [this.categories[0].id],
      content: this.formBuilder.array([ this.createSection() ])
    });

    this.onChanges();
  }

  ngOnDestroy() {
    if (this.valueChangeSub) {
      this.valueChangeSub.unsubscribe();
    }
  }

  private onChanges() {
    this.valueChangeSub = this.articleForm.valueChanges.subscribe(value => {
      const title = this.articleForm.get('title').value;
      if (title) {
        this.articleForm.patchValue({ slug: getSlug(title) }, { emitEvent: false });
      }
    });
  }

  createSection(): FormGroup {
    return this.formBuilder.group({
      type: [SectionType.MARKDOWN],
      markdown: [''],
      youtubeId: ['']
    });
  }

  addSection() {
    const content = this.articleForm.get('content') as FormArray;
    content.push(this.createSection());
  }

  deleteSection(index: number) {
    const content = this.articleForm.get('content') as FormArray;
    // Only remove if there are multiple sections in the form array
    if (content.length > 1) {
      content.removeAt(index);
    }
  }
}
