import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Item { name:string; }

@Injectable({
  providedIn: 'root'
})
export class ConexionService {

  private itemsCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;

  private itemDoc: AngularFirestoreDocument<Item>;

  constructor(private afs: AngularFirestore) {
    //Esta itemsCollection (variable creada arriba) va a traer una colección llamada items (creada en firebase)
    this.itemsCollection = afs.collection<Item>('items');
    //Estos items (variable creada arriba) van na ser igual a la colección items y que va a evaluar los campos.
    this.items = this.itemsCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data() as Item;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    )
  }

  listaItems() {
    return this.items;
  }
  agregarItem(item:Item) {
    this.itemsCollection.add(item);
  }
  eliminarItem(item) {
    this.itemDoc = this.afs.doc<Item>(`items/${item.id}`);
    this.itemDoc.delete();
  }
  editarItem(item){
    this.itemDoc = this.afs.doc<Item>(`items/${item.id}`);
    this.itemDoc.update(item);
  };
}
