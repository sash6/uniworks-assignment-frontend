const base_url = 'https://uniworks-backend.herokuapp.com/' //'http://localhost:8000/'

export default {
    register: base_url+'api/user/register',
    login: base_url+'api/user/login',
    saveForm: base_url+'api/form/save',
    requests: base_url+'api/getRequests',
    users: base_url+'api/getUsers',
    statusUpdate: base_url+'api/update/status',
    webPushNotification: base_url+ 'api/subscribe'                      
}