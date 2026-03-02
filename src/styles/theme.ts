export const theme = {
  colors: {
    // Primary palette
    primary: '#667eea',
    primaryDark: '#764ba2',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',

    // Sidebar/Dark theme
    sidebarGradient: 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)',
    sidebarBorder: 'rgba(255, 255, 255, 0.1)',
    sidebarText: 'rgba(255, 255, 255, 0.8)',
    sidebarHover: 'rgba(255, 255, 255, 0.1)',
    sidebarActive: 'rgba(255, 255, 255, 0.15)',
    sidebarActiveBorder: '#3498db',

    // Status colors
    success: '#27ae60',
    successDark: '#229954',
    successGradient: 'linear-gradient(135deg, #27ae60 0%, #229954 100%)',
    successLight: '#d4edda',
    successBorder: '#28a745',

    info: '#3498db',
    infoDark: '#2980b9',
    infoGradient: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
    infoLight: '#e1edff',

    danger: '#e74c3c',
    dangerDark: '#bb3f31',
    dangerGradient: 'linear-gradient(135deg, #e74c3c 0%, #bb3f31 100%)',
    dangerLight: '#f8d7da',

    warning: '#f39c12',
    warningDark: '#ff9800',
    warningLight: '#fff3e0',
    warningLightHover: '#ffe0b2',

    // UI colors
    white: '#ffffff',
    background: '#f8f9ff',
    backgroundHover: '#eef1ff',
    backgroundAlt: 'rgb(247, 247, 247)',
    backgroundAlt2: 'rgb(244, 244, 244)',
    backgroundEven: '#f9f9f9',
    backgroundEvenDark: '#efefef',
    backgroundModal: 'rgb(243, 230, 230)',
    backgroundSuccess: '#befbdc',

    text: '#333',
    textSecondary: '#666',
    textMuted: 'rgb(120, 120, 120)',

    border: '#ddd',
    borderDark: '#c1c1c1',
    borderMuted: '#95979f',

    // Match status colors
    matchExact: '#27ae60',
    matchFuzzy: '#f39c12',
    matchManual: '#2196f3',
    matchNone: '#e74c3c',

    // Table cell colors
    cellNumber: '#004daa',
    cellUsed: '#318000',
    cellLeft: '#aa0028',
  },

  spacing: {
    // Base unit: 4px
    xxs: '4px',
    xs: '8px',
    sm: '10px',
    md: '12px',
    base: '16px',
    lg: '20px',
    xl: '24px',
    xxl: '30px',
  },

  radii: {
    sm: '4px',
    md: '6px',
    base: '8px',
    lg: '12px',
    xl: '13px',
    round: '50%',
  },

  fontSizes: {
    xs: '12px',
    sm: '14px',
    base: '16px',
    lg: '18px',
    xl: '20px',
    xxl: '24px',
    xxxl: '28px',
  },

  shadows: {
    sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
    md: '0 2px 4px rgba(0, 0, 0, 0.2)',
    lg: '0 4px 12px rgba(0, 0, 0, 0.31)',
    xl: '0 4px 20px rgba(0, 0, 0, 0.15)',
    xxl: '0 20px 60px rgba(0,0,0,0.3)',
    sidebar: '2px 0 10px rgba(0, 0, 0, 0.2)',
    success: '0 4px 12px rgba(39, 174, 96, 0.3)',
    info: '0 4px 12px rgba(52, 152, 219, 0.3)',
    danger: '0 4px 12px rgba(219, 52, 52, 0.3)',
  },

  sizes: {
    sidebarWidth: '80px',
    sidebarExpandedWidth: 280,
    headerHeight: '70px',
    buttonClose: '50px',
    buttonCloseSmall: '25px',
    iconMd: '40px',
    iconLg: '50px',
    maxContentWidth: '1200px',
    maxFormWidth: '600px',
    maxUploadWidth: '700px',
    toggleWidth: '48px',
    toggleHeight: '26px',
    toggleKnob: '20px',
    spinnerSize: '16px',
  },

  transitions: {
    fast: '0.2s',
    base: '0.3s',
    slow: '0.5s',
  },

  zIndices: {
    sidebar: 1000,
  },
};
