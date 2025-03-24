import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/courses.service';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})

export class SidebarComponent {
  isOpen = false;
  isLoading: boolean = false;

  students: any[] = [];

  classId: string = '123456'; // Reemplázalo con el ID dinámico

  constructor(private courseService: CourseService) {}

  openSidebar(classId: string) {
    this.isOpen = true;
    this.isLoading = true;
    this.classId = classId;
    this.fetchStudents();
  }

  fetchStudents() {
    this.courseService.getStudents(this.classId).subscribe({
      next: (data) => {
        this.students = data.students;
        this.isLoading = false;
        console.log('Estudiantes:', this.students);
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Error al obtener estudiantes:', error);
      }
    });
  }

  closeSidebar() {
    this.isOpen = false;
  }
}
