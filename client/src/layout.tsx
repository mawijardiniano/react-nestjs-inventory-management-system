import Sidebar from './components/sidebar';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex">
      <Sidebar>
        {children}
      </Sidebar>
    </div>
  );
}
