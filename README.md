# ShoppingList App

A sleek, performant, and intuitive React Native shopping list application built with Expo, Redux Toolkit, and TypeScript. Designed to make grocery trips organized and stress-free.

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npm start
   ```
#### Project Structure
```bash
NATIVE_SHOPPINGLISTAPP/
├── .expo/                # Expo configuration and cache
├── .vscode/              # Editor-specific settings
├── assets/               # Local assets (images, fonts, splash screen)
│   └── images/           # App-specific image files
├── app/                  # Main Expo Router directory
│   ├── _layout.tsx       # Root layout defining navigation structure
│   └── index.tsx         # Main entry screen (Shopping List)
├── components/           # Reusable UI components
│   ├── FAButton.tsx      # Floating Action Button for adding items
│   └── InputField.tsx    # Custom text input components
├── data/                 # Static data or mock JSON files
├── features/             # Redux Slices (Logic & State)
│   └── shoppingListSlice.ts # State logic for adding, editing, and deleting items
├── node_modules/         # Project dependencies
├── types/                # TypeScript interfaces and type definitions
│   └── shopping.ts       # Shopping item and state types
├── .gitignore            # Files and folders to be ignored by Git
├── app.json              # Expo configuration file
├── eslint.config.js      # Linting rules for code quality
├── expo-env.d.ts         # Expo TypeScript declarations
├── hooks.ts              # Typed Redux hooks (useAppDispatch, useAppSelector)
├── package-lock.json     # Locked versions of dependencies
├── package.json          # Project metadata and dependency list
├── README.md             # Project documentation
├── store.ts              # Redux store configuration
└── tsconfig.json         # TypeScript configuration settings
```