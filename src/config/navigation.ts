export interface NavigationItem {
  name: string
  path: string
  requiresAuth?: boolean
}

export const navigationItems: NavigationItem[] = [
  { name: 'Discover', path: '/discover' },
  { name: 'Reflect', path: '/reflect' },
  { name: 'Learn', path: '/learn' },
  { name: 'Play', path: '/play' },
  { name: 'Connect', path: '/connect' }
]