import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicesPageService } from '../../services/service-page/services-page.service';
import { ServicesPage } from '../../models/Services-page';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-services-page-popup',
  standalone: false,
  templateUrl: './services-page-popup.component.html',
  styleUrl: './services-page-popup.component.css'
})
export class ServicesPagePopupComponent {


  editorModules = {
  toolbar: [
   
    ['bold', 'italic', 'underline', 'strike'],       // toggled buttons
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ script: 'sub' }, { script: 'super' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
    ['link', 'image', 'video'],
    ['clean'] 
                                
  ],
}
  areaForm: FormGroup;

  @Output() close = new EventEmitter<void>();
  @Output() formSubmit = new EventEmitter<any>();

  constructor(private fb: FormBuilder, private service: ServicesPageService,private toastr: ToastrService) {
    this.areaForm = this.fb.group({
      description: ['', [Validators.required,Validators.minLength(3)]],
      serviceType: ['',Validators.required],
      note: ['', Validators.required], 
      enforceCellNumber:[false],
      sendReferenceNumber:[false],
      isActive: [false],
    });
  }
  
  onSubmit() {
  if (this.areaForm.invalid) {
    this.areaForm.markAllAsTouched();

    const firstInvalidControl = document.querySelector('.ng-invalid');
    if (firstInvalidControl) {
      firstInvalidControl.scrollIntoView({ behavior: 'smooth' });
    }

    // this.toastr.error('Please fill in all required fields.', 'Form Invalid');
    return;
  }

  const formData = this.areaForm.value;

  const payload: ServicesPage = {
    Description: formData.description,
    ServiceType: formData.serviceType,
    Note: formData.note,
    NotePlain: this.stripHtmlTags(formData.note),
    EnforceMobileNumber: formData.enforceCellNumber,
    SendRefSMSEnabled: formData.sendReferenceNumber,
    IsActive: formData.isActive,
  };

  this.service.create(payload).subscribe({
    next: (response) => {
      this.toastr.success('Service created successfully!', 'Success');
      this.formSubmit.emit(response);
      this.close.emit();
    },
    error: (err) => {
      console.error('Failed to add service:', err);
      this.toastr.error('Failed to add service. Please try again.', 'Error');
    },
  });
}

  private stripHtmlTags(html: string): string {
  const div = document.createElement('div');
  div.innerHTML = html;
  return div.textContent || div.innerText || '';
}


  onCancel() {
    this.areaForm.reset(); 
    this.close.emit();
  }

  onClose() {
     this.areaForm.reset(); 
    this.close.emit();
  }

  get f() {
  return this.areaForm.controls;
}
  
}