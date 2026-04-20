import { Component, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
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
export class ChatComponent implements AfterViewChecked {

  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;

  message: string = '';
  messages: Message[] = [];
  selectedProvider: string = 'gpt';
  isTyping: boolean = false;

  constructor(private chatService: ChatService) { }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.scrollContainer.nativeElement.scrollTop = this.scrollContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  onEnter(event: Event) {
    if ((event as KeyboardEvent).shiftKey) {
        return; // Allows multiline
    }
    event.preventDefault();
    this.send();
  }

  send() {
    if (!this.message.trim() || this.isTyping) return;

    const userMessage = this.message;
    this.messages.push({
      author: 'user',
      text: userMessage
    });

    this.message = '';
    this.isTyping = true;

    this.chatService.sendMessage(userMessage, this.selectedProvider)
      .subscribe({
        next: (res: ChatResponse) => {
          this.isTyping = false;
          this.messages.push({
            author: 'ai',
            text: res.response
          });
        },
        error: (err: any) => {
          this.isTyping = false;
          let msError = 'Erro genérico ao contactar servidor.';
          if(err.error && err.error.detail) {
              msError = err.error.detail;
          }
          this.messages.push({
            author: 'ai',
            text: `Erro: ${msError}`
          });
        }
      });
  }
}
