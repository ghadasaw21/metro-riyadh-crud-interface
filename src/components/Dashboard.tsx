import { Train, Users, Ticket, Building2, CreditCard, UserCog } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

interface DashboardProps {
  onNavigate: (page: string) => void;
}

export function Dashboard({ onNavigate }: DashboardProps) {
  const modules = [
    {
      id: 'stations',
      title: 'Manage Stations',
      description: 'Add, view, and delete metro stations',
      icon: Building2,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      id: 'trains',
      title: 'Manage Trains',
      description: 'Add, view, and delete trains',
      icon: Train,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      id: 'passengers',
      title: 'Manage Passengers',
      description: 'Add, view, and delete passenger records',
      icon: Users,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      id: 'tickets',
      title: 'Manage Tickets',
      description: 'Add, view, and delete ticket bookings',
      icon: Ticket,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      id: 'payments',
      title: 'Manage Payments',
      description: 'Add, view, and delete payment records',
      icon: CreditCard,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
    },
    {
      id: 'staff',
      title: 'Manage Staff',
      description: 'Add, view, and delete staff members',
      icon: UserCog,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-slate-900 mb-2">Metro Riyadh – Interface</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <Card key={module.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-3 ${module.bgColor} rounded-lg ${module.color}`}>
                    <module.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{module.title}</CardTitle>
                  </div>
                </div>
                <CardDescription>{module.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex gap-2">
                <Button 
                  onClick={() => onNavigate(`${module.id}-insert`)}
                  className="flex-1"
                  variant="outline"
                  size="sm"
                >
                  Insert
                </Button>
                <Button 
                  onClick={() => onNavigate(`${module.id}-retrieve`)}
                  className="flex-1"
                  variant="outline"
                  size="sm"
                >
                  Retrieve
                </Button>
                <Button 
                  onClick={() => onNavigate(`${module.id}-delete`)}
                  className="flex-1"
                  variant="outline"
                  size="sm"
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-12 text-center border-t border-slate-200 pt-6">
          <p className="text-sm text-slate-600">Created by <span className="font-semibold text-slate-900">Ghada Alajmi</span></p>
          <p className="text-xs text-slate-500 mt-1">Database Project – 2025</p>
        </div>
      </div>
    </div>
  );
}