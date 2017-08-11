import apiCall from '../../api/apiRequest';
import endPoints from '../../api/endPoints'

export default function getAllBooks(payload) {
    return apiCall({
        method: 'get',
        endpoint: endPoints.books
    });
}