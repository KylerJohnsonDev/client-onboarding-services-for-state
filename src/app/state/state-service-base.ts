import { BehaviorSubject, Observable } from "rxjs";
import { pluck } from 'rxjs/operators';

export abstract class StateServiceBase<T> {
  private _stateSubject$: BehaviorSubject<T>;
  private _state$: Observable<T>;

  constructor(initialState: T) {
    this._stateSubject$ = new BehaviorSubject(initialState);
    this._state$ = this._stateSubject$.asObservable();
  }

  setState(entity: T): void {
    const clone = this.deepClone(entity);
    this._stateSubject$.next(clone);
  }

  readState(): Observable<T> {
    return this._state$;
  }

  pluckProperty<K extends keyof T>(key: K): Observable<Partial<T>> {
    return this._state$.pipe(
      pluck(key)
    );
  }

  setProperty<K extends keyof T>(key: K, payload: any): void {
    const stateClone = this.deepClone(this._stateSubject$.value);
    stateClone[key] = payload;
    this.setState(stateClone);
  }

  private deepClone(entity: T) {
    return JSON.parse(JSON.stringify(entity)) as T;
  }

}
