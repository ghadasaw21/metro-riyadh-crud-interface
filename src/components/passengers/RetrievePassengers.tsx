import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { ArrowLeft, Search, RefreshCw } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

interface RetrievePassengersProps {
  onNavigate: (page: string) => void;
}

export function RetrievePassengers({ onNavigate }: RetrievePassengersProps) {
  const { passengers } = useData();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPassengers = passengers.filter(
    (passenger) =>
      passenger.passenger_id.toString().includes(searchTerm) ||
      passenger.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      passenger.national_id.includes(searchTerm) ||
      passenger.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
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
            <CardTitle>View All Passengers</CardTitle>
            <CardDescription>Browse and search passenger records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search by ID, name, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button variant="outline" onClick={() => setSearchTerm('')}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" onClick={() => onNavigate('dashboard')}>
                Back
              </Button>
            </div>

            <div className="border rounded-lg overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Passenger ID</TableHead>
                    <TableHead>Full Name</TableHead>
                    <TableHead>National ID</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Email</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPassengers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-slate-500">
                        No passengers found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPassengers.map((passenger) => (
                      <TableRow key={passenger.passenger_id}>
                        <TableCell>{passenger.passenger_id}</TableCell>
                        <TableCell>{passenger.full_name}</TableCell>
                        <TableCell>{passenger.national_id}</TableCell>
                        <TableCell>{passenger.phone}</TableCell>
                        <TableCell>{passenger.email}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="mt-4 text-slate-600">
              Total passengers: {filteredPassengers.length}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}