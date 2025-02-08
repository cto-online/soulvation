interface CustomizerConfig {
    Sidebar_drawer: boolean;
    Customizer_drawer: boolean;
    mini_sidebar: boolean;
    setHorizontalLayout: boolean;
    setRTLLayout: boolean;
    actTheme: string;
    boxed: boolean;
    setBorderCard: boolean;
}

const config: CustomizerConfig = {
    // Sidebar default state
    Sidebar_drawer: true,
    
    // Customizer drawer default state
    Customizer_drawer: false,
    
    // Mini sidebar default state
    mini_sidebar: false,
    
    // Layout settings
    setHorizontalLayout: false, // Default to vertical layout
    setRTLLayout: false, // Default to LTR
    
    // Theme settings
    actTheme: 'BLUE_THEME', // Default theme
    
    // Container settings
    boxed: false, // Default to full width
    
    // Card settings
    setBorderCard: false // Default to no border
};

// Export types
export type { CustomizerConfig };

// Export default config
export default config;