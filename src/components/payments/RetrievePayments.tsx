import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { ArrowLeft, Search, RefreshCw } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { Badge } from '../ui/badge';

interface RetrievePaymentsProps {
  onNavigate: (page: string) => void;
}

export function RetrievePayments({ onNavigate }: RetrievePaymentsProps) {
  const { payments } = useData();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPayments = payments.filter(
    (payment) =>
      payment.payment_id.toString().includes(searchTerm) ||
      payment.ticket_id_fk.toString().includes(searchTerm) ||
      payment.method.toLowerCase().includes(searchTerm.toLowerCase())
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
            <CardTitle>View All Payments</CardTitle>
            <CardDescription>Browse and search payment records</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search by payment ID, ticket ID, or method..."
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
                    <TableHead>Payment ID</TableHead>
                    <TableHead>Ticket ID</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Paid Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Refund Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-slate-500">
                        No payments found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPayments.map((payment) => (
                      <TableRow key={payment.payment_id}>
                        <TableCell>{payment.payment_id}</TableCell>
                        <TableCell>{payment.ticket_id_fk}</TableCell>
                        <TableCell>{payment.method}</TableCell>
                        <TableCell>SAR {payment.amount.toFixed(2)}</TableCell>
                        <TableCell>{payment.paid_datetime}</TableCell>
                        <TableCell>
                          <Badge variant={payment.payment_status === 'paid' ? 'default' : 'secondary'}>
                            {payment.payment_status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={payment.refund_status === 'processed' ? 'destructive' : 'secondary'}>
                            {payment.refund_status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            <div className="mt-4 text-slate-600">
              Total payments: {filteredPayments.length}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
