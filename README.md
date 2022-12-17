YOU MUST OWN A C2 LICENSE TO USE THIS TOOL. IT IS NOT ALLOWED TO EXPORT GAMES TO DESKTOP WITH THE FREE VERSION.

# Electron for Construct 2

<img src="icon.svg">

Preview Construct 2 apps/games in a Electron prebuilt exe - as if Electron were a normal browser!

Latest : [1.9.3](https://github.com/Floflis/AppPlayer-Electron/releases/)


*See also : [Steam plugin for Electron (Work In Progress)](#)*

[DISCORD](https://discord.gg/0eLPLj96B4t3Dpgo)

## Construct 2 preview
* Download and install [ElectronForC2](https://github.com/Floflis/AppPlayer-Electron/releases)
* Add the latest version of the [Construct plugin](https://github.com/C2Electron/template/releases) to your project

Even if you don’t use any Action, Condition or Expressions from the plugin, you **HAVE TO** add it to your project in order to make it work.

* Open Construct 2 > File > Preferences > Preview > Custom Browser
* Set the path to the custom browser to the **electron-prebuilt.exe** file where you installed it previously
* Click OK

## Export
* Download the precompiled Electron version of your choice [release page](https://github.com/Floflis/AppPlayer-Electron/releases/).
* Extract the zip containing the Electron precompiled wherever you want. (Ex: **Electron_Folder**)
* Select HTML and export to **Electron_Folder**/ressources/app/www

* Run your game by launching **Electron_Folder**/electron-prebuilt.exe

If you have any issue please ask [here](https://github.com/C2Electron/template/issues)

## Build It Yourself (the DIY of apps)

To do a DIY of AppPlayer:

1. Clone this git repo;
2. Inside it open the sorcery/terminal/command prompt;
3. Then type the following 2 commands:

### 1:

```sh
npm install
```

### 2:

```sh
npm run build
```

Done! ❤️

## FAQ
> The page can't load, I have a blank page telling me that I am unathorized

Use **preview on LAN**. Localhost doesn't work.

## Credits

Originally made by [@Armaldio](https://github.com/Armaldio), became legacy, and then was rescued by [@danimesq](https://github.com/danimesq) followed by its original developer, [@Armaldio](https://github.com/Armaldio).
