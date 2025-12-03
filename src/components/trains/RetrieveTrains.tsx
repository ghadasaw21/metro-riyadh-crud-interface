import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { ArrowLeft, Search, RefreshCw } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { Badge } from '../ui/badge';

interface RetrieveTrainsProps {
  onNavigate: (page: string) => void;
}

export function RetrieveTrains({ onNavigate }: RetrieveTrainsProps) {
  const { trains } = useData();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTrains = trains.filter(
    (train) =>
      train.train_id.toString().includes(searchTerm) ||
      train.code.toLowerCase().includes(searchTerm.toLowerCase())
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
            <CardTitle>View All Trains</CardTitle>
            <CardDescription>Browse and search train records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search by ID or code..."
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

            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Train ID</TableHead>
                    <TableHead>Code</TableHead>
                    <TableHead>Capacity</TableHead>
                    <TableHead>In Service</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTrains.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-slate-500">
                        No trains found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredTrains.map((train) => (
                      <TableRow key={train.train_id}>
                        <TableCell>{train.train_id}</TableCell>
                        <TableCell>{train.code}</TableCell>
                        <TableCell>{train.capacity}</TableCell>
                        <TableCell>
                          <Badge variant={train.in_service_flag === '1' ? 'default' : 'secondary'}>
                            {train.in_service_flag === '1' ? 'Yes' : 'No'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="mt-4 text-slate-600">
              Total trains: {filteredTrains.length}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}