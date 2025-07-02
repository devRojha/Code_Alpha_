declare module 'prismjs/components/prism-core' {
    import Prism from 'prismjs';
    export const highlight: typeof Prism.highlight;
    export const languages: typeof Prism.languages;
  }
  
  declare module 'prismjs/components/prism-clike';
  declare module 'prismjs/components/prism-javascript';
  declare module 'prismjs/themes/prism.css';
  