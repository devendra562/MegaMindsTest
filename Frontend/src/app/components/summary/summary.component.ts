import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.css'
})
export class SummaryComponent implements OnInit {
   datas: any[] = [];

   constructor(private dataService: DataService){}

   ngOnInit(): void {
    this.dataService.getData().subscribe((response: any) => {
      this.datas = response.data.Datas;
    });
   }

   // Helper method to get property value by label
   getPropertyValue(item: any, propertyLabel: string): string {
    const property = item.Properties?.find((prop: any) => prop.Label === propertyLabel);
    return property ? property.Value : '';
   }
}