const mapRequest = (url, done, error) => {
  const request = new XMLHttpRequest();
  request.onreadystatechange = () => {
    if (request.readyState !== 4) return;

    if (request.status === 200) {
      const response = JSON.parse(request.responseText);
      if (response.status === 'OK') {
        done(response);
      } else error('Request Unsuccessful');
    } else error('Fetch Error');
  };
  request.open('GET', url);
  request.send();
};

export default mapRequest;
