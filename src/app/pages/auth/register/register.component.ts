import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formgroup!: FormGroup;

  constructor(private formbuilder: FormBuilder, private authserv: AuthService, private router: Router, private message: ToastrService) {
    this.formgroup = formbuilder.group({
      nombre: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.email, Validators.required]]
    });
  }

  ngOnInit(): void {
  }
  async SendForm(): Promise<void> {

    if (this.formgroup.valid) {
      this.formgroup.markAllAsTouched();
      this.authserv.save(this.formgroup.value).subscribe({
        next: (response: any) => {
          setTimeout(() => {
            this.message.success("usuario registrado con éxito");
            this.router.navigate(["auth/login"]);
          }, 1000);
        },
        error: (error) => {
          this.message.error(error.error.error);
        }
      });
    }
    else
    {
      this.message.error("Campos vacíos");
    }
  }

}
