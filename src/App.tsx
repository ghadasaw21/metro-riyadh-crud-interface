import { useState } from 'react';
import { DataProvider } from './contexts/DataContext';
import { Dashboard } from './components/Dashboard';
import { InsertStation } from './components/stations/InsertStation';
import { RetrieveStations } from './components/stations/RetrieveStations';
import { DeleteStation } from './components/stations/DeleteStation';
import { InsertTrain } from './components/trains/InsertTrain';
import { RetrieveTrains } from './components/trains/RetrieveTrains';
import { DeleteTrain } from './components/trains/DeleteTrain';
import { InsertPassenger } from './components/passengers/InsertPassenger';
import { RetrievePassengers } from './components/passengers/RetrievePassengers';
import { DeletePassenger } from './components/passengers/DeletePassenger';
import { InsertTicket } from './components/tickets/InsertTicket';
import { RetrieveTickets } from './components/tickets/RetrieveTickets';
import { DeleteTicket } from './components/tickets/DeleteTicket';
import { InsertPayment } from './components/payments/InsertPayment';
import { RetrievePayments } from './components/payments/RetrievePayments';
import { DeletePayment } from './components/payments/DeletePayment';
import { InsertStaff } from './components/staff/InsertStaff';
import { RetrieveStaff } from './components/staff/RetrieveStaff';
import { DeleteStaff } from './components/staff/DeleteStaff';
import { Toaster } from './components/ui/sonner';

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} />;
      
      // Station pages
      case 'stations-insert':
        return <InsertStation onNavigate={setCurrentPage} />;
      case 'stations-retrieve':
        return <RetrieveStations onNavigate={setCurrentPage} />;
      case 'stations-delete':
        return <DeleteStation onNavigate={setCurrentPage} />;
      
      // Train pages
      case 'trains-insert':
        return <InsertTrain onNavigate={setCurrentPage} />;
      case 'trains-retrieve':
        return <RetrieveTrains onNavigate={setCurrentPage} />;
      case 'trains-delete':
        return <DeleteTrain onNavigate={setCurrentPage} />;
      
      // Passenger pages
      case 'passengers-insert':
        return <InsertPassenger onNavigate={setCurrentPage} />;
      case 'passengers-retrieve':
        return <RetrievePassengers onNavigate={setCurrentPage} />;
      case 'passengers-delete':
        return <DeletePassenger onNavigate={setCurrentPage} />;
      
      // Ticket pages
      case 'tickets-insert':
        return <InsertTicket onNavigate={setCurrentPage} />;
      case 'tickets-retrieve':
        return <RetrieveTickets onNavigate={setCurrentPage} />;
      case 'tickets-delete':
        return <DeleteTicket onNavigate={setCurrentPage} />;
      
      // Payment pages
      case 'payments-insert':
        return <InsertPayment onNavigate={setCurrentPage} />;
      case 'payments-retrieve':
        return <RetrievePayments onNavigate={setCurrentPage} />;
      case 'payments-delete':
        return <DeletePayment onNavigate={setCurrentPage} />;
      
      // Staff pages
      case 'staff-insert':
        return <InsertStaff onNavigate={setCurrentPage} />;
      case 'staff-retrieve':
        return <RetrieveStaff onNavigate={setCurrentPage} />;
      case 'staff-delete':
        return <DeleteStaff onNavigate={setCurrentPage} />;
      
      default:
        return <Dashboard onNavigate={setCurrentPage} />;
    }
  };

  return (
    <DataProvider>
      {renderPage()}
      <Toaster />
    </DataProvider>
  );
}