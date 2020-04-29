// Section 1
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Tutorial } from './../model/tutorial.model';
import { AddTutorial, RemoveTutorial } from './../actions/tutorial.actions'
import { Injectable } from '@angular/core';

// Section 2
export class TutorialStateModel {
    tutorials: Tutorial[];
}

// Section 3
@State<TutorialStateModel>({
    name: 'tutorials',
    defaults: {
        tutorials: []
    }
})
@Injectable()
export class TutorialState {

    // Section 4
    @Selector()
    static getTutorials(state: TutorialStateModel) {
        return state.tutorials;
    }

    // Section 5
    @Action(AddTutorial)
    add({getState, patchState }: StateContext<TutorialStateModel>, { payload }:AddTutorial) {
        const state = getState();
        patchState({
            tutorials: [...state.tutorials, payload]
        });
    }

    @Action(RemoveTutorial)
    remove({getState, patchState }: StateContext<TutorialStateModel>, { payload }:RemoveTutorial) {
        patchState({
            tutorials: getState().tutorials.filter(a => a.name !== payload)
        });
    }

}