# React-Native-HealthKit-GoogleFit-Expo-Integration
Sample App for React Native HealthKit &amp; GoogleFit Integration without Ejecting from Expo

### Dependencies
1. [React Native Health](https://github.com/agencyenterprise/react-native-health)
2. [React Naitve Google Fit](https://github.com/edgarmacarioiii/react-native-google-fit-mod) (Forked repo to make it work for expo plugin)

### Setup
Make sure you have Xcode and Android Studio installed. Follow these [instructions](https://docs.expo.io/workflow/android-studio-emulator/) to get adb setup to run the Android Emulator.

To setup your development environment:
1. `yarn install`

### Running the application

**Android:** `expo run:android`  
**IOS:** `expo run:ios`  

### Building a standalone application
If EAS is not yet installed run `npm i -g eas-cli`

**Android:** `eas build -p android`  
**IOS:** `eas build -p ios`  
