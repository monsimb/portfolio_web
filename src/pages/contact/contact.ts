import { Component, HostListener, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // CommonModule needed for @if and |json
  templateUrl: './contact.html',
  styleUrls: ['./contact.scss']
})
export class ContactPage {
  contactForm = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.minLength(5)] }),
    email: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.email] }),
    position: new FormControl('', { nonNullable: true }),
    message: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
  });

  get name() { return this.contactForm.get('name')!; }
  get email() { return this.contactForm.get('email')!; }
  get message() { return this.contactForm.get('message')!; }

  ping = signal(false);

  submit() {
    console.log('[SUBMIT]', this.contactForm.value);
    alert('submitted');
  }

  @HostListener('window:click', ['$event'])
  onWindowClick(ev: MouseEvent) {
    console.log('[WINDOW CLICK]', ev.target);
  }
}
