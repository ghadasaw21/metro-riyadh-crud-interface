import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { toast } from 'sonner@2.0.3';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog';

interface DeletePassengerProps {
  onNavigate: (page: string) => void;
}

export function DeletePassenger({ onNavigate }: DeletePassengerProps) {
  const { deletePassenger } = useData();
  const [passengerId, setPassengerId] = useState('');

  const handleDelete = () => {
    if (!passengerId.trim()) {
      toast.error('Please enter a passenger ID');
      return;
    }

    const id = parseInt(passengerId);
    if (isNaN(id)) {
      toast.error('Passenger ID must be a number');
      return;
    }

    const success = deletePassenger(id);
    if (success) {
      toast.success('Passenger deleted successfully');
      setPassengerId('');
    } else {
      toast.error('Passenger not found');
    }
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
            <CardTitle>Delete Passenger</CardTitle>
            <CardDescription>Remove a passenger record from the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="passenger_id">Passenger ID</Label>
                <Input
                  id="passenger_id"
                  type="number"
                  value={passengerId}
                  onChange={(e) => setPassengerId(e.target.value)}
                  placeholder="e.g., 1"
                />
                <p className="text-sm text-slate-500">
                  ⚠️ Warning: This action cannot be undone. The passenger record will be permanently deleted.
                </p>
              </div>

              <div className="flex gap-3 pt-4">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="flex-1" disabled={!passengerId.trim()}>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete the passenger record.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onNavigate('dashboard')}
                  className="flex-1"
                >
                  Back
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}