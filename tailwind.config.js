module.exports = {
  darkMode: 'media',
  purge: ["./src/**/*.jsx"],
  theme: {
    maxWidth: {
      '200':'200px',
      '300':'300px',
      '400':'400px',
      '500':'500px',
      '600':'600px',
    },
    maxHeight: {
      '200':'200px',
      '300':'300px',
      '400':'400px',
      '500':'500px',
      '600':'600px',
    },
    extend: {
      spacing: {
        '300': '300px',
        '400': '400px',
        '500': '500px',
        '600': '600px',
      },
      gridTemplateColumns: {
        '19': 'repeat(19, minmax(0,1fr))',
        '20': 'repeat(20, minmax(0,1fr))',
        '21': 'repeat(21, minmax(0,1fr))',
        '22': 'repeat(22, minmax(0,1fr))',
      }
    }
  }
}
