
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  MessageSquare, 
  Megaphone, 
  FileText, 
  File, 
  Building2, 
  CreditCard, 
  Calculator, 
  Truck,
  Phone,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';

const menuItems = [
  { icon: LayoutDashboard, label: 'Overview', path: '/' },
  { icon: Package, label: 'Inventory', path: '/inventory' },
  { icon: Users, label: 'Patients', path: '/patients' },
  { icon: MessageSquare, label: 'Communication', path: '/communication' },
  { icon: Megaphone, label: 'Marketing', path: '/marketing' },
  { icon: FileText, label: 'Forms', path: '/forms' },
  { icon: File, label: 'Documents', path: '/documents' },
  { icon: Building2, label: 'Wholesale', path: '/wholesale' },
  { icon: CreditCard, label: 'Payments', path: '/payments' },
  { icon: Calculator, label: 'Accounting', path: '/accounting' },
  { icon: Truck, label: 'Shipping', path: '/shipping' },
];

const integrations = [
  { icon: Phone, label: 'RingCentral', status: 'Disconnected' },
  { icon: Truck, label: 'Shipstation', status: 'Disconnected' },
];

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className={cn(
      "bg-white border-r border-gray-200 h-screen transition-all duration-300 flex flex-col",
      isCollapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!isCollapsed && (
          <div>
            <h1 className="text-xl font-bold text-gray-900">MediAdmin</h1>
            <p className="text-sm text-gray-500">Healthcare Management</p>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors",
                isActive 
                  ? "bg-blue-50 text-blue-700 border border-blue-200" 
                  : "text-gray-700 hover:bg-gray-50",
                isCollapsed && "justify-center"
              )}
            >
              <Icon size={18} />
              {!isCollapsed && <span className="font-medium">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Integrations */}
      {!isCollapsed && (
        <div className="p-4 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">Integrations</h3>
          <div className="space-y-2">
            {integrations.map((integration) => {
              const Icon = integration.icon;
              return (
                <div key={integration.label} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-2">
                    <Icon size={16} className="text-gray-500" />
                    <span className="text-sm text-gray-700">{integration.label}</span>
                  </div>
                  <span className="text-xs px-2 py-1 bg-red-100 text-red-600 rounded-full">
                    {integration.status}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
