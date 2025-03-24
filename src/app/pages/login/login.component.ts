import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  selectedFile: File | null = null;
  loginButton: boolean = true;

  constructor(private router:Router, private loginService: LoginService) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }

    console.log(this.loginButton);
  }

  uploadCredentials(event: Event) {
    event.preventDefault();

    if (this.selectedFile) {
      this.loginService.importCredentials(this.selectedFile).subscribe({
        next: (response) => {
          console.log('Archivo subido correctamente:', response);
          this.loginButton = false;
        },
        error: (error) => {
          console.error('Error al subir el archivo:', error);
          alert('Error al subir el archivo');
        },
      });
    } else {
      alert('Por favor selecciona un archivo antes de subir.');
    }
  }

  login() {
    this.loginService.loginAccount().subscribe({
      next: (response) => {
        console.log('Archivo subido correctamente:', response);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error('Error al subir el archivo:', error);
        alert('Error al subir el archivo');
      },
    });
  }
}
