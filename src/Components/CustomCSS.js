import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomCSS = () => {
    const [customCSS, setCustomCSS] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCustomCSS = async () => {
            try {
                const response = await axios.get('http://122.160.55.196:4344/matrixtraining/wp-json/custom/v1/additional-css'); // Replace with your actual endpoint
                setCustomCSS(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCustomCSS();
    }, []);

    if (loading) return null; // Optionally show a loading indicator
    if (error) return null; // Handle error case

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: customCSS }} />
            <div> Hello </div>
        </>
    );
};

export default CustomCSS;
