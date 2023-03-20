import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/api/product';
import { ProductoModel } from 'src/app/models/productos-model';
import { PhotoService } from 'src/app/services/photo.service';
import { ProductService } from 'src/app/services/product.service';
import { faCoffee, faUserTie, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';

interface Message {
  emisor: string;
  sender: string;
  text: string;
  timestamp: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {
  faCofee = faCoffee; faUserTie = faUserTie; faCircleUser = faCircleUser; faSquarePlus = faSquarePlus;
    @ViewChild('scrollBar', { static: true }) scrollBar!: ElementRef;
    message: string = '';
    openPage:number = 0;
    

    public timestamp: string;
    

    constructor() {
      this.timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    }

    ngOnInit(): void {
        
    }

    
    
    messages: Message[] = [
        {
          emisor: 'bot',
          sender: 'bot-inicia-caso',
          text: 'Caso Abierto',
          timestamp: '9:00'
        },
        {
          emisor: 'Yo',
          sender: 'me',
          text: 'Hola, ¿cómo estás?',
          timestamp: '10:00'
        },
        {
          emisor: 'Lucas Sottil',
          sender: 'other',
          text: 'Hola, estoy bien gracias. ¿Y tú?',
          timestamp: '10:02'
        },
        {
          emisor: 'Yo',
          sender: 'me',
          text: 'Estoy bien también, gracias.',
          timestamp: '10:05'
        }
        ,
        {
          emisor: 'Yo',
          sender: 'me',
          text: 'Podrías ayudarme con unos temitas que tengo con EKS?.',
          timestamp: '10:05'
        }
    ];


    sendMessage(): void {
        
        console.log(this.timestamp);
        let timeStampStr = this.timestamp.toString();
        if(timeStampStr[0]=='0'){
          timeStampStr = timeStampStr.slice(1);
        }

        timeStampStr = timeStampStr.replace(/\s/g, '');
        if(timeStampStr.includes('p.m.')){
          timeStampStr = timeStampStr.replace('p.m.', ' PM');
        }
        else{
          timeStampStr = timeStampStr.replace('a.m.', ' AM');
        }
        console.log(timeStampStr);
        this.timestamp=timeStampStr;
        




        if (this.message.trim() !== '') {
          const newMessage: Message = {
            emisor: 'bot',
            sender: 'me',
            text: this.message,
            timestamp: this.timestamp
          };
          this.messages.push(newMessage);
          this.message = ''; // limpiar el campo de mensaje
          console.log(this.messages);

          setTimeout(() => {
              this.scrollToBottom();
            }, 0);


      }
      else{
          console.log("No se puede enviar un mensaje vacio");
      }

    }

    scrollToBottom() {
        const scrollHeight = this.scrollBar.nativeElement.scrollHeight;
        this.scrollBar.nativeElement.scrollTop = scrollHeight;
        this.scrollBar.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });
      }
    
      openElement(elemento:number) {
        this.openPage = elemento;
        
      }
}
