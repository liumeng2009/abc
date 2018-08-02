import {Injectable} from '@angular/core'
import {Observable} from 'rxjs'
import io from 'socket.io-client'

@Injectable()
export class WebSocketService{
  constructor(){}
  private url='http://192.168.1.106:8102'
  createObservableSocket():Observable<any>{
    let socket = io(this.url);
    return new Observable(
      observer=>{
        socket.onopen=()=>{
          console.log('连接了');
        }
        socket.on('sign complete',(data)=>{
          observer.next(data)
        })

        socket.onclose=(event)=>{
          console.log('关闭了');
        }
      }
    )
  }
}
