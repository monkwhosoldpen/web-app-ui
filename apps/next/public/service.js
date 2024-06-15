self.addEventListener('install', event => {
    console.log('Service Worker installing.');
    // Perform install steps
});

self.addEventListener('activate', event => {
    console.log('Service Worker activated.');
    // Perform activation steps
});

const enhancedNotificationData = {
    title: '🔔 Extended Notification Title!',
    body: 'This is an enhanced notification message with more details, images, and actions.',
    icon: 'https://via.placeholder.com/192.png?text=Icon', // Placeholder icon
    image: 'https://via.placeholder.com/512x256.png?text=Image', // Placeholder image
    badge: 'https://via.placeholder.com/96.png?text=Badge', // Placeholder badge
    actions: [
        { action: 'view-settings', title: 'View Settings', icon: 'https://via.placeholder.com/128.png?text=Settings' },
        { action: 'dismiss', title: 'Dismiss', icon: 'https://via.placeholder.com/128.png?text=Dismiss' }
    ],
    data: { url: '/settings' }, // Custom data for handling clicks
    vibrate: [200, 100, 200]
};

self.addEventListener('push', async (event) => {
    let data;

    console.log('Received push event:', event);

    try {
        data = event.data.json();
        console.log('Actual push event data:', data);
    } catch (e) {
        console.log('Error parsing push data, using enhanced mock data instead.');
        data = enhancedNotificationData;
    }

    if ('setAppBadge' in self.navigator) {
        console.log('Setting app badge based on push event data.');
        const badgeCount = await determineBadgeCount(data); // Dynamically determine badge count
        self.navigator.setAppBadge(badgeCount);
    }

    self.registration.showNotification(data.title, {
        body: data.body,
        icon: data.icon,
        image: data.image,
        badge: data.badge,
        data: data.data,
        actions: data.actions,
        vibrate: data.vibrate
    });

    event.waitUntil(self.registration.showNotification(data.title, data));
});

self.addEventListener('notificationclick', function (event) {
    const notification = event.notification;
    const action = event.action;
    const data = notification.data;

    if (action === 'view-settings') {
        clients.openWindow(data.url);
    } else if (action === 'dismiss') {
        console.log('Notification dismissed');
    } else {
        clients.openWindow('/');
    }

    notification.close();
});


// Function to determine the badge count based on the event data
async function determineBadgeCount(data) {
    // Since we're mocking, we're not using the data parameter here
    const badgeData = await fetchBadgeCountData();

    // Assuming badgeData contains a count property
    if (badgeData && typeof badgeData.count === 'number') {
        console.log(`Computed badge count from mocked data: ${badgeData.count}`);
        return badgeData.count;
    } else {
        console.log('No badge data found or invalid format, defaulting to 0.');
        return 0;
    }
}

// Mocked async function to simulate fetching badge count data
async function fetchBadgeCountData() {
    // Simulating network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Generate a random badge count for simulation purposes
    const randomBadgeCount = Math.floor(Math.random() * 100) + 1;
    console.log('Mocked fetch badge count data:', randomBadgeCount);

    return { count: randomBadgeCount };
}
