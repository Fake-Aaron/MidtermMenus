# Expo X Zustand X Supabase Menu CRUD App

This is an Expo powered React Native application integrated with Zustand and Supabase database as a prototype to a restaurant's menu system
This application was made as a Midterm examination Project, bear with me, im very new to this

FEATURES:

= Staff Login with Supabase Auth

= CRUD Operations on menu items

= Navigation using Expo

= Themed UI based on the restaurant

= Order Forms, Deep Linking, and Virtual Deferred Deep Linking

## Setup Instructions
1. Clone the repository, or download it

   ```bash
   git clone https://github.com/Fake-Aaron/MidtermMenus.git
   ```
2. Install dependencies

   ```bash
   npm install
   # or
   yarn install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

3. In the event that the project isnt linked to the Supabase i have (or doesnt work anymore):

= Create a new project at Supabase

= Copy your project url and anon/public key

= Update /lib/supabase.ts file, and change the url and key to your project

After this, you may populate the data from supabase, or from the app itself. make sure to add a user on supabase first, and to make sure all the names match the code so they can pull the data.

IMPORTANT NOTE: The code for staffLogin.tsx does NOT have a register button. This is done to emulate the fact that restaurants do not use register buttons in app. They usually have a tech expert making your account. If you need or want to access the CRUD functions from the staffPanel, Please contact me (Discord: fake_aaron) to help you set up an authenticated account.

Also, this app supports deferred deep linking, but i havent built the app yet, so i used AsyncStorage to simulate it

Tech Stack

= Expo (React Native)

= Supabase

= Zustand

= TypeScript

= React Navigation / Expo Router

If youre reading this, and youre the teacher inspecting my code, hi! Please give me a review on my work, itll be greatly appreciated!