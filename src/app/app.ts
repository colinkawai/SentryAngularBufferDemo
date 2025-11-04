import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import * as Sentry from '@sentry/angular';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('Sentry Replay Demo');
  
  customFeedbackMessage = '';
  userName = '';
  userEmail = '';
  statusMessage = '';

  ngOnInit() {
    /*
     const replay = this.getReplay();
    if (replay) {
      replay.startBuffering();
    }
      */
  }


  private getReplay(): any {
    return (Sentry as any).getReplay?.();
  }

  async handleCustomFeedback() {
    if (!this.customFeedbackMessage.trim()) {
      this.setStatusMessage('Please enter a feedback message');
      return;
    }

    const replay = this.getReplay();
    
    try {
      if (replay?.flush) {
        await replay.flush();
      }
      
      Sentry.captureFeedback({
        message: this.customFeedbackMessage,
        name: this.userName || 'Anonymous',
        email: this.userEmail || 'no-email@example.com',
      });

      this.setStatusMessage('Feedback submitted with replay!');
      this.customFeedbackMessage = '';
      this.userName = '';
      this.userEmail = '';
    } catch (error) {
      this.setStatusMessage('Error submitting feedback');
    }
  }

  private setStatusMessage(message: string) {
    this.statusMessage = message;
  }

  captureException() {
    Sentry.captureException(new Error('Captured exception to trigger on-error replay'));
    this.setStatusMessage('captureException sent');
  }
}
