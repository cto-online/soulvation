export const homeFeatures = [
    {
        title: 'Discover',
        description: 'Start your journey by exploring our platform and what it has to offer.',
        link: '/discover'
    },
    {
        title: 'Learn',
        description: 'Access curated content and resources to enhance your knowledge and skills.',
        link: '/learn'
    },
    {
        title: 'Play',
        description: 'Engage with interactive content and exercises designed to make learning fun.',
        link: '/play'
    },
    {
        title: 'Connect',
        description: 'Join our community and interact with others on similar learning journeys.',
        link: '/connect'
    }
];
// Protected features requiring authentication
export const protectedFeatures = [
    {
        title: 'Create Your Avatar',
        description: 'Design and customize your personal avatar that will accompany you throughout your journey.',
        link: '/avatar',
        requiresAuth: true
    },
    {
        title: 'Explore Scenarios',
        description: 'Navigate through various life-like scenarios that challenge your thinking and decision-making abilities.',
        link: '/scenarios',
        requiresAuth: true
    },
    {
        title: 'Track Progress',
        description: 'Monitor your growth and achievements as you complete scenarios and unlock new challenges.',
        link: '/progress',
        requiresAuth: true
    }
];
// Re-export navigation items for consistency
export { navigationItems as features } from './navigation';
