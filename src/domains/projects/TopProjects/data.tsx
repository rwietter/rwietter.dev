import type { Langs } from '@/shared/i18n/langs'
import {
  PiGoogleLogoLight,
  PiSpotifyLogoLight,
  PiChartDonutLight,
  PiCalendarBlankLight,
  PiBookmarksSimpleLight,
  PiPuzzlePieceLight,
  PiListLight,
  PiFileSqlLight,
} from 'react-icons/pi'

type Project = {
  title: string
  description: string
  image: string
  github: string
  link: string
  tags: string[]
  icon: JSX.Element
}

export const projects: Record<Langs, Project[]> = {
  en: [
    {
      title: 'Trackd',
      description:
        'Trackd is a platform for managing dental appointments for UBS.',
      image: 'https://i.imgur.com/SkEcNJj.jpg',
      github: 'https://github.com/rwietter/trackrow-monorepo',
      link: 'https://github.com/rwietter/trackrow-monorepo',
      tags: ['React', 'Next', 'TypeScript', 'Postgres', 'Rest API'],
      icon: <PiCalendarBlankLight size={25} />,
    },
    {
      title: 'Illusion Theme',
      description:
        'A fork of Dracula Official, Illusion is a dark theme for Visual Studio Code.',
      image: 'https://i.imgur.com/Hw1Y1Oy.png',
      github: 'https://github.com/rwietter/illusion-vscode-theme',
      link: 'https://github.com/rwietter/illusion-vscode-theme',
      tags: ['VsCode', 'Theme', 'TypeScript'],
      icon: <PiPuzzlePieceLight size={25} />,
    },
    {
      title: 'PrettySQL',
      description:
        'Pretty SQL is a web application that allows you to format and colorize SQL code in a simple and fast way.',
      image: 'https://i.imgur.com/dV4ogUC.png',
      github: 'https://github.com/rwietter/pretty-sql',
      link: 'https://github.com/rwietter/pretty-sql',
      tags: ['Next', 'TypeScript'],
      icon: <PiFileSqlLight size={25} />,
    },
    {
      title: 'My Awesome',
      description:
        'Make your notes, favorite lists and share with your friends.',
      image: 'https://i.imgur.com/SkEcNJj.jpg',
      github: 'https://github.com/rwietter/my-awesome',
      link: 'https://github.com/rwietter/my-awesome',
      tags: ['Next', 'TypeScript', 'Redis', 'Postgres'],
      icon: <PiListLight size={25} />,
    },
    {
      title: 'Illusion Spicetify',
      description: 'A dark theme for Spotify, using Spicetify.',
      image: 'https://i.imgur.com/SkEcNJj.jpg',
      github: 'https://github.com/rwietter/illusion-spicetify',
      link: 'https://github.com/rwietter/illusion-spicetify',
      tags: ['Toml', 'CSS', 'Spicetify'],
      icon: <PiSpotifyLogoLight size={25} />,
    },
    {
      title: 'Breview',
      description:
        'A desktop application to navigate and show your bookmarks in a pretty way like mega.nz',
      image: 'https://i.imgur.com/SkEcNJj.jpg',
      github: 'https://github.com/rwietter/breview',
      link: 'https://github.com/rwietter/breview',
      tags: ['Rust', 'Next', 'React', 'SQLite'],
      icon: <PiBookmarksSimpleLight size={25} />,
    },
    {
      title: 'Covid Insights',
      description:
        'Pretty charts and insights about the Covid-19 pandemic in Brazil',
      image: 'https://i.imgur.com/SkEcNJj.jpg',
      github: 'https://github.com/rwietter/covid-19-insights',
      link: 'https://github.com/rwietter/covid-19-insights',
      tags: ['Next', 'TypeScript', 'GraphQL', 'Mongo', 'Docker'],
      icon: <PiChartDonutLight size={25} />,
    },
    {
      title: 'Findit',
      description:
        'A command-line tool to advanced search in your favorite search engine',
      image: 'https://i.imgur.com/SkEcNJj.jpg',
      github: 'https://github.com/rwietter/findit',
      link: 'https://github.com/rwietter/findit',
      tags: ['Rust', 'CLI', 'DuckDuckGo'],
      icon: <PiGoogleLogoLight size={25} />,
    },
  ],
  pt: [
    {
      title: 'Trackd',
      description:
        'Trackd é uma plataforma para gestão de agenda odontológica para UBS.',
      image: 'https://i.imgur.com/SkEcNJj.jpg',
      github: 'https://github.com/rwietter/trackrow-monorepo',
      link: 'https://github.com/rwietter/trackrow-monorepo',
      tags: ['React', 'Next', 'TypeScript', 'Postgres', 'Rest API'],
      icon: <PiCalendarBlankLight size={25} />,
    },
    {
      title: 'Illusion Theme',
      description:
        'Um fork do Dracula Official, Illusion é um tema escuro para Visual Studio Code.',
      image: 'https://i.imgur.com/Hw1Y1Oy.png',
      github: 'https://github.com/rwietter/illusion-vscode-theme',
      link: 'https://github.com/rwietter/illusion-vscode-theme',
      tags: ['VsCode', 'Theme', 'TypeScript'],
      icon: <PiPuzzlePieceLight size={25} />,
    },
    {
      title: 'PrettySQL',
      description:
        'Pretty SQL é uma aplicação web que permite formatar e colorir o código SQL de forma simples e rápida.',
      image: 'https://i.imgur.com/dV4ogUC.png',
      github: 'https://github.com/rwietter/pretty-sql',
      link: 'https://github.com/rwietter/pretty-sql',
      tags: ['Next', 'TypeScript'],
      icon: <PiFileSqlLight size={25} />,
    },
    {
      title: 'My Awesome',
      description:
        'Crie suas anotações, listas favoritas e compartilhe com seus amigos.',
      image: 'https://i.imgur.com/SkEcNJj.jpg',
      github: 'https://github.com/rwietter/my-awesome',
      link: 'https://github.com/rwietter/my-awesome',
      tags: ['Next', 'TypeScript', 'Redis', 'Postgres'],
      icon: <PiListLight size={25} />,
    },
    {
      title: 'Illusion Spicetify',
      description: 'Um tema escuro para Spotify, usando Spicetify.',
      image: 'https://i.imgur.com/SkEcNJj.jpg',
      github: 'https://github.com/rwietter/illusion-spicetify',
      link: 'https://github.com/rwietter/illusion-spicetify',
      tags: ['Toml', 'CSS', 'Spicetify'],
      icon: <PiSpotifyLogoLight size={25} />,
    },
    {
      title: 'Breview',
      description:
        'Uma aplicação desktop para navegar e mostrar seus favoritos de uma maneira elegante inspirada no mega.nz',
      image: 'https://i.imgur.com/SkEcNJj.jpg',
      github: 'https://github.com/rwietter/breview',
      link: 'https://github.com/rwietter/breview',
      tags: ['Rust', 'Next', 'React', 'SQLite'],
      icon: <PiBookmarksSimpleLight size={25} />,
    },
    {
      title: 'Covid Insights',
      description: 'Gráficos e insights sobre a pandemia de Covid-19 no Brasil',
      image: 'https://i.imgur.com/SkEcNJj.jpg',
      github: 'https://github.com/rwietter/covid-19-insights',
      link: 'https://github.com/rwietter/covid-19-insights',
      tags: ['Next', 'TypeScript', 'GraphQL', 'Mongo', 'Docker'],
      icon: <PiChartDonutLight size={25} />,
    },
    {
      title: 'Findit',
      description:
        'Uma ferramenta de linha de comando para pesquisa avançada em seu mecanismo de busca favorito',
      image: 'https://i.imgur.com/SkEcNJj.jpg',
      github: 'https://github.com/rwietter/findit',
      link: 'https://github.com/rwietter/findit',
      tags: ['Rust', 'CLI', 'DuckDuckGo'],
      icon: <PiGoogleLogoLight size={25} />,
    },
  ],
}
