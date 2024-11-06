import { AuthProvider } from './contexts/AuthContext';
import { Slot } from 'expo-router';
import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerShown: false, // Ajuste conforme necessário
        }}
      >
        <Slot />
      </Stack>
    </AuthProvider>
  );
} 