import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { ArrowLeft } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { toast } from 'sonner@2.0.3';

interface InsertTicketProps {
  onNavigate: (page: string) => void;
}

export function InsertTicket({ onNavigate }: InsertTicketProps) {
  const { addTicket, tickets } = useData();
  const [formData, setFormData] = useState({
    ticket_id: '',
    trip_id_fk: '',
    passenger_id_fk: '',
    seat_number: '',
    class: 'Economy',
    fare_amount: '',
    booking_datetime: new Date().toISOString().slice(0, 16).replace('T', ' '),
    ticket_status: 'booked',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const ticketId = parseInt(formData.ticket_id);
    if (isNaN(ticketId)) {
      toast.error('Ticket ID must be a number');
      return;
    }

    if (tickets.some(t => t.ticket_id === ticketId)) {
      toast.error('Ticket ID already exists');
      return;
    }

    const tripId = parseInt(formData.trip_id_fk);
    if (isNaN(tripId)) {
      toast.error('Trip ID must be a number');
      return;
    }

    const passengerId = parseInt(formData.passenger_id_fk);
    if (isNaN(passengerId)) {
      toast.error('Passenger ID must be a number');
      return;
    }

    const fareAmount = parseFloat(formData.fare_amount);
    if (isNaN(fareAmount) || fareAmount <= 0) {
      toast.error('Please enter a valid fare amount');
      return;
    }

    addTicket({
      ticket_id: ticketId,
      trip_id_fk: tripId,
      passenger_id_fk: passengerId,
      seat_number: formData.seat_number,
      class: formData.class,
      fare_amount: fareAmount,
      booking_datetime: formData.booking_datetime,
      ticket_status: formData.ticket_status,
    });

    toast.success('Ticket booked successfully');
    setFormData({
      ticket_id: '',
      trip_id_fk: '',
      passenger_id_fk: '',
      seat_number: '',
      class: 'Economy',
      fare_amount: '',
      booking_datetime: new Date().toISOString().slice(0, 16).replace('T', ' '),
      ticket_status: 'booked',
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
            <CardTitle>Add New Ticket</CardTitle>
            <CardDescription>Create a new ticket booking record</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="ticket_id">Ticket ID</Label>
                <Input
                  id="ticket_id"
                  type="number"
                  value={formData.ticket_id}
                  onChange={(e) => setFormData({ ...formData, ticket_id: e.target.value })}
                  placeholder="e.g., 6"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="trip_id_fk">Trip ID</Label>
                <Input
                  id="trip_id_fk"
                  type="number"
                  value={formData.trip_id_fk}
                  onChange={(e) => setFormData({ ...formData, trip_id_fk: e.target.value })}
                  placeholder="e.g., 1"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="passenger_id_fk">Passenger ID</Label>
                <Input
                  id="passenger_id_fk"
                  type="number"
                  value={formData.passenger_id_fk}
                  onChange={(e) => setFormData({ ...formData, passenger_id_fk: e.target.value })}
                  placeholder="e.g., 1"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="seat_number">Seat Number</Label>
                <Input
                  id="seat_number"
                  value={formData.seat_number}
                  onChange={(e) => setFormData({ ...formData, seat_number: e.target.value })}
                  placeholder="e.g., A1"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="class">Class</Label>
                <Select
                  value={formData.class}
                  onValueChange={(value) => setFormData({ ...formData, class: value })}
                >
                  <SelectTrigger id="class">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Economy">Economy</SelectItem>
                    <SelectItem value="Business">Business</SelectItem>
                    <SelectItem value="First">First</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="fare_amount">Fare Amount (SAR)</Label>
                <Input
                  id="fare_amount"
                  type="number"
                  step="0.01"
                  value={formData.fare_amount}
                  onChange={(e) => setFormData({ ...formData, fare_amount: e.target.value })}
                  placeholder="e.g., 12.00"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ticket_status">Ticket Status</Label>
                <Select
                  value={formData.ticket_status}
                  onValueChange={(value) => setFormData({ ...formData, ticket_status: value })}
                >
                  <SelectTrigger id="ticket_status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="booked">Booked</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="used">Used</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1">
                  Book Ticket
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
