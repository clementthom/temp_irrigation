Connexion de l'arduino en WSL

Dans windows: (shell en mode admin)
```
usbipd list (on récupére le pUID ex: 1-2)
usbipd bind --busid 1-2
usbipd attach --wsl --busid 1-2
```
Pour le detacher
```
usbipd detach --busid 1-2
```

Dans Wsl:
```
apt install usbutils (si besoin)
lsusb (On devrait voir l'usb sur lequel est l'arduino)
ls /dev/tty* (On devrait voir le port /dev/ttyACM0)