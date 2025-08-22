import { Component, signal } from '@angular/core';
import { NgFor } from '@angular/common';

type Degree = { school: string; program: string; year: string };
type Cert = { name: string; issuer: string; year?: string };
type Position = { title: string; company: string; year: string; description?: string };

@Component({
  standalone: true,
  selector: 'about-page',
  imports: [NgFor],
  templateUrl: './about.html',
  styleUrl: './about.scss'
})
export class AboutPage {
  degrees = signal<Degree[]>([
    { school: 'University of North Texas (UNT)', program: 'B.S. Computer Science, Mechanical and Energy Engineering Minor', year: '2025' },
    { school: 'Mohawk College', program: 'B.S. Mechanical Engineering Technology', year: '2022' }
  ]);

  certs = signal<Cert[]>([
    { name: 'AWS Certified Solutions Architect – Professional', issuer: 'AWS' },
    { name: 'CyberSecurity', issuer: 'UNT' },
    { name: 'Other notable certifications', issuer: '—' }
  ]);

  positions = signal<Position[]>([
    { title: 'Software Engineer Intern', company: 'Amazon - FSx for Lustre', year: '2025', description: 'Worked on scalable, event-driven systems using AWS technologies.' },
    { title: 'Research Lab Assistant', company: 'UNT - Materials Laboratory', year: '2025', description: '' },
    { title: 'Software Engineer Intern', company: 'Amazon - Just Walk Out', year: '2024', description: 'Worked on scalable, event-driven systems using AWS technologies.' },
    { title: 'Mechanical Engineering Intern', company: 'Voestalpine', year: '2022', description: '' },
    { title: 'Design Engineer Intern', company: 'IDEAWORKS (Mohawk College)', year: '2022', description: 'Designed Additive Manufactured (3D) parts for R&D.' }
  ]);

  summary = `
  Software Engineer new grad with a passion for building scalable, event-driven systems.
  Experienced in full-stack development with a focus on AWS, Python, Angular, and Node.js. 
  Proven ability to deliver high-quality software solutions in fast-paced environments.
  `;
}
