import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable, Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestorageService {

  constructor(private storage: AngularFireStorage) { }

  uploadFile(filePath: string, file: File): Observable<string> {
    const uploadAsync$ = new Subject<string>();
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, file).snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url: string) => {
          uploadAsync$.next(url);
          uploadAsync$.complete();
        }, (error) => {
          uploadAsync$.error(error);
        });
      }),
    ).subscribe(() => void 0, (error) => {
      uploadAsync$.error(error);
    });
    return uploadAsync$.asObservable();
  }
}
