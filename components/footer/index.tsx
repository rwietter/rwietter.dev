import { SOCIAL_LINKS } from '../../data/social-links';

import { Footer } from './styles';

const FooterComponent = () => (
  <Footer>
    <p className="powered">
      Maurício Witter ©
      {'  '}
      {new Date().getFullYear()}
    </p>
    <nav>
      {SOCIAL_LINKS.map((link) => (
        <a
          key={link.url}
          href={link.url}
          target="_blank"
          rel="noreferrer"
          title={link.name}
          aria-label={link.name}
        >
          {link.icon}
        </a>
      ))}
    </nav>
  </Footer>
);

export { FooterComponent };
