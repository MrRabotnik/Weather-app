const getCurrentLocation = (): Promise<{
    latitude: number;
    longitude: number;
}> => {
    return new Promise((resolve, reject) => {
        if ("geolocation" in navigator) {
            navigator.permissions.query({ name: "geolocation" }).then((result) => {
                if (result.state === "granted" || result.state === "prompt") {
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
                } else if (result.state === "denied") {
                    reject("Geolocation access denied.");
                }
            });
        } else {
            alert("Geolocation is not supported by this browser.");
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
        console.error("Error retrieving location:", error);
    });

export default getCurrentLocation;
