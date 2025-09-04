import { Component, signal, computed } from '@angular/core';

type Project = {
  title: string;
  description: string;
  tech: string[];
  link?: string;
  year?: number;
  img?: string; // Optional image URL for the project
};
type Award = {
  title: string;
  issuer?: string;
  year: number;
  note?: string;
};

@Component({
  standalone: true,
  selector: 'projects-page',
  imports: [],
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export class ProjectsPage {
  private filter = signal<'All' | 'Hackathon' | 'Personal' | string>('All');
  get currentFilter(): string {
    return this.filter();
  }
  setFilter = (t: string) => this.filter.set(t);
  isActive = (t: string) => this.currentFilter === t;

  projects = signal<Project[]>([
    // todo: change to csv
    {
      title: 'This Portfolio Website!',
      description: 'Using Angular to create a responsive, clean, portfolio website to compile and showcase projects and contact information.',
      tech: ['Angular', ],
      link: 'https://example.com/ive',
      year: 2025
    },    
    {
      title: 'Eyeballs',
      description: 'Eyeballs.',
      tech: ['ArduinoIDE', 'Hardware', 'Embedded', 'ESP32'],
      link: 'https://example.com/ive',
      year: 2025,
      img: 'eyeballs.jpg'
    },
    {
      title: 'Bluetooth enabled SD Card MP3 Player from Scratch',
      description: 'Leveraging an ESP32 to create a custom MP3 player with Bluetooth control.',
      tech: ['ArduinoIDE', 'Hardware', 'Embedded', 'ESP32'],  // tags/keywords
      link: 'https://example.com/ive',
      year: 2025
    },
    {
      title: 'WeHack Hackathon - Best Use of Cloudflare Winner',
      description: 'Winner of the Best use of Cloudflare in a hackathon project, this project leveraged Cloudflare Workers and KV for a real-time data processing application to improve new graduate financial literacy and planning complete with accessibility tools like speech-to-text.',
      tech: ['Hackathon', 'LLM', 'GenAI', 'Cloudflare', 'Real-time data', ],
      link: 'https://devpost.com/software/planit-p6xz4q',
      year: 2025,
      img: 'wehack_win.jpg'
    },
    {
      title: 'RuneRoutes - Capstone Project',
      description: 'React Native app with POIs, custom markers, and fog-of-war exploration.',
      tech: ['Hackathon', 'Mobile', 'React Native', 'Mapbox', 'Turf.js'],
      year: 2025,
      img: 'capstone.jpg'
    },
    {
      title: 'HackUNT Hackathon - Best DEI Hack sponsored by Fidelity',
      description: 'Translation rover for a hackathon project that won the Best DEI Hack sponsored by Fidelity. This project utilized a translation API to create a real-time translation tool for non-native English speakers, enhancing accessibility and inclusivity.',
      tech: ['Hackathon', 'Mobile', 'Flutter'],
      link: 'https://devpost.com/software/glorp',
      year: 2024,
      img: 'hackunt_win.jpg'
    },
    {
      title: '3D Printed Electric Violin',
      description: '',
      tech: ['Hardware', '3D Printing'],
      link: 'https://example.com/predictive-maintenance',
      year: 2022,
      img: 'violin.png'
    }
  ]);
  allTags = computed(() => {
    const tags = new Set<string>();
    for (const p of this.projects()) {
      if (p.tech) {
        for (const t of p.tech) tags.add(t);
      }
    }
    return ['All', ...tags];
  });

  filteredProjects = computed(() => {
    const f = this.filter();
    const list = this.projects();
    return f === 'All' ? list : list.filter(p => p.tech && p.tech.includes(f));
  });

  awards = signal<Award[]>([
    { title: 'bla bla bla', issuer: 'blah blah blah', year: 2024, note: 'something something' },
    { title: 'bla bla bla', year: 2024 }
  ]);

  latestYear = computed(() => Math.max(...this.projects().map(p => p.year ?? 0)));
}
