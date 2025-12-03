import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { ArrowLeft, Search, RefreshCw } from 'lucide-react';
import { useData } from '../../contexts/DataContext';

interface RetrieveTicketsProps {
  onNavigate: (page: string) => void;
}

export function RetrieveTickets({ onNavigate }: RetrieveTicketsProps) {
  const { tickets } = useData();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTickets = tickets.filter(
    (ticket) =>
      ticket.ticket_id.toString().includes(searchTerm) ||
      ticket.trip_id_fk.toString().includes(searchTerm) ||
      ticket.passenger_id_fk.toString().includes(searchTerm) ||
      ticket.seat_number.toLowerCase().includes(searchTerm.toLowerCase())
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
            <CardTitle>View All Tickets</CardTitle>
            <CardDescription>Browse and search ticket records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search by ticket ID, trip ID, passenger ID, or seat..."
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
                    <TableHead>Ticket ID</TableHead>
                    <TableHead>Trip ID</TableHead>
                    <TableHead>Passenger ID</TableHead>
                    <TableHead>Seat Number</TableHead>
                    <TableHead>Class</TableHead>
                    <TableHead>Fare Amount</TableHead>
                    <TableHead>Booking Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTickets.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center text-slate-500">
                        No tickets found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredTickets.map((ticket) => (
                      <TableRow key={ticket.ticket_id}>
                        <TableCell>{ticket.ticket_id}</TableCell>
                        <TableCell>{ticket.trip_id_fk}</TableCell>
                        <TableCell>{ticket.passenger_id_fk}</TableCell>
                        <TableCell>{ticket.seat_number}</TableCell>
                        <TableCell>{ticket.class}</TableCell>
                        <TableCell>SAR {ticket.fare_amount.toFixed(2)}</TableCell>
                        <TableCell>{ticket.booking_datetime}</TableCell>
                        <TableCell>{ticket.ticket_status}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="mt-4 text-slate-600">
              Total tickets: {filteredTickets.length}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
