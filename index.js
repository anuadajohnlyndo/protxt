const parser_uid = localStorage.getItem("user-parser-admin");
if (parser_uid == null) {
    window.location.href = "login.html";
} else {
    window.location.href = "homepage.html";
}
