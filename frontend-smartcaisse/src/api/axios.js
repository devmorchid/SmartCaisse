import axios from 'axios';

axios.post('http://127.0.0.1:8000/logout', {}, {
  withCredentials: true, 
  headers: {
    'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'), 
    'Accept': 'application/json'
  }
}).then(response => {
  console.log('Déconnexion réussie');
}).catch(error => {
  console.error('Erreur:', error.response);
});


function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return decodeURIComponent(match[2]);
}
