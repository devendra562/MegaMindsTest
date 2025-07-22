import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DataService } from '../../services/data.service';
import { response } from 'express';
import { log } from 'console';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css'
})
export class SummaryComponent {
   datas: any[] = [];

   constructor(private dataService: DataService){}

   ngOnInit(): void {
    this.dataService.getData().subscribe((response: any) => {
      this.datas = response.data.Datas;
    })
   }
}
