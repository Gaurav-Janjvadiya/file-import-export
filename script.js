let href = "";
document.querySelector("input").addEventListener("change", (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
        if (file.type.startsWith("image/")) {
            document.body.innerHTML = `<a href="${reader.result}" download><img src='${reader.result}'></a>`;
        };
        if (file.type.endsWith("csv")) {
            let body = [];
            let head = [];
            const lines = reader.result.split('\n').map(i => i.split(","));
            head = lines[0].map(i => (`<th>${i}</th>`)).join("");
            for (let i = 1; i < lines.length; i++) {
                arr = lines[i];
                body += arr.map(i => (`<td>${i}</td>`)).join("");
                body = `<tr>${body}</tr>`
            }
            const blob = new Blob([reader.result], { type: "text/plain" });
            href = URL.createObjectURL(blob);
            document.body.innerHTML = `<a href="${href}" download='mydata.csv'><table>${head}${body}</table></a>`;
        }
    }
    if (file.type.endsWith("csv")) {
        reader.readAsText(file);
    }
    if (file.type.startsWith("image/")) {
        reader.readAsDataURL(file);
    }

})

setTimeout(() => {
    URL.revokeObjectURL(href);
}, 1000);


