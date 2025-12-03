import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Station {
  station_id: number;
  name: string;
  line_name: string;
  is_active: string;
}

export interface Train {
  train_id: number;
  code: string;
  capacity: number;
  in_service_flag: string;
}

export interface Passenger {
  passenger_id: number;
  full_name: string;
  national_id: string;
  phone: string;
  email: string;
}

export interface Ticket {
  ticket_id: number;
  trip_id_fk: number;
  passenger_id_fk: number;
  seat_number: string;
  class: string;
  fare_amount: number;
  booking_datetime: string;
  ticket_status: string;
}

export interface Payment {
  payment_id: number;
  ticket_id_fk: number;
  method: string;
  amount: number;
  paid_datetime: string;
  payment_status: string;
  refund_status: string;
  refund_datetime: string;
}

export interface Staff {
  staff_id: number;
  full_name: string;
  role: string;
  phone: string;
  email: string;
  employment_status: string;
}

export interface Route {
  route_id: number;
  name: string;
  direction: string;
  is_active: string;
}

export interface Schedule {
  schedule_id: number;
  departure_datetime: string;
  arrival_datetime: string;
  status: string;
  update_reason: string;
}

export interface Trip {
  trip_id: number;
  route_id_fk: number;
  train_id_fk: number;
  schedule_id_fk: number;
  service_date: string;
  trip_status: string;
}

export interface TripAssignment {
  assignment_id: number;
  trip_id_fk: number;
  staff_id_fk: number;
  role_on_trip: string;
  shift_start: string;
  shift_end: string;
}

export interface RouteStation {
  route_id: number;
  station_id: number;
  stop_order: number;
  dwell_minutes: number;
}

