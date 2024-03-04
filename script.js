document.querySelector("input").addEventListener("change", (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
        if (file.type.startsWith("image/")) {
            document.body.innerHTML = `<img src='${reader.result}'>`
        };
        if (file.type.endsWith("csv")) {
            let body = [];
            const lines = reader.result.split('\n').map(i => i.split(","));
            head = lines[0].map(i => (`<th>${i}</th>`)).join("");
            for (let i = 1; i < lines.length; i++) {
                arr = lines[i];
                body += arr.map(i => (`<td>${i}</td>`)).join("");
                body = `<tr>${body}</tr>`
            }
            document.body.innerHTML = `<table>${head}${body}</table>`;
        }
    }
    if (file.type.endsWith("csv")) {
        reader.readAsText(file);
    }
    if (file.type.startsWith("image/")) {
        reader.readAsDataURL(file);
    }

})
