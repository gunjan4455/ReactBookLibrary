import superagent from 'superagent'
import config from '../config'

/*
 * @function "call" common method that makes api requests
 * @param {object} "request" stores the request 'method','endpoint', 'payload', 'query'
 */

export default function call({ 
    //function parameters to be passed
    method = 'get',
    url,
    endpoint,
    payload,
    query,
    type = 'application/json'
}) {
    const { API: { protocols, domain } } = config;
    const _url = `${protocols.HTTP}${domain.BOOKS_CONNECT_LOCAL}/${endpoint}`;

    let fetchData = {
        method: method,
        body: JSON.stringify(payload),
        headers: new Headers({'Content-Type':'application/json'})
    };
    return fetch(_url, fetchData).then(function(response) {
        return response.json();
    });

    //return superagent(method, endpoint ? _url : url)
    //    .set('Content-Type', type)
    //    .send(payload)
    //    .query(query);

}
