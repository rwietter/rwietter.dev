import type { Langs } from '@/shared/i18n/langs'

export type Project = {
  title: string
  description: string
  github: string
}
type Projects = {
  [key: string]: Project[]
}

export const projects: Record<Langs, Projects> = {
  en: {
    2024: [
      {
        title: 'Illusion Spicetify',
        description: 'A dark theme for Spotify, using Spicetify.',
        github: 'https://github.com/rwietter/illusion-spicetify',
      },
      {
        title: 'Breview',
        description:
          'A desktop application to navigate and show your bookmarks in a pretty way like mega.nz.',
        github: 'https://github.com/rwietter/breview',
      },
      {
        title: 'Findit',
        description:
          'A command-line tool to advanced search in your favorite search engine.',
        github: 'https://github.com/rwietter/findit',
      },
    ],
    2023: [
      {
        title: 'Exterm VSCode',
        description:
          'Extension for VSCode to open directories in the external terminal.',
        github: 'https://github.com/rwietter/exterm-vscode',
      },
      {
        title: 'Certfs',
        description:
          'Certfs is an application that utilizes the Fantom Blockchain and IPFS to record student certificates and diplomas, aiming to ensure the integrity and availability of data.',
        github: 'https://github.com/rwietter/certfs-ufsm',
      },
      {
        title: 'Covid Insights',
        description:
          'Pretty charts and insights about the Covid-19 pandemic in Brazil.',
        github: 'https://github.com/rwietter/covid-19-insights',
      },
      {
        title: 'Telegram Space Picture',
        description:
          'Bot to send the space picture of the day from NASA to your Telegram chat.',
        github: 'https://github.com/rwietter/telegram-space-today',
      },
    ],
    2022: [
      {
        title: 'Trackd',
        description:
          'Trackd is a platform for managing dental appointments for UBS.',
        github: 'https://github.com/rwietter/trackrow-monorepo',
      },
      {
        title: 'Personal Site-Blog',
        description:
          'Static website that uses TS/Next.js and ISR (Incremental Static Regeneration) and GraphQL.',
        github: 'https://github.com/rwietter/rwietter.dev',
      },
      {
        title: 'Astro Picture Bot',
        description: 'A new picture of our universe every day.',
        github: 'https://github.com/rwietter/astronomy-picture-of-the-day-bot',
      },
      {
        title: 'Jhonny',
        description: 'Website to promote a music artist.',
        github: 'https://github.com/rwietter/jhonny',
      },
    ],
    2021: [
      {
        title: 'My Awesome',
        description:
          'Make your notes, favorite lists and share with your friends.',
        github: 'https://github.com/rwietter/my-awesome',
      },
      {
        title: 'Illusion Theme',
        description:
          'A fork of Dracula Official, Illusion is a dark theme for Visual Studio Code.',
        github: 'https://github.com/rwietter/illusion-vscode-theme',
      },
      {
        title: 'PrettySQL',
        description:
          'Pretty SQL is a web application that allows you to format and colorize SQL code in a simple and fast way.',
        github: 'https://github.com/rwietter/pretty-sql',
      },
    ],
    2020: [
      {
        title: 'EcoNext',
        description:
          'EcoNext aims to connect entities, companies, and people to assist in the disposal of organic and inorganic waste.',
        github: 'https://github.com/rwietter/econext',
      },
      {
        title: 'lyrics',
        description: 'Search for song lyrics in a simple and fast way.',
        github: 'https://github.com/rwietter/lyrics',
      },
    ],
  },
  pt: {
    2024: [
      {
        title: 'Illusion Spicetify',
        description: 'Um tema escuro para o Spotify, utilizando o Spicetify.',
        github: 'https://github.com/rwietter/illusion-spicetify',
      },
      {
        title: 'Breview',
        description:
          'Uma aplicação desktop para navegar e mostrar seus favoritos de uma maneira elegante inspirada no mega.nz.',
        github: 'https://github.com/rwietter/breview',
      },
      {
        title: 'Findit',
        description:
          'Uma ferramenta de linha de comando para pesquisa avançada em seu mecanismo de busca favorito.',
        github: 'https://github.com/rwietter/findit',
      },
    ],
    2023: [
      {
        title: 'Exterm VSCode',
        description:
          'Uma extensão para o VSCode que permite abrir diretórios no terminal externo.',
        github: 'https://github.com/rwietter/exterm-vscode',
      },
      {
        title: 'Certfs',
        description:
          'Certfs é uma aplicação que utiliza a Blockchain Fantom e o IPFS para registrar certificados e diplomas de estudantes, visando garantir a integridade e disponibilidade dos dados.',
        github: 'https://github.com/rwietter/certfs-ufsm',
      },
      {
        title: 'Covid Insights',
        description:
          'Gráficos e insights sobre a pandemia de Covid-19 no Brasil.',
        github: 'https://github.com/rwietter/covid-19-insights',
      },
      {
        title: 'Telegram Space Picture',
        description:
          'Bot para enviar a imagem do espaço do dia da NASA para o seu chat do Telegram.',
        github: 'https://github.com/rwietter/telegram-space-today',
      },
    ],
    2022: [
      {
        title: 'Trackd',
        description:
          'Trackd é uma plataforma para gestão de agenda odontológica para UBS.',
        github: 'https://github.com/rwietter/trackrow-monorepo',
      },
      {
        title: 'Personal Site-Blog',
        description:
          'SSG site-blog pessoal repleto de recursos como i18n, multi-temas, SEO, multi-fontes e muito mais.',
        github: 'https://github.com/rwietter/rwietter.dev',
      },
      {
        title: 'Astro Picture Bot',
        description: 'A cada dia um novo registro do nosso universo',
        github: 'https://github.com/rwietter/astronomy-picture-of-the-day-bot',
      },
      {
        title: 'Jhonny',
        description: 'Website para divulgação de um artista musical.',
        github: 'https://github.com/rwietter/jhonny',
      },
    ],
    2021: [
      {
        title: 'My Awesome',
        description:
          'Crie suas anotações, listas favoritas e compartilhe com seus amigos.',
        github: 'https://github.com/rwietter/my-awesome',
      },
      {
        title: 'Illusion Theme',
        description:
          'Um fork do Dracula Official, Illusion é um tema escuro para Visual Studio Code.',
        github: 'https://github.com/rwietter/illusion-vscode-theme',
      },
      {
        title: 'PrettySQL',
        description:
          'Permite formatar baixar um screenshot do código de forma simples e rápida.',
        github: 'https://github.com/rwietter/pretty-sql',
      },
    ],
    2020: [
      {
        title: 'EcoNext',
        description:
          'EcoNext visa conectar entidades, empresas e pessoas para auxiliar no descarte de resíduos orgânicos e inorgânicos.',
        github: 'https://github.com/rwietter/econext',
      },
      {
        title: 'lyrics',
        description: 'Busque letras de músicas de forma simples e rápida.',
        github: 'https://github.com/rwietter/lyrics',
      },
    ],
  },
}
