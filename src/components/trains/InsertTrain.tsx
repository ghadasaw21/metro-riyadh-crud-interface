import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { ArrowLeft } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { toast } from 'sonner@2.0.3';

interface InsertTrainProps {
  onNavigate: (page: string) => void;
}

export function InsertTrain({ onNavigate }: InsertTrainProps) {
  const { addTrain, trains } = useData();
  const [formData, setFormData] = useState({
    train_id: '',
    code: '',
    capacity: '',
    in_service_flag: '1',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const trainId = parseInt(formData.train_id);
    if (isNaN(trainId)) {
      toast.error('Train ID must be a number');
      return;
    }
    
    if (trains.some(t => t.train_id === trainId)) {
      toast.error('Train ID already exists');
      return;
    }

    const capacity = parseInt(formData.capacity);
    if (isNaN(capacity) || capacity <= 0) {
      toast.error('Please enter a valid capacity');
      return;
    }

    addTrain({
      train_id: trainId,
      code: formData.code,
      capacity: capacity,
      in_service_flag: formData.in_service_flag,
    });

    toast.success('Train added successfully');
    setFormData({ train_id: '', code: '', capacity: '', in_service_flag: '1' });
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
            <CardTitle>Add New Train</CardTitle>
            <CardDescription>Create a new train record</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="train_id">Train ID</Label>
                <Input
                  id="train_id"
                  type="number"
                  value={formData.train_id}
                  onChange={(e) => setFormData({ ...formData, train_id: e.target.value })}
                  placeholder="e.g., 6"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="code">Train Code</Label>
                <Input
                  id="code"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="e.g., TRAIN-F6"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="capacity">Capacity</Label>
                <Input
                  id="capacity"
                  type="number"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                  placeholder="e.g., 200"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="in_service_flag">In Service</Label>
                <Select
                  value={formData.in_service_flag}
                  onValueChange={(value) => setFormData({ ...formData, in_service_flag: value })}
                >
                  <SelectTrigger id="in_service_flag">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Yes</SelectItem>
                    <SelectItem value="0">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1">
                  Add Train
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