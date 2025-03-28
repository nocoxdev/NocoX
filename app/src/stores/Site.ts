import { computed, makeObservable, observable } from 'mobx';
import { LNG_KEY, SITE_TITLE, THEME_KEY } from '@/constants';

export class Site {
  @observable private _theme: string =
    localStorage.getItem(THEME_KEY) || 'light';

  readonly title = SITE_TITLE;

  constructor() {
    makeObservable(this);
  }

  @computed
  get theme() {
    return this._theme;
  }

  get lang() {
    return localStorage.getItem(LNG_KEY) || navigator.language;
  }
}
