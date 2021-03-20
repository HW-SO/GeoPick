import React from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import TextField from './TextField';
import './Places.scss';

export default function Places(props: any) {
    const [address, setAddress] = React.useState('');
    const [coordinates, setCoordinates] = React.useState({
        lat: null,
        lng: null,
    });

    console.log(coordinates);
    console.log(address);

    const handleSelect = async (value: any) => {
        geocodeByAddress(value)
            .then((results) => getLatLng(results[0]))
            .then((latLng) => props.updateCoordinates(latLng))
            .catch((error) => console.error('Error', error));
        setAddress(value);
        props.updateLocation(value);
    };

    return (
        <div>
            <PlacesAutocomplete value={address} onChange={setAddress} onSelect={handleSelect}>
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                        <TextField {...getInputProps({ placeholder: 'Add Location', className: 'search' })} />

                        <div>
                            {loading ? <div className="load">...loading</div> : null}

                            {suggestions.map((suggestion) => {
                                const style = {
                                    backgroundColor: suggestion.active ? '#f56920' : '#F59158',
                                };

                                return (
                                    <div className="suggestion" {...getSuggestionItemProps(suggestion, { style })}>
                                        <i className="material-icons">location_on</i>
                                        {suggestion.description}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>
        </div>
    );
}
