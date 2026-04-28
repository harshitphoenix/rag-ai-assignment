export async function registerSW() {
  if (!('serviceWorker' in navigator)) return;

  try {
    const reg = await navigator.serviceWorker.register('/sw.js');
    console.log('[SW] Registered', reg.scope);
  } catch (err) {
    console.error('[SW] Registration failed', err);
  }
}

export async function requestNotificationPermission(): Promise<boolean> {
  if (!('Notification' in window)) return false;
  if (Notification.permission === 'granted') return true;
  const result = await Notification.requestPermission();
  return result === 'granted';
}

export async function sendNotification(title: string, body: string) {
  const reg = await navigator.serviceWorker.ready;
  if (!reg.active) return;
  reg.active.postMessage({ type: 'SHOW_NOTIFICATION', title, body });
}

export function schedulePatientAlerts() {
  // Show an alert notification 3 seconds after login as a demo
  setTimeout(async () => {
    const granted = await requestNotificationPermission();
    if (!granted) return;
    await sendNotification(
      'Patient Alert — HealthOS',
      '3 critical patients require immediate attention in ICU.'
    );
  }, 3000);
}
