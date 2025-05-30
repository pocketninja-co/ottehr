<template>
  <div>
    <Banner
      text="Welcome to the Visits Page! This is a sample banner."
      icon="info"
      bgcolor="bg-blue-100"
      color="text-blue-700"
      height="h-16"
    />
    <div class="p-4">
      <h1 class="text-2xl font-semibold mb-4">Visits Page</h1>
      <p class="mb-2">Path: /visits</p>

      <div class="my-6">
        <h2 class="text-xl mb-2">Sample Rounded Buttons:</h2>
        <RoundedButton @click="handleButtonClick" variant="filled" color="primary" size="medium" class="mr-2">
          Primary Filled
        </RoundedButton>
        <RoundedButton @click="handleButtonClick" variant="outlined" color="secondary" size="small" class="mr-2">
          Secondary Outlined (Small)
        </RoundedButton>
        <RoundedButton :to="'/patients'" variant="text" color="primary" size="large" class="mr-2">
          Go to Patients (Text, Large)
        </RoundedButton>
        <RoundedButton @click="handleButtonClick" variant="filled" color="danger" :disabled="true">
          Disabled Danger
        </RoundedButton>
      </div>

      <div class="my-6">
        <h2 class="text-xl mb-2">Sample Custom Chip:</h2>
        <CustomChip type="document" label="Completed Task" :completed="true" fill="#4CAF50" class="mr-2" />
        <CustomChip type="document" label="Pending Task" :completed="false" fill="#FF9800" class="mr-2" />
        <CustomChip type="status bullet" fill="green" class="mr-2" /> <span class="text-sm">Online</span>
      </div>

       <div class="my-6">
        <h2 class="text-xl mb-2">Sample Loading Indicator:</h2>
        <LoadingIndicator />
      </div>

      <hr class="my-8 border-gray-300" />

      <div class="my-6">
        <h2 class="text-2xl font-semibold mb-4">Upcoming Appointments</h2>
        <div v-if="pendingAppointments" class="text-center">
          <LoadingIndicator />
          <p class="mt-2">Loading appointments...</p>
        </div>
        <div v-else-if="appointmentsError" class="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
          <span class="font-medium">Error!</span> {{ appointmentsError.message || 'Failed to load appointments.' }}
        </div>
        <div v-else-if="appointments && appointments.length > 0">
          <ul class="space-y-4">
            <li v-for="appointment in appointments" :key="appointment.id" class="p-4 bg-white shadow rounded-lg">
              <div class="flex justify-between items-center">
                <div>
                  <h3 class="text-lg font-semibold text-blue-600">{{ appointment.patientName }}</h3>
                  <p class="text-sm text-gray-600">Time: {{ appointment.time }}</p>
                </div>
                <CustomChip
                  type="document"
                  :label="appointment.status"
                  :completed="appointment.status === 'Completed' || appointment.status === 'Confirmed'"
                  :fill="getChipColor(appointment.status)"
                />
              </div>
               <NuxtLink :to="`/visits/${appointment.id}`" class="text-sm text-blue-500 hover:underline mt-2 inline-block">
                View Details
              </NuxtLink>
            </li>
          </ul>
        </div>
        <div v-else class="p-4 text-sm text-gray-700 bg-gray-100 rounded-lg">
          No appointments found.
        </div>
      </div>

      <!-- Example of LoadingScreen activation (typically controlled by reactive state) -->
      <!-- <RoundedButton @click="showLoadingScreen = true" color="primary" variant="outlined">
        Show Loading Screen
      </RoundedButton>
      <LoadingScreen v-if="showLoadingScreen" message="Processing your request..." /> -->

    </div>
  </div>
</template>

<script setup lang="ts">
import Banner from '~/components/Banner.vue';
import RoundedButton from '~/components/RoundedButton.vue';
import CustomChip from '~/components/CustomChip.vue';
import LoadingIndicator from '~/components/LoadingIndicator.vue';
// import LoadingScreen from '~/components/LoadingScreen.vue'; // For manual testing
// import { ref } from 'vue';

import { fetchAppointments, type Appointment } from '~/services/appointments';

definePageMeta({
  middleware: 'auth'
});

// const showLoadingScreen = ref(false); // For manual testing of LoadingScreen

const handleButtonClick = () => {
  console.log('Button clicked!');
  // alert('Button clicked!');
};

// Fetching appointments
const { data: appointments, pending: pendingAppointments, error: appointmentsError } = useAsyncData<Appointment[]>(
  'appointmentsList',
  () => fetchAppointments()
);

const getChipColor = (status: Appointment['status']): string => {
  switch (status) {
    case 'Confirmed':
      return '#34D399'; // Tailwind green-400
    case 'Pending':
      return '#FBBF24'; // Tailwind amber-400
    case 'Cancelled':
      return '#F87171'; // Tailwind red-400
    case 'Completed':
      return '#60A5FA'; // Tailwind blue-400
    default:
      return '#9CA3AF'; // Tailwind gray-400
  }
};


// Example: Hide loading screen after some time
// if (showLoadingScreen.value) {
//   setTimeout(() => {
//     showLoadingScreen.value = false;
//   }, 3000);
// }
</script>
