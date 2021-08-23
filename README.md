## API uses: 
* OpenweatherMap: https://openweathermap.org/current 
* Google Place Search: https://developers.google.com/maps/documentation/places/web-service/search-find-place
* Google Place Photos: https://developers.google.com/maps/documentation/places/web-service/photos

## Lesson learned (To be updated)
### Using Google APIs to get an image of a city
Enabling Places API and billing 

Place Photos API requires a photo_reference parameter (can be acquired from Place Search)

Getting photo_reference from Place Search, src\components\Result.js line 16

```javascript 
    const proxyUrl = "https://tues-cors-anywhere.herokuapp.com/"; 
    let api_url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${elem.name + "," + (elem.sys.state ? elem.sys.state + "," : '') + elem.sys.country.toLowerCase()}&inputtype=textquery&fields=name,photos&key=${process.env.REACT_APP_GG_KEY}`
    const placesRequest = await axios.get(proxyUrl + api_url);
    const photoRef = placesRequest?.data?.candidates?.[0]?.photos?.[0]?.photo_reference;
```

Getting photo using photo_reference by calling Place Photos, src\components\Result.js line 21

```javascript 
    const placePhotoUrl = `https://maps.googleapis.com/maps/api/place/photo?photoreference=${photoRef}&key=${process.env.REACT_APP_GG_KEY}&maxwidth=700&maxheight=700`;
    const imageURLQuery = await fetch(proxyUrl + placePhotoUrl)
    .then(r => r.blob())
    .catch(console.error);
    const img = URL.createObjectURL(imageURLQuery); 
```

I use fetch here instead of axios because it turns the image file into binary file. Cast the image file into a blob after getting response seems to work well. 

### How to make background transparent without affecting its children
* src\index.css line 46

```javascript 
  background: rgba(255, 121, 121, 0.5);
```

### Pagination (Result and Pagination component)
Slicing the data passed to Result component => trimmed data is an array of length 3 

```javascript 
    if(resultData.data !== null) {
        if(resultData.data.length > 3) 
            setToProcess(prevState => ({...prevState, trimmedData: resultData.data.slice(0,3), pageNumber: 1, totalPage: Math.ceil(resultData.data.length / 3)}));
        else
            setToProcess(prevState => ({...prevState, trimmedData: resultData.data, pageNumber: 1, totalPage: 1}));
    }
```

Once page button is clicked, set state (pageNumber) of Result => update trimmed data based on pageNumber 

```javascript 
    const changePage = (pageNum) => {
        if(pageNum != toProcess.pageNumber) {
            const start = (pageNum * 3) - 3
            const end =  (pageNum * 3) >= resultData.data.length ? resultData.data.length : (pageNum * 3) % resultData.data.length;
            setToProcess(prevState => ({...prevState, trimmedData: resultData.data.slice(start, end), pageNumber: pageNum}));
        }
    }
```
### Google Map in React
Documentation: https://tomchentw.github.io/react-google-maps/

<!-- # Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify) -->


