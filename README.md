# OD2 Trip Expense Tracker

A comprehensive trip expense tracker built with Next.js that helps you manage and organize your travel expenses efficiently.

![OD2 Trip Expense Tracker](https://github.com/user-attachments/assets/fff0fbc6-4e4a-478a-9f48-f3e19175a723)

## Features

- ✈️ **Trip Management**: Create and organize multiple trips
- 💰 **Expense Tracking**: Add detailed expenses with categories
- 📊 **Real-time Totals**: Automatic calculation of trip totals
- 🗂️ **Categorization**: Organize expenses by category (Transportation, Accommodation, Food & Dining, Activities, Shopping, Other)
- 💾 **Local Storage**: All data is stored locally in your browser
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- 🎨 **Modern UI**: Clean, intuitive interface built with Radix UI components

## Getting Started

### Prerequisites

- Node.js 14.x or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/1daydeveloper/od2.git
cd od2
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to start tracking your expenses!

## Usage

### Adding a Trip

1. Click the "Add Trip" button
2. Fill in the trip details:
   - Trip Name (e.g., "Summer Vacation 2024")
   - Destination (e.g., "Paris, France")
   - Start Date and End Date
3. Click "Add Trip" to save

### Adding Expenses

1. Select a trip from your trips list
2. Click "Add Expense" in the expenses section
3. Fill in the expense details:
   - Description (e.g., "Hotel Stay - 3 nights")
   - Amount in USD
   - Category (Transportation, Accommodation, etc.)
   - Date of expense
4. Click "Add Expense" to save

### Managing Expenses

- View all expenses for a selected trip
- See real-time totals for each trip
- Delete expenses using the trash icon
- Expenses are automatically categorized and dated

## Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Icons**: Lucide React
- **Storage**: Browser Local Storage
- **Language**: JavaScript/React

## Project Structure

```
src/
├── app/
│   ├── layout.js          # App layout and metadata
│   └── page.js            # Main page
├── components/
│   ├── expense-tracker.js # Main expense tracker component
│   └── ui/               # Reusable UI components
└── styles/
    └── globals.css       # Global styles
```

## Data Storage

All data is stored locally in your browser using localStorage. This means:
- Your data stays private and secure
- No account registration required
- Data persists between browser sessions
- Works offline

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For support, please open an issue on GitHub or contact us at admin@od2.in.

---

Built with ❤️ by [OD2 - One Day Developers](https://od2.in)
