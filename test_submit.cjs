async function testSubmit() {
    try {
        const formData = new URLSearchParams();
        formData.append('name', 'Test User');
        formData.append('email', 'test@example.com');
        formData.append('message', 'This is a test');

        const response = await fetch('https://www.myinvoks.com/api/submit/cmm9ar5v40001yieir7hpg5vn', {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        const text = await response.text();
        console.log('Status:', response.status);
        console.log('Body:', text);
    } catch (e) {
        console.error(e);
    }
}
testSubmit();
