import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../services/chat';

import { Message } from '../models/message';
import { ChatResponse } from '../models/chat-response';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.html',
  styleUrls: ['./chat.css']
})
export class ChatComponent {

  message: string = '';
  messages: Message[] = [];
  selectedProvider: string = 'gpt';


  constructor(private chatService: ChatService) { }

  send() {

    if (!this.message.trim()) return;

    const userMessage = this.message;

    this.messages.push({
      author: 'user',
      text: userMessage
    });

    this.chatService.sendMessage(userMessage, this.selectedProvider)
      .subscribe({
        next: (res: ChatResponse) => {
          this.messages.push({
            author: 'ai',
            text: res.response
          });
        },
        error: () => {
          this.messages.push({
            author: 'ai',
            text: 'Erro ao conectar.'
          });
        }
      });

    this.message = '';
  }

}