interface DataContextType {
  stations: Station[];
  trains: Train[];
  passengers: Passenger[];
  tickets: Ticket[];
  payments: Payment[];
  staff: Staff[];
  routes: Route[];
  schedules: Schedule[];
  trips: Trip[];
  tripAssignments: TripAssignment[];
  routeStations: RouteStation[];
  addStation: (station: Station) => void;
  deleteStation: (id: number) => boolean;
  addTrain: (train: Train) => void;
  deleteTrain: (id: number) => boolean;
  addPassenger: (passenger: Passenger) => void;
  deletePassenger: (id: number) => boolean;
  addTicket: (ticket: Ticket) => void;
  deleteTicket: (id: number) => boolean;
  addPayment: (payment: Payment) => void;
  deletePayment: (id: number) => boolean;
  addStaff: (staff: Staff) => void;
  deleteStaff: (id: number) => boolean;
  addRoute: (route: Route) => void;
  deleteRoute: (id: number) => boolean;
  addSchedule: (schedule: Schedule) => void;
  deleteSchedule: (id: number) => boolean;
  addTrip: (trip: Trip) => void;
  deleteTrip: (id: number) => boolean;
  addTripAssignment: (assignment: TripAssignment) => void;
  deleteTripAssignment: (id: number) => boolean;
  addRouteStation: (routeStation: RouteStation) => void;
  deleteRouteStation: (routeId: number, stationId: number) => boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const mockStations: Station[] = [
  { station_id: 1, name: 'King Abdullah Financial District', line_name: 'Blue Line', is_active: '1' },
  { station_id: 2, name: 'Al-Olaya', line_name: 'Blue Line', is_active: '1' },
  { station_id: 3, name: 'King Khalid International Airport', line_name: 'Yellow Line', is_active: '1' },
  { station_id: 4, name: 'Riyadh Gallery', line_name: 'Red Line', is_active: '1' },
  { station_id: 5, name: 'Al-Malaz', line_name: 'Yellow Line', is_active: '1' },
];

const mockTrains: Train[] = [
  { train_id: 1, code: 'TRAIN-A1', capacity: 200, in_service_flag: '1' },
  { train_id: 2, code: 'TRAIN-B2', capacity: 180, in_service_flag: '1' },
  { train_id: 3, code: 'TRAIN-C3', capacity: 220, in_service_flag: '1' },
  { train_id: 4, code: 'TRAIN-D4', capacity: 210, in_service_flag: '0' },
  { train_id: 5, code: 'TRAIN-E5', capacity: 190, in_service_flag: '1' },
];

const mockPassengers: Passenger[] = [
  { passenger_id: 1, full_name: 'Sara AlHarbi', national_id: '1109876543', phone: '0551112223', email: 'sara.harbi@email.com' },
  { passenger_id: 2, full_name: 'Fahad AlQahtani', national_id: '1087654321', phone: '0562223334', email: 'f.althani@email.com' },
  { passenger_id: 3, full_name: 'Mona AlOtaibi', national_id: '1076543219', phone: '0573334445', email: 'mona.otaibi@email.com' },
  { passenger_id: 4, full_name: 'Rakan AlMutairi', national_id: '1065432198', phone: '0584445556', email: 'rakan.mutairi@email.com' },
  { passenger_id: 5, full_name: 'Lama AlSaud', national_id: '1054321987', phone: '0595556667', email: 'lama.saud@email.com' },
];

const mockTickets: Ticket[] = [
  { ticket_id: 1, trip_id_fk: 1, passenger_id_fk: 1, seat_number: 'A1', class: 'Economy', fare_amount: 12.00, booking_datetime: '2025-11-02 19:00', ticket_status: 'booked' },
  { ticket_id: 2, trip_id_fk: 2, passenger_id_fk: 2, seat_number: 'B3', class: 'Business', fare_amount: 20.00, booking_datetime: '2025-11-02 20:15', ticket_status: 'booked' },
  { ticket_id: 3, trip_id_fk: 3, passenger_id_fk: 3, seat_number: 'C2', class: 'Economy', fare_amount: 10.00, booking_datetime: '2025-11-02 21:00', ticket_status: 'cancelled' },
  { ticket_id: 4, trip_id_fk: 4, passenger_id_fk: 4, seat_number: 'D5', class: 'First', fare_amount: 30.00, booking_datetime: '2025-11-02 22:10', ticket_status: 'booked' },
  { ticket_id: 5, trip_id_fk: 5, passenger_id_fk: 5, seat_number: 'E1', class: 'Economy', fare_amount: 12.00, booking_datetime: '2025-11-02 23:30', ticket_status: 'booked' },
];

const mockPayments: Payment[] = [
  { payment_id: 1, ticket_id_fk: 1, method: 'Card', amount: 12.00, paid_datetime: '2025-11-02 19:05', payment_status: 'paid', refund_status: 'none', refund_datetime: '' },
  { payment_id: 2, ticket_id_fk: 2, method: 'ApplePay', amount: 20.00, paid_datetime: '2025-11-02 20:20', payment_status: 'paid', refund_status: 'none', refund_datetime: '' },
  { payment_id: 3, ticket_id_fk: 3, method: 'Card', amount: 10.00, paid_datetime: '2025-11-02 21:05', payment_status: 'paid', refund_status: 'processed', refund_datetime: '2025-11-03 09:30' },
  { payment_id: 4, ticket_id_fk: 4, method: 'Cash', amount: 30.00, paid_datetime: '2025-11-02 22:15', payment_status: 'paid', refund_status: 'none', refund_datetime: '' },
  { payment_id: 5, ticket_id_fk: 5, method: 'Mada', amount: 12.00, paid_datetime: '2025-11-02 23:35', payment_status: 'paid', refund_status: 'none', refund_datetime: '' },
];

const mockStaff: Staff[] = [
  { staff_id: 1, full_name: 'Ali AlHarthi', role: 'Driver', phone: '0501234567', email: 'ali.harthi@riyadhmetro.sa', employment_status: 'active' },
  { staff_id: 2, full_name: 'Hassan AlShahrani', role: 'Conductor', phone: '0502345678', email: 'hassan.shahrani@riyadhmetro.sa', employment_status: 'active' },
  { staff_id: 3, full_name: 'Ruba AlFaisal', role: 'Supervisor', phone: '0503456789', email: 'ruba.faisal@riyadhmetro.sa', employment_status: 'on_leave' },
  { staff_id: 4, full_name: 'Mohammed AlGhamdi', role: 'Attendant', phone: '0504567890', email: 'mohammed.ghamdi@riyadhmetro.sa', employment_status: 'active' },
  { staff_id: 5, full_name: 'Nora AlQahtani', role: 'Driver', phone: '0505678901', email: 'nora.qahtani@riyadhmetro.sa', employment_status: 'retired' },
];

const mockRoutes: Route[] = [
  { route_id: 1, name: 'Blue Line', direction: 'North-South', is_active: '1' },
  { route_id: 2, name: 'Red Line', direction: 'East-West', is_active: '1' },
  { route_id: 3, name: 'Green Line', direction: 'King Abdulaziz Road', is_active: '1' },
  { route_id: 4, name: 'Yellow Line', direction: 'Airport-Al-Malaz', is_active: '1' },
  { route_id: 5, name: 'Purple Line', direction: 'King Khalid Int. - Diplomatic Quarter', is_active: '1' },
];

const mockSchedules: Schedule[] = [
  { schedule_id: 1, departure_datetime: '2025-11-03 08:00', arrival_datetime: '2025-11-03 08:30', status: 'scheduled', update_reason: '' },
  { schedule_id: 2, departure_datetime: '2025-11-03 09:00', arrival_datetime: '2025-11-03 09:35', status: 'scheduled', update_reason: '' },
  { schedule_id: 3, departure_datetime: '2025-11-03 10:15', arrival_datetime: '2025-11-03 10:45', status: 'delayed', update_reason: 'Minor maintenance delay' },
  { schedule_id: 4, departure_datetime: '2025-11-03 11:00', arrival_datetime: '2025-11-03 11:40', status: 'scheduled', update_reason: '' },
  { schedule_id: 5, departure_datetime: '2025-11-03 12:30', arrival_datetime: '2025-11-03 13:00', status: 'cancelled', update_reason: 'Technical issue' },
];

const mockTrips: Trip[] = [
  { trip_id: 1, route_id_fk: 1, train_id_fk: 1, schedule_id_fk: 1, service_date: '2025-11-03', trip_status: 'scheduled' },
  { trip_id: 2, route_id_fk: 2, train_id_fk: 2, schedule_id_fk: 2, service_date: '2025-11-03', trip_status: 'in_progress' },
  { trip_id: 3, route_id_fk: 3, train_id_fk: 3, schedule_id_fk: 3, service_date: '2025-11-03', trip_status: 'delayed' },
  { trip_id: 4, route_id_fk: 4, train_id_fk: 4, schedule_id_fk: 4, service_date: '2025-11-03', trip_status: 'scheduled' },
  { trip_id: 5, route_id_fk: 5, train_id_fk: 5, schedule_id_fk: 5, service_date: '2025-11-03', trip_status: 'cancelled' },
];

const mockTripAssignments: TripAssignment[] = [
  { assignment_id: 1, trip_id_fk: 1, staff_id_fk: 1, role_on_trip: 'Driver', shift_start: '2025-11-03 07:30', shift_end: '2025-11-03 09:00' },
  { assignment_id: 2, trip_id_fk: 1, staff_id_fk: 2, role_on_trip: 'Conductor', shift_start: '2025-11-03 07:45', shift_end: '2025-11-03 09:00' },
  { assignment_id: 3, trip_id_fk: 2, staff_id_fk: 4, role_on_trip: 'Attendant', shift_start: '2025-11-03 08:45', shift_end: '2025-11-03 10:00' },
  { assignment_id: 4, trip_id_fk: 3, staff_id_fk: 3, role_on_trip: 'Supervisor', shift_start: '2025-11-03 09:45', shift_end: '2025-11-03 11:00' },
  { assignment_id: 5, trip_id_fk: 4, staff_id_fk: 5, role_on_trip: 'Driver', shift_start: '2025-11-03 10:30', shift_end: '2025-11-03 12:00' },
];

const mockRouteStations: RouteStation[] = [
  { route_id: 1, station_id: 1, stop_order: 1, dwell_minutes: 2 },
  { route_id: 1, station_id: 2, stop_order: 2, dwell_minutes: 3 },
  { route_id: 2, station_id: 4, stop_order: 1, dwell_minutes: 2 },
  { route_id: 4, station_id: 3, stop_order: 1, dwell_minutes: 4 },
  { route_id: 4, station_id: 5, stop_order: 2, dwell_minutes: 3 },
];

export function DataProvider({ children }: { children: ReactNode }) {
  const [stations, setStations] = useState<Station[]>(mockStations);
  const [trains, setTrains] = useState<Train[]>(mockTrains);
  const [passengers, setPassengers] = useState<Passenger[]>(mockPassengers);
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets);
  const [payments, setPayments] = useState<Payment[]>(mockPayments);
  const [staff, setStaff] = useState<Staff[]>(mockStaff);
  const [routes, setRoutes] = useState<Route[]>(mockRoutes);
  const [schedules, setSchedules] = useState<Schedule[]>(mockSchedules);
  const [trips, setTrips] = useState<Trip[]>(mockTrips);
  const [tripAssignments, setTripAssignments] = useState<TripAssignment[]>(mockTripAssignments);
  const [routeStations, setRouteStations] = useState<RouteStation[]>(mockRouteStations);

