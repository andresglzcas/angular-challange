export class AddAction {
  static readonly type = '[App] Add item';
  constructor(public selector: string, public payload: string) {}
}

export class DeleteAction {
  static readonly type = '[App] Delete';
  constructor(public selector: string, public id: number) {}
}

export class SetSelectedItem {
  static readonly type = '[App] Set';
  constructor(public payload: any) {
  }
}

export class UpdateAction {
  static readonly type = '[App] Update';
  constructor(public payload: any) {
  }
}
