function fetchMock(timeArray) {
  let value; let
    i;
  for (i = 0; i < timeArray.length; i += 1) {
    value = timeArray[i];
    fetch.mockResponseOnce(JSON.stringify({
      status: 'OK',
      rows: [{
        elements: [{
          duration_in_traffic: {
            value: value * 60,
          },
          duration: {
            value: 25 * 60,
          },
        }],
      }],
    }));
  }
}

function fetchMockFailure(timeArray, loopToFail) {
  let value; let
    i;
  for (i = 0; i < loopToFail; i += 1) {
    value = timeArray[i];
    fetch.mockResponseOnce(JSON.stringify({
      status: 'OK',
      rows: [{
        elements: [{
          duration_in_traffic: {
            value: value * 60,
          },
          duration: {
            value: 25 * 60,
          },
        }],
      }],
    }));
  }
  fetch.mockResponse(JSON.stringify({
    status: 'rejected',
    error_message: 'error',
    rows: [{
      elements: [{
        duration_in_traffic: {
          value: 20 * 60,
        },
        duration: {
          value: 25 * 60,
        },
      }],
    }],
  }));
}


export default { fetchMock, fetchMockFailure };
/*
fetch
  .mockResponseOnce(JSON.stringify({
    status: 'OK',
    rows: [{
      elements: [{
        duration_in_traffic: {
          value: 30 * 60,
        },
        duration: {
          value: 25 * 60,
        },
      }],
    }],
  }))
  .mockResponseOnce(JSON.stringify({
    status: 'OK',
    rows: [{
      elements: [{
        duration_in_traffic: {
          value: 50 * 60,
        },
        duration: {
          value: 25 * 60,
        },
      }],
    }],
  }))
  .mockResponseOnce(JSON.stringify({
    status: 'OK',
    rows: [{
      elements: [{
        duration_in_traffic: {
          value: 30 * 60,
        },
        duration: {
          value: 25 * 60,
        },
      }],
    }],
  }))
  .mockResponseOnce(JSON.stringify({
    status: 'OK',
    rows: [{
      elements: [{
        duration_in_traffic: {
          value: 30 * 60,
        },
        duration: {
          value: 25 * 60,
        },
      }],
    }],
  }))
  .mockResponseOnce(JSON.stringify({
    status: 'OK',
    rows: [{
      elements: [{
        duration_in_traffic: {
          value: 0 * 60,
        },
        duration: {
          value: 0 * 60,
        },
      }],
    }],
  }))
  .mockResponseOnce(JSON.stringify({
    status: 'OK',
    rows: [{
      elements: [{
        duration_in_traffic: {
          value: 30 * 60,
        },
        duration: {
          value: 0 * 60,
        },
      }],
    }],
  }))
  .mockResponseOnce(JSON.stringify({
    status: 'OK',
    rows: [{
      elements: [{
        duration_in_traffic: {
          value: 60 * 60,
        },
        duration: {
          value: 0 * 60,
        },
      }],
    }],
  }))
  .mockResponseOnce(JSON.stringify({
    status: 'OK',
    rows: [{
      elements: [{
        duration_in_traffic: {
          value: 20 * 60,
        },
        duration: {
          value: 0 * 60,
        },
      }],
    }],
  }))
  .mockResponseOnce(JSON.stringify({
    status: 'OK',
    rows: [{
      elements: [{
        duration_in_traffic: {
          value: 100 * 60,
        },
        duration: {
          value: 0 * 60,
        },
      }],
    }],
  }))
  .mockResponse(JSON.stringify({
    status: 'OK',
    rows: [{
      elements: [{
        duration_in_traffic: {
          value: 30 * 60,
        },
        duration: {
          value: 0 * 60,
        },
      }],
    }],
  }));
*/
