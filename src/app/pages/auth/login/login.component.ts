import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formGroup!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private message: ToastrService ) {
    this.formGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required,  Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {}

  async onSubmit():Promise<void>{
    if (this.formGroup.valid) {
      this.formGroup.markAllAsTouched();
      console.log('formulario válido: ', this.formGroup.valid);

      this.authService.login(this.formGroup.value).subscribe({
        next: (response: any) => {
  
          this.router.navigate(['home']);
        },
        error: (error) => {  
          switch (error.status) {
            case 403 || 500:
              if (error.error && error.error.error) {
                const errorMessage = error.error.error;
                this.message.error(errorMessage);
              } else {
                this.message.error('Error en la solicitud');
              }         
              break;
            case 404:
              this.formGroup.controls['email'].markAsDirty();
              this.formGroup.controls['email'].setErrors({ 'invalid': true });
              if (error.error && error.error.error) {
                this.message.error(error.error.error);
              } else {
                this.message.error('Error en la solicitud');
              } 
              break;
            case 401:
              this.formGroup.controls['password'].markAsDirty();
              this.formGroup.controls['password'].setErrors({ 'invalid': true });
              if (error.error && error.error.error) {
                this.message.error(error.error.error);
              } else {
                this.message.error('Error en la solicitud');
              }  
              break;
            default:
              break;
          }
        }
      });
    }else{
      this.message.error('Formulario inválido')

    }

  }
}
