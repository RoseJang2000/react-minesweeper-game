import Header from './Header';
import { StyledMain, Wrapper } from './LayoutStyle';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Wrapper>
      <Header />
      <StyledMain>{children}</StyledMain>
    </Wrapper>
  );
};

export default Layout;
