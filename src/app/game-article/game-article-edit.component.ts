import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import * as getSlug from 'speakingurl';

import { GameArticle, GameArticleSection, SectionType } from '../model/game-article';
import { GameService } from '../services/game.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game-article-edit',
  templateUrl: './game-article-edit.component.html',
  styleUrls: ['./game-article-edit.component.scss']
})
export class GameArticleEditComponent implements OnInit {
  isEdit = false;
  article: GameArticle;
  game: string;
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
  submitted = false;

  constructor(private gameService: GameService, private formBuilder: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit() {
    this.categories = this.route.snapshot.data.categories.data;

    this.route.parent.params.subscribe(params => {
      this.game = params['game'];
    });

    this.articleForm = this.formBuilder.group({
      title: [''],
      slug: [''],
      category: [this.categories[0].id],
      content: this.formBuilder.array([ this.createSection() ])
    });

    // Set flag, form, if an article is being edited
    if (this.route.snapshot.data.isEdit) {
      this.isEdit = true;
      this.article = this.route.snapshot.data.article.data as GameArticle;
      
      this.articleForm.patchValue({
        title: this.article.title,
        slug: this.article.name,
        category: this.article.category.id
      });

      this.articleForm.setControl('content', this.getArticleContentFormArray(this.article.content));
    }

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

  onArticleSubmit() {
    if (this.articleForm.valid) {
      this.gameService.createArticle(this.game, this.articleForm.value).subscribe(article => {
        alert('success');
      });
    }
  }

  createSection(): FormGroup {
    return this.formBuilder.group({
      type: [SectionType.MARKDOWN],
      markdown: [''],
      youtubeId: ['']
    });
  }

  getArticleContentFormArray(newContent: GameArticleSection[]): FormArray {
    const content = this.formBuilder.array([]);

    for (const section of newContent) {
      content.push(this.formBuilder.group({
        type: [section.type],
        markdown: [section.markdown],
        youtubeId: [section.youtubeId]
      }));
    }

    return content;
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

  getTitle() {
    if (this.isEdit) {
      return 'Editing \'' + this.article.title + '\'';
    }

    return 'Create Article';
  }
}
