import { defineStore } from 'pinia';

interface DashboardState {
    loading: boolean;
    welcomeData: {
        userName: string;
        budget: number;
        expense: number;
    };
    customerData: {
        count: number;
        change: number;
        history: number[];
    };
    projectData: {
        count: number;
        change: number;
        history: number[];
    };
    revenueData: {
        years: {
            year: number;
            data: number[];
            color: string;
        }[];
        months: string[];
    };
    performanceData: {
        metrics: {
            title: string;
            subtitle: string;
            icon: string;
            color: string;
            value: number;
        }[];
        totalScore: number;
    };
    customerChartData: {
        currentWeek: {
            name: string;
            data: number[];
            total: number;
            dateRange: string;
        };
        lastWeek: {
            name: string;
            data: number[];
            total: number;
            dateRange: string;
        };
        growth: number;
    };
    salesData: {
        metrics: {
            label: string;
            value: number;
            color: string;
            description: string;
        }[];
    };
    revenueProductsData: {
        projects: {
            id: string;
            lead: {
                id: string;
                name: string;
                designation: string;
                avatar: string;
            };
            name: string;
            status: {
                text: string;
                color: string;
            };
            budget: number;
        }[];
    };
    settlementData: {
        total: number;
        balance: number;
        withdrawals: number;
        history: number[];
        weeks: string[];
    };
}

export const useDashboardStore = defineStore({
    id: 'dashboard',
    
    state: (): DashboardState => ({
        loading: false,
        welcomeData: {
            userName: 'David',
            budget: 98450,
            expense: 24400
        },
        customerData: {
            count: 36358,
            change: 12.5,
            history: [36, 45, 31, 47, 38, 43]
        },
        projectData: {
            count: 78298,
            change: 31.8,
            history: [3, 5, 5, 7, 6, 5, 3, 5, 3]
        },
        revenueData: {
            years: [
                {
                    year: 2024,
                    data: [100, 75, 80, 40, 20, 40, 0, 25],
                    color: 'primary'
                },
                {
                    year: 2023,
                    data: [50, 60, 30, 55, 75, 60, 100, 120],
                    color: 'error'
                }
            ],
            months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']
        },
        performanceData: {
            metrics: [
                {
                    title: 'Project Performance',
                    subtitle: 'Project completion rate',
                    icon: 'chart-line',
                    color: 'primary',
                    value: 85
                },
                {
                    title: 'Team Collaboration',
                    subtitle: 'Team efficiency score',
                    icon: 'account-group',
                    color: 'error',
                    value: 75
                },
                {
                    title: 'Resource Utilization',
                    subtitle: 'Resource usage efficiency',
                    icon: 'chart-bar',
                    color: 'warning',
                    value: 65
                }
            ],
            totalScore: 275
        },
        customerChartData: {
            currentWeek: {
                name: 'Current Week',
                data: [0, 20, 15, 19, 14, 25, 30],
                total: 6380,
                dateRange: 'April 07 - April 14'
            },
            lastWeek: {
                name: 'Last Week',
                data: [0, 8, 19, 13, 26, 16, 25],
                total: 4298,
                dateRange: 'Last Week'
            },
            growth: 26.5
        },
        salesData: {
            metrics: [
                {
                    label: 'Direct Sales',
                    value: 50,
                    color: 'primary',
                    description: 'Sales through direct channels'
                },
                {
                    label: 'Partner Sales',
                    value: 80,
                    color: 'secondary',
                    description: 'Sales through partners'
                },
                {
                    label: 'Online Sales',
                    value: 30,
                    color: 'error',
                    description: 'Sales through online platforms'
                }
            ]
        },
        revenueProductsData: {
            projects: [
                {
                    id: '1',
                    lead: {
                        id: 'l1',
                        name: 'John Smith',
                        designation: 'Senior Developer',
                        avatar: ''
                    },
                    name: 'Mobile App Development',
                    status: {
                        text: 'High',
                        color: 'error'
                    },
                    budget: 24500
                },
                {
                    id: '2',
                    lead: {
                        id: 'l2',
                        name: 'Sarah Johnson',
                        designation: 'Product Manager',
                        avatar: ''
                    },
                    name: 'Website Redesign',
                    status: {
                        text: 'Medium',
                        color: 'warning'
                    },
                    budget: 18750
                }
            ]
        },
        settlementData: {
            total: 122580,
            balance: 90940,
            withdrawals: 31640,
            history: [40, 40, 80, 80, 30, 30, 10, 10, 30, 30, 100, 100, 20, 20, 140, 140],
            weeks: ['1W', '', '3W', '', '5W', '6W', '7W', '8W', '9W', '', '11W', '', '13W', '', '15W']
        }
    }),

    actions: {
        async fetchDashboardData() {
            this.loading = true;
            try {
                // In a real application, you would make API calls here
                // For now, we're using mock data initialized in state
                await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                this.loading = false;
            }
        },

        updateWelcomeData(data: Partial<DashboardState['welcomeData']>) {
            this.welcomeData = { ...this.welcomeData, ...data };
        },

        updateCustomerData(data: Partial<DashboardState['customerData']>) {
            this.customerData = { ...this.customerData, ...data };
        },

        updateProjectData(data: Partial<DashboardState['projectData']>) {
            this.projectData = { ...this.projectData, ...data };
        }
    }
});