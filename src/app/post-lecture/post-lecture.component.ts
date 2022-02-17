import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })

@Component({
  selector: 'app-post-lecture',
  templateUrl: './post-lecture.component.html',
  styleUrls: ['./post-lecture.component.css']
})
export class PostLectureComponent implements OnInit {

  constructor(private router: Router) { }
  title: string = '';
  description: string = '';
  image_post: string = '';

  async getPostFormData(data: any) {
    data.preventDefault();
    await axios
      .post('http://localhost:3001/api/items/posts', {
        title: this.title,
        description: this.description,
        image_post: this.image_post
      }).then((response) => {
        if (response.data) {
          localStorage.setItem(
            'user',
            JSON.stringify({
              title: this.title,
              description: this.description,
              image_post: this.image_post
            })
          )
          this.router.navigate(['/feed'])
        }
      })
  }

  postImage(event: any) {
    event.preventDefault();
    console.log(event)
    this.image_post = event.target.files[0]
    const formData = new FormData();
    formData.append("file", this.image_post)
    formData.append("upload_preset", "ehzqyvxt")
    formData.append("cloud_name", "brahamtahar")
    axios
      .post("http://api.cloudinary.com/v1_1/campgo/upload", formData)
      .then((result) => {
        console.log(result)
        this.image_post = result.data.url
      })


  }
  ngOnInit(): void {

  }
}


