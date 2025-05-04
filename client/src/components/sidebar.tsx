import { ReactNode } from 'react';

interface SidebarProps {
  children: ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  return (
    <div className="flex flex-col h-screen w-full">
      <nav className="w-full px-8 py-4 border-b border-gray-300 bg-white shadow">
        <h2 className="text-xl font-semibold">Inventory Management</h2>
      </nav>

      <div className="flex flex-1">
        <aside className="w-64 px-6 py-4 border-r border-gray-200 bg-white shadow">
          <div className="flex flex-col gap-4">
            <p className="cursor-pointer hover:text-blue-600">Dashboard</p>
            <p className="cursor-pointer hover:text-blue-600">heheheh</p>
          </div>
        </aside>
        <main className="flex-1 px-8 py-6 bg-gray-50 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
