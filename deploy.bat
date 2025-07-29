@echo off
echo Building and deploying React portfolio to GitHub Pages...
echo.

cd react

echo Installing dependencies...
call npm install

echo Building the project...
call npm run build

echo Deploying to GitHub Pages...
call npm run deploy

echo.
echo Deployment complete! Your portfolio should be available at:
echo https://IstiakAhmd.github.io/portfolio
echo.
pause
