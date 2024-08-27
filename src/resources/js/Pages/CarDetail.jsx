import React from 'react';
import { Head, usePage } from '@inertiajs/react';

const CarDetail = () => {
    const { data } = usePage().props;

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Head title={`${data.brandName} ${data.modelName}`}  />
            <h1>{data.brandName} {data.modelName}</h1>
            <h2>{data.version}</h2>
            <p><strong>Price:</strong> {data.currency} {data.price.toLocaleString()}</p>
            <p><strong>Year:</strong> {data.year}</p>
            <p><strong>Kilometers:</strong> {data.kilometers.toLocaleString()} Km</p>
            <p><strong>Color:</strong> {data.color}</p>
            <p><strong>Fuel:</strong> {data.fuelName}</p>
            <p><strong>Transmission:</strong> {data.transmissionName}</p>
            <p><strong>Doors:</strong> {data.doors}</p>
            <p><strong>Description:</strong> {data.description}</p>

            <div>
                <h3>Photos:</h3>
                <div>
                    {data.photos.map((photo, index) => (
                        <img
                            key={index}
                            src={photo}
                            alt={`Photo ${index + 1}`}
                            style={{ width: '100px', margin: '5px' }}
                        />
                    ))}
                </div>
            </div>

            <div>
                <h3>Contact:</h3>
                <p><strong>Phone:</strong> {data.phone1}</p>
            </div>
        </div>
    );
};

export default CarDetail;
