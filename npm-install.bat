@echo off

echo Runnning 'npm install typescript --save-dev'
call npm install typescript --save-dev
echo.

echo Running 'npm install webpack webpack-dev-server --save-dev'
call npm install webpack webpack-dev-server --save-dev
echo.

echo Running 'npm install ts-loader style-loader css-loader file-loader --save-dev'
call npm install ts-loader style-loader css-loader file-loader ts-nameof-loader --save-dev
echo.

echo Running 'npm install webpack-merge --save-dev'
call npm install webpack-merge --save-dev
echo.

echo Running 'call npm install html-webpack-plugin clean-webpack-plugin uglifyjs-webpack-plugin --save-dev'
call npm install html-webpack-plugin clean-webpack-plugin uglifyjs-webpack-plugin --save-dev
echo.

echo Running 'npm install preact --save'
call npm install preact --save
echo.

echo Running 'npm install ts-nameof --save'
call npm install ts-nameof --save
echo.
