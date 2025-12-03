import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { ArrowLeft, Search, RefreshCw } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { Badge } from '../ui/badge';

interface RetrieveStationsProps {
  onNavigate: (page: string) => void;
}

export function RetrieveStations({ onNavigate }: RetrieveStationsProps) {
  const { stations } = useData();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStations = stations.filter(
    (station) =>
      station.station_id.toString().includes(searchTerm) ||
      station.name.toLowerCase().includes(searchTerm.toLowerCase())
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
            <CardTitle>View All Stations</CardTitle>
            <CardDescription>Browse and search metro station records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search by ID or name..."
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
                    <TableHead>Station ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Line Name</TableHead>
                    <TableHead>Is Active</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStations.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center text-slate-500">
                        No stations found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredStations.map((station) => (
                      <TableRow key={station.station_id}>
                        <TableCell>{station.station_id}</TableCell>
                        <TableCell>{station.name}</TableCell>
                        <TableCell>{station.line_name}</TableCell>
                        <TableCell>
                          <Badge variant={station.is_active === '1' ? 'default' : 'secondary'}>
                            {station.is_active === '1' ? 'Yes' : 'No'}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="mt-4 text-slate-600">
              Total stations: {filteredStations.length}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}