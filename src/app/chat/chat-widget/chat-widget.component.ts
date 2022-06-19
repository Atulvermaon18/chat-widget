import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core'
import { Subject } from 'rxjs'
import { fadeIn, fadeInOut } from '../animations'

const randomMessages = {
  email:
    '<input type="email" placeholder="Please enter you Email" style="width:200px;">',
  tel: '<input type="text" placeholder="Please enter you Phone Number" style="width:200px;">',
  option: ['MORNING', 'EVENING'],
}

const rand = (max) => Math.floor(Math.random() * max)

@Component({
  selector: 'chat-widget',
  templateUrl: './chat-widget.component.html',
  styleUrls: ['./chat-widget.component.css'],
  animations: [fadeInOut, fadeIn],
})
export class ChatWidgetComponent implements OnInit {
  @ViewChild('bottom') bottom: ElementRef
  @Input() public theme: 'blue' | 'grey' | 'red' = 'blue'

  public _visible = false

  public get visible() {
    return this._visible
  }

  @Input() public set visible(visible) {
    this._visible = visible
    if (this._visible) {
      setTimeout(() => {
        this.scrollToBottom()
        this.focusMessage()
      }, 0)
    }
  }

  public focus = new Subject()

  public operator = {
    name: 'ZI Chat',
    status: 'online',
    avatar: `https://randomuser.me/api/portraits/men/${rand(100)}.jpg`,
  }

  public client = {
    name: 'Guest User',
    status: 'online',
    avatar: `https://randomuser.me/api/portraits/men/${rand(100)}.jpg`,
  }

  public messages = []

  public addMessage(from, text, type: 'received' | 'sent', input) {
    this.messages.unshift({
      from,
      text,
      type,
      input,
      date: new Date().getTime(),
    })
    this.scrollToBottom()
  }

  public scrollToBottom() {
    if (this.bottom !== undefined) {
      this.bottom.nativeElement.scrollIntoView()
    }
  }

  public focusMessage() {
    this.focus.next(true)
  }

  public initMessage(input) {
    debugger
    this.addMessage(this.operator, randomMessages[input], 'received', input)
  }

  ngOnInit() {
    setTimeout(() => (this.visible = true), 1000)
    setTimeout(() => {
      this.addMessage(
        this.operator,
        'Hi, how can we help you?',
        'received',
        'plain-text',
      )
    }, 1500)
  }

  public toggleChat() {
    this.visible = !this.visible
  }

  public sendMessage({ message }) {
    if (message.trim() === '') {
      return
    }
    this.addMessage(this.client, message, 'sent', 'plain-text')
    setTimeout(() => {
      this.addMessage(
        this.operator,
        'Hi, Please enter your email?',
        'received',
        'plain-text',
      )
      this.initMessage('email')
      this.currentInput = 'email'
    }, 1500)
  }
  currentInput: any = 'plain-text'
  onKeyDownEvent(type: any) {
    this.currentInput = type
    switch (type) {
      case 'email':
        setTimeout(() => {
          this.addMessage(
            this.operator,
            'Thank you for your email, Kindly provide your phone',
            'received',
            'plain-text',
          )
        }, 1500)
        setTimeout(() => this.initMessage('tel'), 2000)
        break
      case 'tel':
        setTimeout(() => {
          this.addMessage(
            this.operator,
            'Thank you for your time, When would you like us to call',
            'received',
            'plain-text',
          )
        }, 1500)
        setTimeout(() => this.initMessage('option'), 2000)
        break

      case 'option':
        setTimeout(() => {
          this.addMessage(
            this.operator,
            'Great, we will get back to you on same',
            'received',
            'plain-text',
          )
        }, 1500)
        this.currentInput = 'plain-text'
        break
    }
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === '/') {
      this.focusMessage()
    }
    if (event.key === '?' && !this._visible) {
      this.toggleChat()
    }
  }
}
