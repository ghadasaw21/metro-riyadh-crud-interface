import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { ArrowLeft } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import { toast } from 'sonner@2.0.3';

interface InsertStationProps {
  onNavigate: (page: string) => void;
}

export function InsertStation({ onNavigate }: InsertStationProps) {
  const { addStation, stations } = useData();
  const [formData, setFormData] = useState({
    station_id: '',
    name: '',
    line_name: '',
    is_active: '1',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const stationId = parseInt(formData.station_id);
    if (isNaN(stationId)) {
      toast.error('Station ID must be a number');
      return;
    }
    
    if (stations.some(s => s.station_id === stationId)) {
      toast.error('Station ID already exists');
      return;
    }

    addStation({
      station_id: stationId,
      name: formData.name,
      line_name: formData.line_name,
      is_active: formData.is_active,
    });

    toast.success('Station added successfully');
    setFormData({ station_id: '', name: '', line_name: '', is_active: '1' });
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
            <CardTitle>Add New Station</CardTitle>
            <CardDescription>Create a new metro station record</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="station_id">Station ID</Label>
                <Input
                  id="station_id"
                  type="number"
                  value={formData.station_id}
                  onChange={(e) => setFormData({ ...formData, station_id: e.target.value })}
                  placeholder="e.g., 6"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Station Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., Al Olaya"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="line_name">Line Name</Label>
                <Input
                  id="line_name"
                  value={formData.line_name}
                  onChange={(e) => setFormData({ ...formData, line_name: e.target.value })}
                  placeholder="e.g., Red Line"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="is_active">Is Active</Label>
                <Select
                  value={formData.is_active}
                  onValueChange={(value) => setFormData({ ...formData, is_active: value })}
                >
                  <SelectTrigger id="is_active">
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
                  Add Station
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