  const addStation = (station: Station) => {
    setStations(prev => [...prev, station]);
  };

  const deleteStation = (id: number): boolean => {
    const found = stations.some(s => s.station_id === id);
    if (found) {
      setStations(prev => prev.filter(s => s.station_id !== id));
    }
    return found;
  };

  const addTrain = (train: Train) => {
    setTrains(prev => [...prev, train]);
  };

  const deleteTrain = (id: number): boolean => {
    const found = trains.some(t => t.train_id === id);
    if (found) {
      setTrains(prev => prev.filter(t => t.train_id !== id));
    }
    return found;
  };

  const addPassenger = (passenger: Passenger) => {
    setPassengers(prev => [...prev, passenger]);
  };

  const deletePassenger = (id: number): boolean => {
    const found = passengers.some(p => p.passenger_id === id);
    if (found) {
      setPassengers(prev => prev.filter(p => p.passenger_id !== id));
    }
    return found;
  };

  const addTicket = (ticket: Ticket) => {
    setTickets(prev => [...prev, ticket]);
  };

  const deleteTicket = (id: number): boolean => {
    const found = tickets.some(t => t.ticket_id === id);
    if (found) {
      setTickets(prev => prev.filter(t => t.ticket_id !== id));
    }
    return found;
  };

  const addPayment = (payment: Payment) => {
    setPayments(prev => [...prev, payment]);
  };

