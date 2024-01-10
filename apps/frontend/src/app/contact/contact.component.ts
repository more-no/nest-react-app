// created with 'ng g component contact -m contact'
import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.sass',
})
export class ContactComponent {
  contactForm = new FormGroup({
    senderName: new FormControl(''),
    senderEmail: new FormControl(''),
    senderMessage: new FormControl(''),
  });

  submitForm() {
    console.log(this.contactForm.value);
    console.log(this.contactForm.valid);
  }
}
