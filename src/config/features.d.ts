export interface Feature {
    title: string;
    description: string;
    link?: string;
    requiresAuth?: boolean;
}
export declare const homeFeatures: Feature[];
export declare const protectedFeatures: Feature[];
export { navigationItems as features } from './navigation';
export type { NavigationItem as FeatureItem } from './navigation';
