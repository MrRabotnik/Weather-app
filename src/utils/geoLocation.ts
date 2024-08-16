const getCurrentLocation = (): Promise<{
  latitude: number;
  longitude: number;
}> => {
  return new Promise((resolve, reject) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          resolve({ latitude, longitude });
        },
        (error) => {
          reject(`Error (${error.code}): ${error.message}`);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      reject("Geolocation is not supported by this browser.");
    }
  });
};

getCurrentLocation()
  .then((location) => {
    return {
      latitude: location.latitude,
      longitude: location.longitude,
    };
  })
  .catch((error) => {
    console.error(error);
  });

export default getCurrentLocation;
