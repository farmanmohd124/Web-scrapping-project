// document.getElementById('scraper-form').addEventListener('submit', async function (event) {
//     event.preventDefault();
  
//     const url = document.getElementById('url').value;
//     const tag = document.getElementById('tag').value;
  
//     // Clear previous results
//     const dataList = document.getElementById('data-list');
//     dataList.innerHTML = '';
  
//     try {
//       const response = await fetch('/scrape', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ url, tag })
//       });
  
//       const result = await response.json();
  
//       if (result.success) {
//         result.data.forEach(item => {
//           const li = document.createElement('li');
//           li.textContent = item;
//           dataList.appendChild(li);
//         });
//       } else {
//         dataList.innerHTML = `<li>${result.message}</li>`;
//       }
//     } catch (error) {
//       dataList.innerHTML = `<li>Error fetching data</li>`;
//     }
//   });
  
document.getElementById('scraper-form').addEventListener('submit', async function (event) {
  event.preventDefault();

  const url = document.getElementById('url').value;
  const tag = document.getElementById('tag').value;

  // Clear previous results
  const dataList = document.getElementById('data-list');
  dataList.innerHTML = '';

  try {
    const response = await fetch('/scrape', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url, tag })
    });

    const result = await response.json();

    if (result.success) {
      result.data.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        dataList.appendChild(li);
      });
    } else {
      const li = document.createElement('li');
      li.textContent = result.message;
      dataList.appendChild(li);
    }
  } catch (error) {
    const li = document.createElement('li');
    li.textContent = `Error fetching data: ${error.message}`;
    dataList.appendChild(li);
  }
});
