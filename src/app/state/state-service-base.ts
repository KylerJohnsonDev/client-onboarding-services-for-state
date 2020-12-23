import { BehaviorSubject, Observable } from "rxjs";

export abstract class StateServiceBase<T> {
  private _stateSubject$: BehaviorSubject<T>;
  private _state$: Observable<T>;

  constructor(initialState: T) {
    this._stateSubject$ = new BehaviorSubject(initialState);
    this._state$ = this._stateSubject$.asObservable();
  }

  setState(entity: T): void {
    this._stateSubject$.next(entity);
  }

  selectState(): Observable<T> {
    return this._state$;
  }

  selectStateSnapshot(): T {
    return this._stateSubject$.value;
  }

  updateStateByProperty<K extends keyof T>(prop: K, payload: any): void {
    const stateCopy = this.deepClone(this._stateSubject$.value);
    stateCopy[prop] = payload;
    this.setState(stateCopy);
  }

  pluckStateProperty<K extends keyof T>(prop: K): T[K] {
    const state = this.selectStateSnapshot();
    return state[prop];
  }

  private deepClone(entity: T) {
    return JSON.parse(JSON.stringify(entity)) as T;
  }

}
