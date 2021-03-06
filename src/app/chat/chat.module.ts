import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ChatWidgetComponent } from './chat-widget/chat-widget.component'
import { ChatInputComponent } from './chat-input/chat-input.component'

@NgModule({
  imports: [CommonModule],
  declarations: [ChatWidgetComponent, ChatInputComponent],
  exports: [ChatWidgetComponent],
  entryComponents: [ChatWidgetComponent],
})
export class ChatModule {}
