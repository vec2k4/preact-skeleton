@echo off
set INPUTFILE=npm-install.cfg

for /f "tokens=1,2 delims=^=^" %%a in (%INPUTFILE%) do (
	if "%%a"=="RUN" (
		echo Running '%%b'
		call %%b
		echo.
	)
)

