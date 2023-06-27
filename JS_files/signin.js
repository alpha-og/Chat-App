const form = document.querySelector("form");

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = {email: form.email.value, password: form.password.value};
    console.log(JSON.stringify(formData))
    fetch("/signin", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then((res) => {
        return res.json();
    })
    .then((session) => {
        window.location.href = "/home";
    })
    .catch((err) => {
        console.log(err)
    })
})