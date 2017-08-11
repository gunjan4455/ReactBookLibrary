import apiCall from '../../api/apiRequest';
import endPoints from '../../api/endPoints'

export function getBookById(id) {
    console.log("payload========",id)
    const endpoint = `${endPoints.book}/${id}`;
    return apiCall({
        method: 'get',
        endpoint: endpoint
    });
}

export function editBook(id, data) {
    console.log("payload========222",id);
    const endpoint = `${endPoints.book}/${id}`;
    return apiCall({
        method: 'put',
        endpoint: endpoint,
        payload: data
    });
}