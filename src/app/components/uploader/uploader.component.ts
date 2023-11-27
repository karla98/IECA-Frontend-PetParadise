import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-uploader',
  templateUrl: './uploader.component.html',
  styleUrls: ['./uploader.component.scss'],
})
export class UploaderComponent implements OnInit {
  @Output() filesSelected: EventEmitter<File[]> = new EventEmitter<File[]>();

  @Input() isImgPerfil: boolean = false;

  previews: any[] = [];
  loadingPreviews = false;
  fileList: File[] = [];
  numMaxFiles: boolean = false;
  numFiles: number = 0;

  maxFileSize: number = 1024 * 1024 * 2; // 2 MB

  exceededSize: boolean = false;

  ngOnInit(): void {
    this.numFiles = this.isImgPerfil ? 1 : 3;
  }

  async handleFileChange(event: any): Promise<void> {
    const files = event?.target?.files;
    this.numMaxFiles = false;
    if (files && files.length > 0) {
      this.loadingPreviews = true;
      const promises: Promise<string | ArrayBuffer | null>[] = [];

      for (const file of files) {
        if (file.size <= this.maxFileSize) {
          this.exceededSize = false;
          const base64Result = await this.getBase64(file);
          promises.push(Promise.resolve(base64Result));
          this.fileList.push(file);
        } else {
          this.exceededSize = true;
        }
      }

      try {
        const base64Results = await Promise.all(promises);
        this.previews = this.previews.concat(base64Results);
        if (this.fileList.length <= this.numFiles) {
          this.numMaxFiles = false;
          this.filesSelected.emit(this.fileList);
        } else {
          this.numMaxFiles = true;
          this.fileList = [];
          this.filesSelected.emit(this.fileList);
          this.previews = [];
        }
      } catch (error) {
        console.error('Error loading previews:', error);
      } finally {
        this.loadingPreviews = false;
      }
    }
  }

  getBase64(file: File): Promise<string | ArrayBuffer | null> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  deleteImage(index: number): void {
    this.previews.splice(index, 1);
    this.fileList.splice(index, 1);
    if (this.fileList.length <= this.numFiles) {
      this.numMaxFiles = false;
      this.filesSelected.emit(this.fileList);
    } else {
      this.numMaxFiles = true;
      this.fileList = [];
      this.previews = [];
    }
  }
}
