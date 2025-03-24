import { Component } from '@angular/core';
import { CourseService } from '../../services/courses.service';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [CommonModule, SidebarComponent, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  Math = Math;

  courses: any[] = [];

  progress: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 5;

  fileType: string = '';
  uploadMessage: string = '';
  nextPageToken: string = '';
  searchTerm: string = '';
  errorMessage: string = '';

  isModalOpen: boolean = false;
  isUploading: boolean = false;
  isErrorModalOpen: boolean = false;
  isLoading: boolean = true;

  selectedFile: File | null = null;

  errorData: { error_code: string; message: string }[] = [];

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.isLoading = true;
    this.courseService.getCourses(this.nextPageToken).subscribe({
      next: (response) => {
        this.courses = [...this.courses, ...response.courses]; // Agregar cursos sin reemplazar
        this.nextPageToken = response.next_page_token || null; // Guardar el token de la próxima página
        this.isLoading = false;
      },
      error: (error) => {
        this.isErrorModalOpen = true;
        this.isLoading = false;
      },
    });
  }

  // getDataExcel() {
  //   setTimeout(() => {
  //     this.courseService.getCourses().subscribe({
  //       next: (response) => {
  //         const blob = new Blob([response], {
  //           type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  //         });

  //         const url = window.URL.createObjectURL(blob);
  //         const a = document.createElement('a');
  //         a.href = url;
  //         a.download = 'cursos.xlsx';
  //         a.click();
  //         window.URL.revokeObjectURL(url);
  //       },
  //       error: (error) => {
  //         this.isErrorModalOpen = true;
  //       },
  //     });
  //   }, 2000);
  // }

  openModal() {
    this.isModalOpen = true;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  uploadFile() {
    if (!this.selectedFile || !this.fileType) {
      this.uploadMessage = 'Por favor, selecciona un archivo y un tipo.';
      return;
    }

    this.isUploading = true;
    this.progress = 0;

    const uploadInterval = setInterval(() => {
      if (this.progress < 100) {
        this.progress += 5;
      } else {
        clearInterval(uploadInterval);
      }
    }, 1000);

    let uploadObservable;

    if (this.fileType === 'courses') {
      uploadObservable = this.courseService.importCourses(this.selectedFile);
    } else if (this.fileType === 'students') {
      uploadObservable = this.courseService.enrollStudents(this.selectedFile);
    } else {
      return;
    }

    uploadObservable.subscribe({
      next: (response) => {
        if (response.courses || response.students_enrolled){
          console.log("IF")
          this.progress = 100;
          setTimeout(() => {
            this.isUploading = false;
            this.closeModal();
          }, 500);
        } else {
          console.log("ELSE")
          this.errorMessage = response.error;
          clearInterval(uploadInterval);
          this.isUploading = false;
          this.progress = 0;
          this.isErrorModalOpen = true;
        }
      }
    });    
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedFile = null;
    this.uploadMessage = '';
    //window.location.reload();
  }

  get paginatedCourses() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredCourses.slice(startIndex, endIndex);
  }

  get filteredCourses() {
    return this.courses.filter(course =>
      course.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  totalPages() {
    return Math.ceil(this.filteredCourses.length / this.itemsPerPage);
  }

  changePage(page: number) {
    if (page > this.totalPages() && this.nextPageToken) {
      this.getData();
    }
  
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage = page;
    }
  }
}
