@echo off
REG ADD "HKCU\Control Panel\Desktop" /V Wallpaper /T REG_SZ /F /D "c:\images\image1.bmp"
REG ADD "HKCU\Control Panel\Desktop" /V WallpaperStyle /T REG_SZ /F /D 1
REG ADD "HKCU\Control Panel\Desktop" /V TileWallpaper /T REG_SZ /F /D 0
%SystemRoot%\System32\RUNDLL32.EXE USER32.DLL,UpdatePerUserSystemParameters 1, True
wmic.exe process where name="explorer.exe" call TERMINATE
