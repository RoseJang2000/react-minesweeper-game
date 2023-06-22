import Header from './Header';
import { Wrapper } from './LayoutStyle';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Wrapper>
      <Header />
      <main>{children}</main>
    </Wrapper>
  );
};

export default Layout;
