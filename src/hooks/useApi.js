import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';

const useApi = (endpoint, method = 'GET', body = null, immediate = true) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(immediate);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async (customBody = null) => {
        setLoading(true);
        setError(null);

        try {
            const response = await api({
                url: endpoint,
                method: method.toLowerCase(),
                data: body || customBody,
            });
            setData(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, [endpoint, method, body]);

    useEffect(() => {
        if (immediate) {
            fetchData();
        }
    }, [fetchData, immediate]);

    return { data, loading, error, refetch: fetchData };
};

export default useApi;
