import { expect, test} from '@playwright/test';


test('test', async ({ request }) => {
  const response = await request.get('https://api.restful-api.dev/objects/10');
  var name2 = await response.json()
  var name1 = await name2.data.price
  expect(name2.data.price).toBe(1849.99);
  console.log(name2)
  console.log(name1)
  
}); 

test('test1', async ({ request }) => {
  const response = await request.get('https://api.restful-api.dev/objects?id=3&id=5&id=10');
  var res = await response.json()
  var name1 = await res[1].name
  console.log(name1)
});


test('test2', async ({ request }) => {
  const response = await request.post('https://api.restful-api.dev/objects', {
    headers: {
      'Content-Type': 'application/json',
    },
    data: {
      name: 'Apple MacBook Pro 16',
      data: {
        year: 2019,
        price: 1849.99,
        'CPU model': 'Intel Core i9',
        'Hard disk size': '1 TB',
      },
    },
  });

  const res = await response.json();
  console.log(res);

  // optional assertion
  expect(response.status()).toBe(200);
  expect(res.data.price).toBe(1849.99);
  expect(res.data['CPU model']).toBe('Intel Core i9');
  expect(res.data.year).toBe(2019);
});

test('test3', async ({ request }) => {
  const response = await request.put('https://api.restful-api.dev/objects/ff8081819782e69e019bc848b38b638b', {
    headers: {"Content-Type": "application/json"},
    data: {
   "name": "Apple MacBook Pro 16",
   "data": {
      "year": 2019,
      "price": 2049.99,
      "CPU model": "Intel Core i9",
      "Hard disk size": "1 TB",
      "color": "silver"
   },
},
}); 
    const res = await response.json();
    console.log(res);
    expect(response.status()).toBe(200);
    expect(res.data.price).toBe(2049.99);
    expect(res.data.color).toBe('silver');  

});

test('test4', async ({ request }) => {
  const response = await request.patch(
    'https://api.restful-api.dev/objects/ff8081819782e69e019bc848b38b638b',
    {
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        name: 'Apple MacBook Pro 16 (Updated Name)',
      },
    }
  );

  const res = await response.json();
  console.log(res);

  expect(response.status()).toBe(200);
  expect(res.name).toBe('Apple MacBook Pro 16 (Updated Name)');
});


test('test5', async ({ request }) => {
  const response = await request.get('https://api.restful-api.dev/objects/ff8081819782e69e019bc848b38b638b');
    const res = await response.json();  
    console.log(res);

}
);