import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { ArrowLeft } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { toast } from 'sonner@2.0.3';

interface InsertPassengerProps {
  onNavigate: (page: string) => void;
}

export function InsertPassenger({ onNavigate }: InsertPassengerProps) {
  const { addPassenger, passengers } = useData();
  const [formData, setFormData] = useState({
    passenger_id: '',
    full_name: '',
    national_id: '',
    phone: '',
    email: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const passengerId = parseInt(formData.passenger_id);
    if (isNaN(passengerId)) {
      toast.error('Passenger ID must be a number');
      return;
    }
    
    if (passengers.some(p => p.passenger_id === passengerId)) {
      toast.error('Passenger ID already exists');
      return;
    }

    if (passengers.some(p => p.national_id === formData.national_id)) {
      toast.error('National ID already exists');
      return;
    }

    addPassenger({
      passenger_id: passengerId,
      full_name: formData.full_name,
      national_id: formData.national_id,
      phone: formData.phone,
      email: formData.email,
    });

    toast.success('Passenger added successfully');
    setFormData({
      passenger_id: '',
      full_name: '',
      national_id: '',
      phone: '',
      email: '',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-2xl mx-auto">
        <Button
          variant="ghost"
          onClick={() => onNavigate('dashboard')}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>Add New Passenger</CardTitle>
            <CardDescription>Create a new passenger record</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="passenger_id">Passenger ID</Label>
                <Input
                  id="passenger_id"
                  type="number"
                  value={formData.passenger_id}
                  onChange={(e) => setFormData({ ...formData, passenger_id: e.target.value })}
                  placeholder="e.g., 6"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="full_name">Full Name</Label>
                <Input
                  id="full_name"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  placeholder="e.g., Abdullah AlHarbi"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="national_id">National ID</Label>
                <Input
                  id="national_id"
                  value={formData.national_id}
                  onChange={(e) => setFormData({ ...formData, national_id: e.target.value })}
                  placeholder="e.g., 1098765432"
                  maxLength={10}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="e.g., 0501234567"
                  maxLength={10}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="e.g., abdullah@email.com"
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1">
                  Add Passenger
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onNavigate('dashboard')}
                  className="flex-1"
                >
                  Back
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}