  const deletePayment = (id: number): boolean => {
    const found = payments.some(p => p.payment_id === id);
    if (found) {
      setPayments(prev => prev.filter(p => p.payment_id !== id));
    }
    return found;
  };

  const addStaff = (staff: Staff) => {
    setStaff(prev => [...prev, staff]);
  };

  const deleteStaff = (id: number): boolean => {
    const found = staff.some(s => s.staff_id === id);
    if (found) {
      setStaff(prev => prev.filter(s => s.staff_id !== id));
    }
    return found;
  };

  const addRoute = (route: Route) => {
    setRoutes(prev => [...prev, route]);
  };

  const deleteRoute = (id: number): boolean => {
    const found = routes.some(r => r.route_id === id);
    if (found) {
      setRoutes(prev => prev.filter(r => r.route_id !== id));
    }
    return found;
  };

  const addSchedule = (schedule: Schedule) => {
    setSchedules(prev => [...prev, schedule]);
  };

  const deleteSchedule = (id: number): boolean => {
    const found = schedules.some(s => s.schedule_id === id);
    if (found) {
      setSchedules(prev => prev.filter(s => s.schedule_id !== id));
    }
    return found;
  };

  const addTrip = (trip: Trip) => {
    setTrips(prev => [...prev, trip]);
  };

  const deleteTrip = (id: number): boolean => {
    const found = trips.some(t => t.trip_id === id);
    if (found) {
      setTrips(prev => prev.filter(t => t.trip_id !== id));
    }
    return found;
  };

  const addTripAssignment = (assignment: TripAssignment) => {
    setTripAssignments(prev => [...prev, assignment]);
  };

  const deleteTripAssignment = (id: number): boolean => {
    const found = tripAssignments.some(a => a.assignment_id === id);
    if (found) {
      setTripAssignments(prev => prev.filter(a => a.assignment_id !== id));
    }
    return found;
  };

  const addRouteStation = (routeStation: RouteStation) => {
    setRouteStations(prev => [...prev, routeStation]);
  };

  const deleteRouteStation = (routeId: number, stationId: number): boolean => {
    const found = routeStations.some(rs => rs.route_id === routeId && rs.station_id === stationId);
    if (found) {
      setRouteStations(prev => prev.filter(rs => !(rs.route_id === routeId && rs.station_id === stationId)));
    }
    return found;
  };

  return (
    <DataContext.Provider
      value={{
        stations,
        trains,
        passengers,
        tickets,
        payments,
        staff,
        routes,
        schedules,
        trips,
        tripAssignments,
        routeStations,
        addStation,
        deleteStation,
        addTrain,
        deleteTrain,
        addPassenger,
        deletePassenger,
        addTicket,
        deleteTicket,
        addPayment,
        deletePayment,
        addStaff,
        deleteStaff,
        addRoute,
        deleteRoute,
        addSchedule,
        deleteSchedule,
        addTrip,
        deleteTrip,
        addTripAssignment,
        deleteTripAssignment,
        addRouteStation,
        deleteRouteStation,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
