import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { ArrowLeft } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { toast } from 'sonner@2.0.3';

interface InsertPaymentProps {
  onNavigate: (page: string) => void;
}

export function InsertPayment({ onNavigate }: InsertPaymentProps) {
  const { addPayment, payments } = useData();
  const [formData, setFormData] = useState({
    payment_id: '',
    ticket_id_fk: '',
    method: 'Card',
    amount: '',
    paid_datetime: new Date().toISOString().slice(0, 16).replace('T', ' '),
    payment_status: 'paid',
    refund_status: 'none',
    refund_datetime: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const paymentId = parseInt(formData.payment_id);
    if (isNaN(paymentId)) {
      toast.error('Payment ID must be a number');
      return;
    }

    if (payments.some(p => p.payment_id === paymentId)) {
      toast.error('Payment ID already exists');
      return;
    }

    const ticketId = parseInt(formData.ticket_id_fk);
    if (isNaN(ticketId)) {
      toast.error('Ticket ID must be a number');
      return;
    }

    if (payments.some(p => p.ticket_id_fk === ticketId)) {
      toast.error('Payment for this ticket already exists');
      return;
    }

    const amount = parseFloat(formData.amount);
    if (isNaN(amount) || amount <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    addPayment({
      payment_id: paymentId,
      ticket_id_fk: ticketId,
      method: formData.method,
      amount: amount,
      paid_datetime: formData.paid_datetime,
      payment_status: formData.payment_status,
      refund_status: formData.refund_status,
      refund_datetime: formData.refund_datetime,
    });

    toast.success('Payment recorded successfully');
    setFormData({
      payment_id: '',
      ticket_id_fk: '',
      method: 'Card',
      amount: '',
      paid_datetime: new Date().toISOString().slice(0, 16).replace('T', ' '),
      payment_status: 'paid',
      refund_status: 'none',
      refund_datetime: '',
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
            <CardTitle>Add New Payment</CardTitle>
            <CardDescription>Record a new payment transaction</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="payment_id">Payment ID</Label>
                <Input
                  id="payment_id"
                  type="number"
                  value={formData.payment_id}
                  onChange={(e) => setFormData({ ...formData, payment_id: e.target.value })}
                  placeholder="e.g., 6"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ticket_id_fk">Ticket ID</Label>
                <Input
                  id="ticket_id_fk"
                  type="number"
                  value={formData.ticket_id_fk}
                  onChange={(e) => setFormData({ ...formData, ticket_id_fk: e.target.value })}
                  placeholder="e.g., 1"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="method">Payment Method</Label>
                <Select
                  value={formData.method}
                  onValueChange={(value) => setFormData({ ...formData, method: value })}
                >
                  <SelectTrigger id="method">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Card">Card</SelectItem>
                    <SelectItem value="Cash">Cash</SelectItem>
                    <SelectItem value="Mada">Mada</SelectItem>
                    <SelectItem value="ApplePay">ApplePay</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount (SAR)</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  placeholder="e.g., 12.00"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="payment_status">Payment Status</Label>
                <Select
                  value={formData.payment_status}
                  onValueChange={(value) => setFormData({ ...formData, payment_status: value })}
                >
                  <SelectTrigger id="payment_status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paid">Paid</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="refund_status">Refund Status</Label>
                <Select
                  value={formData.refund_status}
                  onValueChange={(value) => setFormData({ ...formData, refund_status: value })}
                >
                  <SelectTrigger id="refund_status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="requested">Requested</SelectItem>
                    <SelectItem value="processed">Processed</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1">
                  Add Payment
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
