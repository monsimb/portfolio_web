import { Component, signal } from '@angular/core';

type Degree = { school: string; program: string; year: string };
type Cert = { name: string; issuer: string; year?: string };
type Position = {
  title: string;
  company: string;
  year: string;
  description?: string;
  link?: string;
  images?: string[];
};


@Component({
  standalone: true,
  selector: 'about-page',
  imports: [],
  templateUrl: './about.html',
  styleUrls: ['./about.scss']
})
export class AboutPage {
  degrees = signal<Degree[]>([
    { school: 'University of North Texas (UNT)', program: 'B.S. Computer Science, Mechanical and Energy Engineering Minor', year: '2025' },
    { school: 'Mohawk College', program: 'Mechanical Engineering Technology Ontario College Advanced Diploma', year: '2022' }
  ]);

  certs = signal<Cert[]>([
    { name: 'AWS ', issuer: 'AWS' },
    { name: 'CyberSecurity', issuer: 'UNT' },
    { name: 'CSWA (Certified SOLIDWORKS Associate)', issuer: 'SOLIDWORKS' },
    { name: 'Other notable certifications', issuer: '—' }
  ]);

  positions = signal<Position[]>([
    { title: 'Software Engineer Intern', company: 'Amazon - FSx for Lustre', year: '2025', description: 'Worked on scalable, event-driven systems using AWS technologies.', link: "https://aws.amazon.com/fsx/lustre/", images: ['aws_logo.svg', 'aws_lustre_logo.png'] },
    { title: 'Research Lab Assistant', company: 'UNT - Materials Laboratory', year: '2025', description: '', link: "https://engineering.unt.edu/mse/", images: ['unt_engineering.jpg'] },
    { title: 'Software Engineer Intern', company: 'Amazon - Just Walk Out', year: '2024', description: 'Worked on scalable, event-driven systems using AWS technologies.', link: "https://aws.amazon.com/just-walk-out/", images: ['aws_logo.svg', 'just_walk_out_logo.jpg'] },
    { title: 'Mechanical Engineering Intern', company: 'Voestalpine', year: '2022', description: '', link: "https://www.voestalpine.com/highperformancemetals/canada/en-ca/", images: ['voestalpine.png'] },
    { title: 'Design Engineer Intern', company: 'Mohawk College - IDEAWORKS', year: '2021', description: 'Designed Additive Manufactured (3D) parts for R&D.', link: "https://ideaworks.mohawkcollege.ca/", images: ['ideaworks.jpg'] }
  ]);

  summary = `
  Software Engineer new grad with a passion for building scalable, event-driven systems.
  Experienced in full-stack development with a focus on AWS, Python, Angular, and Node.js. 
  Proven ability to deliver high-quality software solutions in fast-paced environments.
  `;

  handleCardClick(url?: string) {
    if (url) {
      window.open(url, '_blank');
    }
  }
}
