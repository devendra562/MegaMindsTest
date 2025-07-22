import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { response } from 'express';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detailed',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './detailed.component.html',
  styleUrl: './detailed.component.css'
})
export class DetailedComponent {
  fullData: any;
  selectedIndex: number = 0;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.getData().subscribe((response: any) => {
      this.fullData = response.data;
    })
  }

  save() {
    this.dataService.saveData(this.fullData).subscribe((response: any) => {
      Swal.fire({
        icon: 'success',
        title: 'Saved successfully!',
        showConfirmButton: false,
        timer: 1500
      });
    });
  }
}
