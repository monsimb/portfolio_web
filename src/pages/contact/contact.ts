import { Component, HostListener, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ContactService, ContactPayload } from './contact.services';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss']
})
export class ContactPage {
  private contactSvc = inject(ContactService);

  contactForm = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(5)] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    position: new FormControl('', { nonNullable: true }),
    message: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  loading = signal(false);

  get name() { return this.contactForm.get('name')!; }
  get email() { return this.contactForm.get('email')!; }
  get message() { return this.contactForm.get('message')!; }

  onSubmit() {
    this.contactForm.markAllAsTouched();
    if (this.contactForm.invalid) return;

    const payload = this.contactForm.getRawValue() as ContactPayload;
    this.loading.set(true);

    this.contactSvc.send(payload).subscribe({
      next: () => {
        alert('Thanks! Your message was sent.');
        this.contactForm.reset({ name: '', email: '', position: '', message: '' });
        this.loading.set(false);
      },
      error: (err) => {
        console.error('[SEND ERROR]', err);
        alert('Sorry—something went wrong sending your message.');
        this.loading.set(false);
      }
    });
  }

  @HostListener('window:click', ['$event'])
  onWindowClick(ev: MouseEvent) {
    console.log('[WINDOW CLICK]', ev.target);
  }
}
