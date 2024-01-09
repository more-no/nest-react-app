import { Observable, Subject } from 'rxjs';
// RxJS is a library for reactive programming using Observables, to make it easier to compose asynchronous or callback-based code.

// through this we can emit events anywhere in out application, and listen to them anywhere
class EventService {
  private subject = new Subject();

  emit(eventName: string, payload: any) {
    // debugger;
    this.subject.next({ eventName, payload });
  }

  listen(eventName: string, callback: (event: any) => void) {
    // debugger;
    this.subject.asObservable().subscribe((nextObj: any) => {
      if (eventName === nextObj.eventName) {
      }
      callback(nextObj.payload);
    });
  }
}

export default new EventService();
