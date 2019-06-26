# Sign in with Apple

Sign in with Apple for React Native ⚛

## 🏁 Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you start, please make sure to follow requirements below:

```
- 🔨 Xcode 11 Beta
- 📱 Real iOS device or simulator running iOS 13 (Sign in with Apple is available for iOS 13 and newer)
- ✅ Sign in with Apple enabled application & app ID (Follow this [link](https://help.apple.com/developer-account/#/devde676e696) for find out how to do that). If you skip this step, you will not be able to authorize!
- 📋 You have read official [guidelines & docs](https://developer.apple.com/sign-in-with-apple/)
- 🥜 Cocoapods installed on your system (or you will have to link native code manually).
```

## 📥 Installing

A step by step series of examples that tell you how to get a development env running.

### 1. Install NPM package

First, you need to install NPM package using npm or yarn.

```sh
npm install @bymade/sign-in-with-apple --save
```

And with yarn

```bash
yarn add @bymade/sign-in-with-apple
```

### 2. Linking native code

#### 2.1. Make Xcode project Swift friendly

Since this package is written in Swift, it requires you to create at least one empty Swift file.

1. Go ahead and create empty `SwiftPlaceholder.swift` with Xcode using `File > New > File > Swift File`
2. When asked to create bridging header file select **Create Bridging Header** and Xcode will create this file and update configuration for you. You won't be asked to create this file anymore.

These steps are crucial as Xcode will not be able to compile your project without this configuration.

In the future I will try to provide seamless integration without manually creating Swift file.

#### 2.2. Link native code

##### Cocoapods

This package comes with first support for Cocoapods and it makes integration easy.
If you are running React Native 0.60.0 and newer, you are in luck. It comes with Cocoapods support by default.

Open `ios/Podfile` file located in your project and add this line:

```
pod 'SignInWithApple', :podspec => '../node_modules/sign-in-with-apple/SignInWithApple.podspec'
```

##### Manual linking

Guide on manual linking coming soon, contributions welcome!

## 🕹️ Usage

Please, see this [component](https://github.com/Andreyco/sign-in-with-apple/blob/master/Example/App.tsx#L25) and this [type definition](https://github.com/Andreyco/sign-in-with-apple/blob/master/src/SignInWithAppleButton.tsx#L19) as a reference to usage examples, **detailed docs are work in progress**. If having issues or want to do quick setup, please see [example project](https://github.com/Andreyco/sign-in-with-apple/blob/master/Example)

## 🐛 Known Issues

- There is an issue with "Sign in with Apple" button when **button style does not change** and appears as "black", even if setting button style to "white" or "whiteOutline". As you could see in official presentation, Apple showed us black button only 😎.
- I experience issue where I cannot authorize on iOS simulator cause I cannot type in in presented authorization sheet. I cannot change my name and cannot type in password to complete authorization. Everything works just fine on real iOS device.
- On subsequent authorization attempts `email` and `fullName` fields among others are not returned but you receive them on first attempt. While testing, you can deauthorize your app and run again 🤦‍. I am not sure, whether this will change, but according to [Apple docs](https://developer.apple.com/documentation/authenticationservices/asauthorizationappleidcredential) these **fields are optional!**
- **`authorizedScopes` field is not populated** and blank collection is returned, despite user authorizes `fullName` and `email` scope. Again, not sure what to thing about this.

I expect Apple will address this soon! 👏

## 🧪 Running the tests

Sorry, tests are work in progress and help is welcome. I'd like to focus on unit tests as well as end-to-end test (Detox) to make this library as flawless as possible.

## 🔀 Contributing

This is "beta" preview since **Sign in with Apple service itself is in beta stage** as well. Apple warns behaviour and API might change and some features might be buggy (and they are, see _Known issues_ section).
While in beta stage, we can fine tune library API to make most of it so I am open to your ideas! In general, please open issue and initiate discussion before any work is done.

## 🏗 Roadmap

- Expanding API (will provide information later, also open to ideas.)
- Detailed docs and nicer demo
- Web support
- homepage

## 🏷 Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## 👥 Authors

- **Andrej Badin** - [@Andreyco](https://github.com/andreyco)

Big thanks to [Volodymyr Sichka](https://www.npmjs.com/~volodymyr.sichka) for NPM package name!

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
