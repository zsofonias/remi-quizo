import { ReactNode } from 'react';

interface IFooterProps {
  children: ReactNode;
}

function Footer({ children }: IFooterProps) {
  return <footer>{children}</footer>;
}

export default Footer;
