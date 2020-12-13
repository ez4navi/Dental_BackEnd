import axios from '../../core/axios';

export default {
  get: () => axios.get('/patients'),
  remove: id => axios.delete('/patients/' + id),
  add: values => axios.post('/patients', values),
  show: id => axios.get('/patients/' + id),
};
