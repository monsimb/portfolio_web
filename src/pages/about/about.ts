import { Component, signal } from '@angular/core';
  import { MatIcon} from '@angular/material/icon';

type Degree = { school: string; program: string; accolades?: string; year: string };
type Cert = { name: string; issuer: string; year?: string };
type Position = {
  title: string;
  company: string;
  year: string;
  description?: string[];
  link?: string;
  images?: string[];
};
type Stat = { icon: string; label: string; value: string };


@Component({
  standalone: true,
  selector: 'about-page',
  imports: [MatIcon],
  templateUrl: './about.html',
  styleUrls: ['./about.scss']
})
export class AboutPage {
  degrees = signal<Degree[]>([
    { school: 'University of North Texas (UNT)', program: 'B.S. Computer Science, Mechanical and Energy Engineering Minor', accolades:'Magna Cum Laude - 3.8/4', year: '2023 - 2025' },
    { school: 'Mohawk College', program: 'Mechanical Engineering Technology Ontario College Advanced Diploma', accolades:'Foundry Education Foundation Canada Scholarship - 2022', year: '2019 - 2022' }
  ]);

  certs = signal<Cert[]>([
    { name: 'AWS ', issuer: 'AWS' },
    { name: 'CyberSecurity', issuer: 'UNT' },
    { name: 'CSWA (Certified SOLIDWORKS Associate)', issuer: 'SOLIDWORKS' },
    { name: 'CERT (Certified Education Robot Training) program', issuer: 'FANUC' },
    { name: 'Other notable certifications', issuer: '—' }
  ]);

  positions = signal<Position[]>([
    { title: 'Software Engineer Intern', company: 'Amazon - FSx for Lustre', year: '2025', description: ['Worked on scalable, customer-facing alterations to existing software using AWS technologies and FSx code base.'], link: "https://aws.amazon.com/fsx/lustre/", images: ['aws_logo_thumb.svg', 'aws_lustre_logo.png'] },
    { title: 'Research Lab Assistant', company: 'UNT - Materials Laboratory', year: '2025', description: ['Helped modernize the lab’s computational capabilities by initiating the migration of legacy Fortran code to Python and creating new software tools to streamline existing and future research workflows.'], link: "https://engineering.unt.edu/mse/", images: ['unt_engineering.jpg'] },
    { title: 'Software Engineer Intern', company: 'Amazon - Just Walk Out', year: '2024', description: ['Created a proof of concept chatbot leveraging AWS\' Bedrock knowledge bases to improve team and on-call experience by chatting with internal documentation.'], link: "https://aws.amazon.com/just-walk-out/", images: ['aws_logo_thumb.svg', 'just_walk_out_logo.jpg'] },
    { title: 'Mechanical Engineering Intern', company: 'Voestalpine', year: '2022', description: ['Developed a Python and MySQL system to manage material tracking and recycling processes for aerospace and medical parts, improving inventory and batch history accuracy.'], link: "https://www.voestalpine.com/highperformancemetals/canada/en-ca/", images: ['voestalpine.svg'] },
    { title: 'Design Engineer Intern', company: 'Mohawk College - IDEAWORKS', year: '2021', description: ['Designed Additive Manufactured (3D) parts for R&D.'], link: "https://ideaworks.mohawkcollege.ca/", images: ['ideaworks.jpg'] }
  ]);

  volunteer = signal<Position[]>([
    { title: 'Environmental Volunteer', 
      company: 'UNT - Sustainable Arts Garden', year: '2024 - 2025', 
      description: ['Earned distinction via the Environmental Volunteerism Graduation Cord due to completing at least 50 environmentally focused volunteer hours.'], 
      link: "https://studentaffairs.unt.edu/desresources/programs/sustainable-arts-garden.html", images: ['garden_volunteering.png'] }
  ]);

  headshot = 'headshot_grad.JPG';

  headline = 'I\'m Monique Simberg, a new grad Software Engineer.';

  stats = signal<Stat[]>([
    { icon: 'home_work', label: 'Currently located', value: 'Dallas, Texas'},
    { icon: 'school', label: 'Alma Mater', value: 'University of North Texas'},
    { icon: 'work', label: 'Previous Internships', value: 'Amazon (2x), Voestalpine, Mohawk College IDEAWORKS'},
    { icon: 'verified', label: 'Certifications', value: 'AWS, CyberSecurity, CSWA (Certified SOLIDWORKS Associate), FANUC Certified Education Robotics Training (CERT)'},
    { icon: 'emoji_events', label: 'Honors & Awards', value: 'Magna Cum Laude, Foundry Education Foundation Canada Scholarship, UNT Dean\'s List (4x)'},
    { icon: 'code', label: 'Languages & Frameworks', value: 'Python, JavaScript, TypeScript, Node.js, Angular, AWS'},
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
