import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';
import { AddAction, DeleteAction, SetSelectedItem, UpdateAction } from './app.actions';

export class AppSateModel {
  public token!: string;
  public users!: any[];
  public products!: any[];
  public categories!: any[];
  public selectedItem: any
}

const defaults = {
  token: '',
  users: [],
  products: [],
  categories: [],
  selectedItem: ''
};

@State<AppSateModel>({
  name: 'auth',
  defaults,
})
@Injectable()
export class AppState {
  @Action(AddAction)
  add(
    { getState, setState }: StateContext<AppSateModel>,
    { selector, payload }: AddAction
  ) {
    const state = getState();
    setState({  
      ...state,
      [selector]: [payload]
    });
  }

  @Action(DeleteAction)
  delete({ getState, setState }: StateContext<AppSateModel>, { id }: DeleteAction ) {
    const state = getState();
    const filteredArray = state.users.filter((item) => item.id !== id);
    console.log(id, filteredArray)
    setState({
      ...state,
      users: filteredArray,
    });
  }


  @Action(SetSelectedItem)
  setSelected({getState, setState}: StateContext<AppSateModel>, {payload}: SetSelectedItem) {
    console.log(payload)
      const state = getState();
      setState({
          ...state,
          selectedItem: payload
      });
  }


  @Action(UpdateAction)
  update({getState, setState}: StateContext<AppSateModel>, {payload}: UpdateAction) {
          const state = getState();
          const itemsList = [...state.users];
          const itemIndex = itemsList.findIndex(item => item.id === payload.id);
          itemsList[itemIndex] = payload;
          setState({
              ...state,
              users: itemsList,
          });
  }
}
