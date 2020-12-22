import { BehaviorSubject, Observable } from "rxjs";
import { ClientState } from "./clients/client-state";

export abstract class StateServiceBase<T> {
  private _stateSubject$: BehaviorSubject<T>;
  private _state$: Observable<T>;

  constructor(initialState: T) {
    this._stateSubject$ = new BehaviorSubject(initialState);
    this._state$ = this._stateSubject$.asObservable();
  }

  protected setState(entity: T): void {
    this._stateSubject$.next(entity);
  }

  protected selectState(): Observable<T> {
    return this._state$;
  }

  protected selectStateSnapshot(): T {
    return this._stateSubject$.value;
  }

  protected updateStateByProperty<K extends keyof T>(prop: K, payload: any): void {
    const stateCopy = this.deepClone(this._stateSubject$.value);
    stateCopy[prop] = payload;
    this.setState(stateCopy);
  }

  protected pluckStateProperty<K extends keyof T>(prop: K): T[K] {
    const state = this.selectStateSnapshot();
    return state[prop];
  }

  private deepClone(entity: T) {
    return JSON.parse(JSON.stringify(entity)) as T;
  }

}
