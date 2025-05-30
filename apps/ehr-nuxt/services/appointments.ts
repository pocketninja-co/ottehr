export interface Appointment {
  id: string;
  patientName: string;
  time: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled' | 'Completed'; // Added more statuses
}

const mockAppointments: Appointment[] = [
  { id: '1', patientName: 'John Doe', time: '2024-03-15 10:00 AM', status: 'Confirmed' },
  { id: '2', patientName: 'Jane Smith', time: '2024-03-15 11:00 AM', status: 'Pending' },
  { id: '3', patientName: 'Alice Brown', time: '2024-03-15 01:00 PM', status: 'Completed' },
  { id: '4', patientName: 'Bob Johnson', time: '2024-03-16 09:00 AM', status: 'Confirmed' },
  { id: '5', patientName: 'Carol White', time: '2024-03-16 10:30 AM', status: 'Cancelled' },
];

export async function fetchAppointments(): Promise<Appointment[]> {
  console.log('Simulating API call to fetch appointments...');
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate a chance of error
      // if (Math.random() > 0.8) {
      //   console.error('Simulated API error fetching appointments.');
      //   reject(new Error('Failed to fetch appointments. Please try again.'));
      // } else {
        console.log('Successfully fetched mock appointments.');
        resolve([...mockAppointments]); // Return a copy
      // }
    }, 1500); // Simulate 1.5 second delay
  });
}

export async function fetchAppointmentById(id: string): Promise<Appointment | undefined> {
  console.log(`Simulating API call to fetch appointment by ID: ${id}...`);
  return new Promise((resolve) => {
    setTimeout(() => {
      const appointment = mockAppointments.find(app => app.id === id);
      if (appointment) {
        console.log('Successfully fetched mock appointment by ID.');
        resolve({ ...appointment }); // Return a copy
      } else {
        console.warn(`Mock appointment with ID ${id} not found.`);
        resolve(undefined);
      }
    }, 700); // Simulate 0.7 second delay
  });
}
