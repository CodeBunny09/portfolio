export default {
  theme: {
    extend: {
      colors: {
        // Portavia exact colors
        primary: "#5e67e6",        // Main accent (indigo blue)
        highlight: "#0bde66",      // Success/highlight (green)

        // Backgrounds
        bgDark: "#0a0a0a",         // Main dark background

        // Text colors - Portavia exact
        textPrimary: "#ffffff",    // White
        textSecondary: "#8f8f8f",  // Grey secondary
        textMuted: "#303030",      // Dark grey
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Antonio', 'Inter', 'sans-serif'],
      },
      fontSize: {
        'base': '16px',
      },
      lineHeight: {
        'tight': '1.2',
        'normal': '1.5',
      },
      spacing: {
        'container': '1200px',
      },
      borderRadius: {
        'portavia': '20px',  // Exact Portavia radius
      },
      maxWidth: {
        'portavia': '1200px',
      },
    },
  },
}
